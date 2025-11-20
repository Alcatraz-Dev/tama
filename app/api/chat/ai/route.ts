import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const MODEL = 'microsoft/DialoGPT-large'; // Better conversational model

// Sanity client for fetching real website data
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
});

// Fetch real website data for dynamic responses
async function fetchWebsiteData() {
  try {
    const [products, collections, categories] = await Promise.all([
      // Get featured products
      sanityClient.fetch(`
        *[_type == "product" && featured == true][0...5] {
          _id,
          title,
          slug,
          price,
          salePrice,
          description,
          categories[]->{
            title,
            slug
          },
          sizes,
          colors,
          materials
        }
      `),

      // Get collections
      sanityClient.fetch(`
        *[_type == "collection"] {
          _id,
          title,
          slug,
          description,
          season,
          year
        }
      `),

      // Get categories
      sanityClient.fetch(`
        *[_type == "category"] {
          _id,
          title,
          slug,
          description
        }
      `)
    ]);

    return {
      products: products || [],
      collections: collections || [],
      categories: categories || [],
      totalProducts: products?.length || 0,
      totalCollections: collections?.length || 0,
      totalCategories: categories?.length || 0
    };
  } catch (error) {
    console.error('Error fetching website data:', error);
    return {
      products: [],
      collections: [],
      categories: [],
      totalProducts: 0,
      totalCollections: 0,
      totalCategories: 0
    };
  }
}

export async function POST(request: NextRequest) {
  const { message, language = 'en', context = 'fashion_ecommerce' } = await request.json();

  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  console.log('AI Chat Request:', { message, language, hasApiKey: !!HUGGINGFACE_API_KEY });

  // Fetch real website data for dynamic responses
  const websiteData = await fetchWebsiteData();

  try {

    // If no API key, use dynamic fallback responses based on real data
    if (!HUGGINGFACE_API_KEY) {
      console.log('No API key provided, using dynamic fallback responses');
      const fallbackResponse = getDynamicFallbackResponse(message, language, websiteData);
      return NextResponse.json({ response: fallbackResponse });
    }

    // Create context-aware prompt with real website data
    const systemPrompt = getSystemPrompt(context, language, websiteData);
    const fullPrompt = `${systemPrompt}\n\nCustomer: ${message}\nAssistant:`;

    try {
      // Try Hugging Face API
      const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: fullPrompt,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
            do_sample: true,
            top_p: 0.9,
            repetition_penalty: 1.2,
            pad_token_id: 50256,
            eos_token_id: 50256
          },
          options: {
            wait_for_model: true
          }
        }),
        signal: AbortSignal.timeout(30000) // 30 second timeout
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Hugging Face API error:', response.status, errorText);

        // Use dynamic fallback
        const fallbackResponse = getDynamicFallbackResponse(message, language, websiteData);
        return NextResponse.json({ response: fallbackResponse });
      }

      const data = await response.json();
      console.log('Hugging Face response:', data);

      // Handle different response formats
      let aiResponse = '';
      if (Array.isArray(data) && data[0]?.generated_text) {
        aiResponse = data[0].generated_text.replace(fullPrompt, '').trim();
      } else if (data.generated_text) {
        aiResponse = data.generated_text.replace(fullPrompt, '').trim();
      } else if (typeof data === 'string') {
        aiResponse = data.replace(fullPrompt, '').trim();
      }

      // If AI response is too short or empty, use dynamic fallback
      if (!aiResponse || aiResponse.length < 10) {
        console.log('AI response too short, using dynamic fallback');
        aiResponse = getDynamicFallbackResponse(message, language, websiteData);
      } else {
        // Clean up the response
        aiResponse = cleanResponse(aiResponse, language);
      }

      return NextResponse.json({ response: aiResponse });

    } catch (apiError) {
      console.error('Hugging Face API call failed:', apiError);

      // Use dynamic fallback
      const fallbackResponse = getDynamicFallbackResponse(message, language, websiteData);
      return NextResponse.json({ response: fallbackResponse });
    }

  } catch (error) {
    console.error('AI Chat API general error:', error);

    // Return dynamic fallback response
    const { message, language = 'en' } = await request.json().catch(() => ({ message: '', language: 'en' }));
    const fallbackResponse = getDynamicFallbackResponse(message || '', language, websiteData);

    return NextResponse.json({ response: fallbackResponse });
  }
}

function getSystemPrompt(context: string, language: string, websiteData?: any): string {
  const basePrompts = {
    en: {
      fashion_ecommerce: `You are a helpful customer service assistant for Tama Clothing, a Tunisian fashion brand. Help customers with questions about our products, shipping, returns, sizing, and fashion advice.

Current website information:
- We have ${websiteData?.totalProducts || 0} featured products
- ${websiteData?.totalCollections || 0} collections available
- ${websiteData?.totalCategories || 0} product categories
- Free shipping on orders over 100 DT within Tunisia
- 30-day return policy for unused items
- We specialize in high-quality Tunisian fashion

Be friendly, knowledgeable, and concise. Keep responses under 100 words. Use the actual product and collection information when relevant.`
    },
    fr: {
      fashion_ecommerce: `Vous êtes un assistant service client utile pour Tama Clothing, une marque de mode tunisienne. Aidez les clients avec des questions sur nos produits, la livraison, les retours, le dimensionnement et les conseils de mode.

Informations actuelles du site web :
- Nous avons ${websiteData?.totalProducts || 0} produits en vedette
- ${websiteData?.totalCollections || 0} collections disponibles
- ${websiteData?.totalCategories || 0} catégories de produits
- Livraison gratuite pour les commandes de plus de 100 DT en Tunisie
- Politique de retour de 30 jours pour les articles non utilisés
- Nous nous spécialisons dans la mode tunisienne de haute qualité

Soyez amical, compétent et concis. Gardez les réponses sous 100 mots. Utilisez les informations réelles sur les produits et collections quand pertinent.`
    },
    ar: {
      fashion_ecommerce: `أنت مساعد خدمة عملاء مفيد لتاما كلوزينج، علامة أزياء تونسية. ساعد العملاء في الأسئلة المتعلقة بمنتجاتنا والشحن والإرجاع والمقاسات ونصائح الموضة.

معلومات الموقع الحالية:
- لدينا ${websiteData?.totalProducts || 0} منتجات مميزة
- ${websiteData?.totalCollections || 0} مجموعات متاحة
- ${websiteData?.totalCategories || 0} فئات منتجات
- شحن مجاني للطلبات التي تزيد عن 100 دينار تونسي داخل تونس
- سياسة إرجاع لمدة 30 يوماً للعناصر غير المستخدمة
- نتخصص في الموضة التونسية عالية الجودة

كن ودوداً ومطلعاً وموجزاً. احتفظ بالردود تحت 100 كلمة. استخدم معلومات المنتجات والمجموعات الفعلية عند الاقتضاء.`
    }
  };

  return basePrompts[language as keyof typeof basePrompts]?.[context as keyof typeof basePrompts.en] || basePrompts.en.fashion_ecommerce;
}

function getDynamicFallbackResponse(message: string, language: string, websiteData: any): string {
  const lowerMessage = message.toLowerCase();

  // Base responses that can be customized with real data
  const baseResponses = {
    en: {
      // Shipping & Delivery
      shipping: `We offer free shipping on orders over 100 DT within Tunisia. Standard delivery takes 3-5 business days. International shipping is also available.`,
      delivery: `Standard delivery within Tunisia takes 3-5 business days. We also offer express shipping for 15 DT and premium delivery for urgent orders.`,
      tracking: `Once your order ships, you'll receive a tracking number via email. You can also check your order status by contacting our customer service.`,

      // Returns & Exchanges
      return: `We offer a 30-day return policy for unused items in original packaging. Free returns within Tunisia. International returns may incur shipping costs.`,
      exchange: `We accept exchanges within 30 days. Items must be unused and in original packaging. Contact us to arrange an exchange.`,
      refund: `Refunds are processed within 5-7 business days after we receive your returned item. You'll receive an email confirmation once processed.`,

      // Products & Sizing
      size: `Check our detailed size guide with measurements in inches and centimeters. If you're between sizes, we recommend sizing up.`,
      fit: `Our clothing runs true to size. Check the product description for specific fit information. We offer slim, regular, and oversized fits.`,
      quality: `All our products are made with high-quality materials and undergo strict quality control. We stand behind our craftsmanship with a 1-year warranty.`,

      // Pricing & Promotions
      price: `Our prices reflect premium quality materials and Tunisian craftsmanship. We offer competitive pricing with frequent promotions and sales.`,
      discount: `Check our current promotions page for seasonal discounts. Sign up for our newsletter to receive exclusive offers and early access to sales.`,
      sale: `Our sale items are final sale and not eligible for return. Regular priced items can be returned within our 30-day policy.`,

      // Orders & Payment
      payment: `We accept credit cards, debit cards, and cash on delivery for local orders. All payments are processed securely.`,
      order: `You can track your order status by contacting our customer service or checking the confirmation email we sent you.`,
      cancel: `Orders can be cancelled within 2 hours of placement. Please contact us immediately if you need to cancel your order.`,

      // About Tama
      about: `Tama Clothing is a Tunisian fashion brand celebrating tradition, modernity, and authenticity. We create high-quality clothing reflecting Tunisia's vibrant culture.`,
      story: `Founded in Tunisia, Tama Clothing blends traditional patterns with modern designs to create timeless, trendy pieces reflecting our cultural pride.`,
      mission: `Our mission is to inspire confidence through fashion, combining sustainable practices with creative design to represent identity and culture.`,

      // Contact & Support
      contact: `You can reach us through our contact form, by phone, or email. We're here to help Monday through Saturday.`,
      help: `I'm here to help! You can ask me about our products, shipping, returns, sizing, or anything else about Tama Clothing.`,
      support: `Our customer service team is available to assist you. For complex issues, they can provide personalized support.`,

      // Collections & Categories - Dynamic based on real data
      collections: websiteData?.collections?.length > 0
        ? `Explore our ${websiteData.totalCollections} curated collections, each telling a unique fashion story. From seasonal trends to timeless pieces, find your perfect style.`
        : `Explore our curated collections, each telling a unique fashion story. From seasonal trends to timeless pieces, find your perfect style.`,
      categories: websiteData?.categories?.length > 0
        ? `Browse our ${websiteData.totalCategories} categories organized by style, occasion, and theme. Find exactly what you're looking for with our easy navigation.`
        : `Browse our categories organized by style, occasion, and theme. Find exactly what you're looking for with our easy navigation.`,

      // Products - Dynamic based on real data
      products: websiteData?.products?.length > 0
        ? `We currently have ${websiteData.totalProducts} featured products available. You can browse our full collection to find exactly what you're looking for.`
        : `We have a great selection of products available. You can browse our full collection to find exactly what you're looking for.`,

      // General
      recommendation: websiteData?.products?.length > 0
        ? `Based on your interest, you might like our featured products. We have ${websiteData.totalProducts} amazing items currently available.`
        : `Based on your interest, you might like our featured collections. Would you like me to show you some recommendations?`,
      thanks: `You're welcome! Is there anything else I can help you with today?`,
      greeting: `Hello! Welcome to Tama Clothing. How can I help you with your shopping today?`,

      default: `Thank you for your message! I'm here to help with any questions about Tama Clothing, our products, shipping, returns, or sizing. What would you like to know?`
    },
    fr: {
      shipping: `Nous offrons la livraison gratuite pour les commandes de plus de 100 DT en Tunisie. La livraison standard prend 3-5 jours ouvrables. La livraison internationale est également disponible.`,
      delivery: `La livraison standard en Tunisie prend 3-5 jours ouvrables. Nous proposons également la livraison express pour 15 DT et la livraison premium pour les commandes urgentes.`,
      tracking: `Une fois votre commande expédiée, vous recevrez un numéro de suivi par email. Vous pouvez également vérifier le statut de votre commande en contactant notre service client.`,

      return: `Nous offrons une politique de retour de 30 jours pour les articles non utilisés dans leur emballage d'origine. Retours gratuits en Tunisie. Les retours internationaux peuvent entraîner des frais de port.`,
      exchange: `Nous acceptons les échanges dans les 30 jours. Les articles doivent être inutilisés et dans leur emballage d'origine. Contactez-nous pour organiser un échange.`,
      refund: `Les remboursements sont traités dans les 5-7 jours ouvrables après réception de votre article retourné. Vous recevrez un email de confirmation une fois traité.`,

      size: `Consultez notre guide des tailles détaillé avec des mesures en pouces et centimètres. Si vous êtes entre deux tailles, nous recommandons de prendre la taille supérieure.`,
      fit: `Nos vêtements sont à la bonne taille. Vérifiez la description du produit pour des informations spécifiques sur la coupe. Nous proposons des coupes slim, régulière et oversized.`,
      quality: `Tous nos produits sont fabriqués avec des matériaux de haute qualité et subissent un contrôle qualité strict. Nous défendons notre savoir-faire avec une garantie d'un an.`,

      price: `Nos prix reflètent des matériaux premium et l'artisanat tunisien. Nous proposons des prix compétitifs avec des promotions fréquentes.`,
      discount: `Consultez notre page de promotions actuelles pour les réductions saisonnières. Inscrivez-vous à notre newsletter pour recevoir des offres exclusives.`,
      sale: `Nos articles soldés sont en vente finale et ne sont pas éligibles au retour. Les articles à prix régulier peuvent être retournés dans notre politique de 30 jours.`,

      payment: `Nous acceptons les cartes de crédit, les cartes de débit et le paiement à la livraison pour les commandes locales. Tous les paiements sont traités en toute sécurité.`,
      order: `Vous pouvez suivre le statut de votre commande en contactant notre service client ou en vérifiant l'email de confirmation que nous vous avons envoyé.`,
      cancel: `Les commandes peuvent être annulées dans les 2 heures suivant la commande. Veuillez nous contacter immédiatement si vous devez annuler votre commande.`,

      about: `Tama Clothing est une marque de mode tunisienne célébrant la tradition, la modernité et l'authenticité. Nous créons des vêtements de haute qualité reflétant la culture vibrante de la Tunisie.`,
      story: `Fondée en Tunisie, Tama Clothing mélange les motifs traditionnels avec des designs modernes pour créer des pièces intemporelles et tendance reflétant notre fierté culturelle.`,
      mission: `Notre mission est d'inspirer la confiance à travers la mode, en combinant des pratiques durables avec un design créatif pour représenter l'identité et la culture.`,

      contact: `Vous pouvez nous joindre via notre formulaire de contact, par téléphone ou par email. Nous sommes là pour vous aider du lundi au samedi.`,
      help: `Je suis là pour vous aider ! Vous pouvez me poser des questions sur nos produits, la livraison, les retours, le dimensionnement ou tout autre sujet concernant Tama Clothing.`,
      support: `Notre équipe de service client est disponible pour vous assister. Pour les problèmes complexes, ils peuvent fournir un support personnalisé.`,

      collections: websiteData?.collections?.length > 0
        ? `Explorez nos ${websiteData.totalCollections} collections organisées, chacune racontant une histoire unique de mode. Des tendances saisonnières aux pièces intemporelles, trouvez votre style parfait.`
        : `Explorez nos collections organisées, chacune racontant une histoire unique de mode. Des tendances saisonnières aux pièces intemporelles, trouvez votre style parfait.`,
      categories: websiteData?.categories?.length > 0
        ? `Parcourez nos ${websiteData.totalCategories} catégories organisées par style, occasion et thème. Trouvez exactement ce que vous cherchez avec notre navigation facile.`
        : `Parcourez nos catégories organisées par style, occasion et thème. Trouvez exactement ce que vous cherchez avec notre navigation facile.`,
      products: websiteData?.products?.length > 0
        ? `Nous avons actuellement ${websiteData.totalProducts} produits en vedette disponibles. Vous pouvez parcourir notre collection complète pour trouver exactement ce que vous cherchez.`
        : `Nous avons une excellente sélection de produits disponibles. Vous pouvez parcourir notre collection complète pour trouver exactement ce que vous cherchez.`,

      recommendation: websiteData?.products?.length > 0
        ? `Basé sur votre intérêt, vous pourriez aimer nos produits en vedette. Nous avons ${websiteData.totalProducts} articles étonnants actuellement disponibles.`
        : `Basé sur votre intérêt, vous pourriez aimer nos collections en vedette. Souhaitez-vous que je vous montre quelques recommandations ?`,
      thanks: `Je vous en prie ! Y a-t-il autre chose dont je peux vous aider aujourd'hui ?`,
      greeting: `Bonjour ! Bienvenue chez Tama Clothing. Comment puis-je vous aider dans vos achats aujourd'hui ?`,

      default: `Merci pour votre message ! Je suis là pour vous aider avec toutes vos questions sur Tama Clothing, nos produits, la livraison, les retours ou le dimensionnement. Que souhaitez-vous savoir ?`
    },
    ar: {
      shipping: `نحن نقدم شحناً مجانياً للطلبات التي تزيد عن 100 دينار تونسي داخل تونس. يستغرق التسليم القياسي 3-5 أيام عمل. الشحن الدولي متاح أيضاً.`,
      delivery: `التسليم القياسي داخل تونس يستغرق 3-5 أيام عمل. نحن نقدم أيضاً شحناً سريعاً مقابل 15 دينار تونسي وتسليماً مميزاً للطلبات العاجلة.`,
      tracking: `بمجرد شحن طلبك، ستتلقى رقم تتبع عبر البريد الإلكتروني. يمكنك أيضاً التحقق من حالة طلبك عن طريق الاتصال بخدمة العملاء.`,

      return: `نحن نقدم سياسة إرجاع لمدة 30 يوماً للعناصر غير المستخدمة في تغليفها الأصلي. إرجاع مجاني داخل تونس. قد يتحمل الإرجاع الدولي تكاليف شحن.`,
      exchange: `نحن نقبل التبادل خلال 30 يوماً. يجب أن تكون العناصر غير مستخدمة وفي تغليفها الأصلي. اتصل بنا لترتيب التبادل.`,
      refund: `يتم معالجة الاسترداد خلال 5-7 أيام عمل بعد استلام العنصر المرجوع. ستتلقى تأكيداً عبر البريد الإلكتروني بمجرد المعالجة.`,

      size: `تحقق من دليل المقاسات التفصيلي الخاص بنا مع القياسات بالبوصات والسنتيمترات. إذا كنت بين مقاسين، نوصي بالمقاس الأكبر.`,
      fit: `ملابسنا مناسبة للمقاس. تحقق من وصف المنتج لمعلومات محددة عن القصة. نحن نقدم قصات ضيقة وعادية وكبيرة جداً.`,
      quality: `جميع منتجاتنا مصنوعة من مواد عالية الجودة وتخضع لمراقبة جودة صارمة. نحن نقف وراء حرفيتنا بضمان لمدة عام واحد.`,

      price: `أسعارنا تعكس مواد ممتازة وحرفية تونسية. نحن نقدم أسعاراً تنافسية مع عروض متكررة.`,
      discount: `تحقق من صفحة عروضنا الحالية للخصومات الموسمية. اشترك في نشرتنا الإخبارية للحصول على عروض حصرية.`,
      sale: `عناصرنا المخفضة نهائية وغير مؤهلة للإرجاع. يمكن إرجاع العناصر ذات السعر العادي خلال سياسة 30 يوماً.`,

      payment: `نحن نقبل بطاقات الائتمان وبطاقات الخصم والدفع عند التسليم للطلبات المحلية. جميع المدفوعات تتم معالجتها بشكل آمن.`,
      order: `يمكنك تتبع حالة طلبك عن طريق الاتصال بخدمة العملاء أو التحقق من البريد الإلكتروني للتأكيد الذي أرسلناه إليك.`,
      cancel: `يمكن إلغاء الطلبات خلال ساعتين من الطلب. يرجى الاتصال بنا فوراً إذا كنت بحاجة إلى إلغاء طلبك.`,

      about: `تاما كلوزينج هي علامة أزياء تونسية تحتفل بالتقاليد والحداثة والأصالة. نحن نصنع ملابس عالية الجودة تعكس الثقافة النابضة بالحياة في تونس.`,
      story: `تأسست في تونس، تاما كلوزينج تمزج الأنماط التقليدية مع التصاميم الحديثة لإنشاء قطع خالدة ومتميزة تعكس فخرنا الثقافي.`,
      mission: `مهمتنا هي إلهام الثقة من خلال الموضة، من خلال الجمع بين الممارسات المستدامة والتصميم الإبداعي لتمثيل الهوية والثقافة.`,

      contact: `يمكنك الوصول إلينا من خلال نموذج الاتصال الخاص بنا، أو الهاتف، أو البريد الإلكتروني. نحن هنا للمساعدة من الاثنين إلى السبت.`,
      help: `أنا هنا للمساعدة! يمكنك سؤالي عن منتجاتنا، الشحن، الإرجاع، المقاسات، أو أي شيء آخر عن تاما كلوزينج.`,
      support: `فريق خدمة العملاء لدينا متاح لمساعدتك. للمشكلات المعقدة، يمكنهم تقديم دعم شخصي.`,

      collections: websiteData?.collections?.length > 0
        ? `استكشف ${websiteData.totalCollections} مجموعاتنا المنظمة، كل واحدة تحكي قصة فريدة في الموضة. من الاتجاهات الموسمية إلى القطع الخالدة، ابحث عن أسلوبك المثالي.`
        : `استكشف مجموعاتنا المنظمة، كل واحدة تحكي قصة فريدة في الموضة. من الاتجاهات الموسمية إلى القطع الخالدة، ابحث عن أسلوبك المثالي.`,
      categories: websiteData?.categories?.length > 0
        ? `تصفح ${websiteData.totalCategories} فئاتنا المنظمة حسب الأسلوب والمناسبة والموضوع. ابحث عن ما تبحث عنه بالضبط مع تنقلنا السهل.`
        : `تصفح فئاتنا المنظمة حسب الأسلوب والمناسبة والموضوع. ابحث عن ما تبحث عنه بالضبط مع تنقلنا السهل.`,
      products: websiteData?.products?.length > 0
        ? `لدينا حالياً ${websiteData.totalProducts} منتجات مميزة متاحة. يمكنك تصفح مجموعتنا الكاملة للعثور على ما تبحث عنه بالضبط.`
        : `لدينا مجموعة رائعة من المنتجات المتاحة. يمكنك تصفح مجموعتنا الكاملة للعثور على ما تبحث عنه بالضبط.`,

      recommendation: websiteData?.products?.length > 0
        ? `بناءً على اهتمامك، قد تحب منتجاتنا المميزة. لدينا ${websiteData.totalProducts} عناصر مذهلة متاحة حالياً.`
        : `بناءً على اهتمامك، قد تحب مجموعاتنا المميزة. هل تريد مني أن أظهر لك بعض التوصيات؟`,
      thanks: `على الرحب والسعة! هل هناك شيء آخر يمكنني مساعدتك فيه اليوم؟`,
      greeting: `مرحبا! مرحباً بك في تاما كلوزينج. كيف يمكنني مساعدتك في تسوقك اليوم؟`,

      default: `شكراً لرسالتك! أنا هنا للمساعدة في أي أسئلة عن تاما كلوزينج، منتجاتنا، الشحن، الإرجاع، أو المقاسات. ماذا تريد أن تعرف؟`
    }
  };

  const langResponses = baseResponses[language as keyof typeof baseResponses] || baseResponses.en;

  // Check for specific keywords and return relevant responses
  const keywords = {
    // Shipping & Delivery
    shipping: ['shipping', 'delivery', 'livraison', 'شحن', 'توصيل'],
    delivery: ['delivery', 'tracking', 'suivi', 'تتبع'],
    tracking: ['tracking', 'track', 'suivi', 'تتبع', 'order status'],

    // Returns & Exchanges
    return: ['return', 'returns', 'retour', 'إرجاع', 'refund'],
    exchange: ['exchange', 'swap', 'échange', 'تبادل'],
    refund: ['refund', 'money back', 'remboursement', 'استرداد'],

    // Products & Sizing
    size: ['size', 'sizes', 'taille', 'مقاس', 'mesurements'],
    fit: ['fit', 'coupe', 'قصة', 'how does it fit'],
    quality: ['quality', 'material', 'qualité', 'جودة', 'matière'],

    // Pricing
    price: ['price', 'cost', 'prix', 'سعر', 'how much'],
    discount: ['discount', 'sale', 'promotion', 'خصم', 'عرض'],
    sale: ['sale', 'clearance', 'soldes', 'تخفيض'],

    // Orders & Payment
    payment: ['payment', 'pay', 'paiement', 'دفع'],
    order: ['order', 'commande', 'طلب', 'status'],
    cancel: ['cancel', 'cancellation', 'annuler', 'إلغاء'],

    // About
    about: ['about', 'company', 'à propos', 'حول', 'tama'],
    story: ['story', 'history', 'histoire', 'قصة'],
    mission: ['mission', 'goal', 'objectif', 'مهمة'],

    // Support
    contact: ['contact', 'reach', 'contacter', 'اتصال'],
    help: ['help', 'assist', 'aide', 'مساعدة'],
    support: ['support', 'service', 'customer service'],

    // Collections
    collections: ['collections', 'مجموعات', 'collection'],
    categories: ['categories', 'fئات', 'category'],
    products: ['products', 'product', 'items', 'clothes', 'clothing', 'produits', 'منتجات', 'ملابس'],

    // General
    recommendation: ['recommend', 'suggest', 'recommander', 'يوصي'],
    thanks: ['thank', 'merci', 'شكر', 'gracias'],
    greeting: ['hello', 'hi', 'bonjour', 'مرحبا', 'salut']
  };

  // Check each keyword category
  for (const [responseKey, keywordsList] of Object.entries(keywords)) {
    for (const keyword of keywordsList) {
      if (lowerMessage.includes(keyword)) {
        return langResponses[responseKey as keyof typeof langResponses] || langResponses.default;
      }
    }
  }

  // If no specific keywords matched, check if it's a question
  if (lowerMessage.includes('?') || lowerMessage.includes('؟')) {
    // For unrecognized questions, direct to contact support
    const contactResponses = {
      en: "I'm sorry, I couldn't find the information you're looking for. Please contact our support team for personalized assistance. You can reach us through our [contact page](/contact).",
      fr: "Désolé, je n'ai pas pu trouver les informations que vous recherchez. Veuillez contacter notre équipe de support pour une assistance personnalisée. Vous pouvez nous joindre via notre [page de contact](/contact).",
      ar: "عذراً، لم أتمكن من العثور على المعلومات التي تبحث عنها. يرجى الاتصال بفريق الدعم لدينا للحصول على مساعدة شخصية. يمكنك الوصول إلينا من خلال [صفحة الاتصال](/contact)."
    };
    return contactResponses[language as keyof typeof contactResponses] || contactResponses.en;
  }

  // For non-questions or unclear messages, provide default with contact option
  const defaultWithContact = {
    en: "Thank you for your message! I'm here to help with questions about Tama Clothing, our products, shipping, returns, or sizing. For other inquiries, please contact our support team through our [contact page](/contact).",
    fr: "Merci pour votre message ! Je suis là pour vous aider avec les questions sur Tama Clothing, nos produits, la livraison, les retours ou le dimensionnement. Pour d'autres demandes, veuillez contacter notre équipe de support via notre [page de contact](/contact).",
    ar: "شكراً لرسالتك! أنا هنا للمساعدة في الأسئلة المتعلقة بتاما كلوزينج، منتجاتنا، الشحن، الإرجاع، أو المقاسات. للاستفسارات الأخرى، يرجى الاتصال بفريق الدعم من خلال [صفحة الاتصال](/contact)."
  };

  return defaultWithContact[language as keyof typeof defaultWithContact] || defaultWithContact.en;
}

function cleanResponse(response: string, language: string): string {
  // Remove any unwanted prefixes or formatting
  let cleaned = response.trim();

  // Remove common AI prefixes
  const prefixesToRemove = [
    'Assistant:', 'AI:', 'Bot:', 'Customer Service:',
    'Assistant :', 'AI :', 'Bot :', 'Customer Service :'
  ];

  for (const prefix of prefixesToRemove) {
    if (cleaned.startsWith(prefix)) {
      cleaned = cleaned.substring(prefix.length).trim();
    }
  }

  // Limit response length
  if (cleaned.length > 200) {
    cleaned = cleaned.substring(0, 200) + '...';
  }

  // Ensure the response ends with appropriate punctuation
  if (!cleaned.match(/[.!?]$/)) {
    cleaned += language === 'ar' ? '۔' : '.';
  }

  return cleaned;
}