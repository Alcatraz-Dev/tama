"use client";

import React, { useState } from "react";
import { useTranslation } from "@/lib/translationContext";
import { ChevronDown, HelpCircle } from "lucide-react";

function FAQ() {
  const { t, language } = useTranslation();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: language === 'en' ? 'How long does shipping take ?' : language === 'fr' ? 'Combien de temps prend la livraison ?' : 'كم يستغرق الشحن ؟',
      answer: language === 'en' ? 'Standard shipping within Tunisia takes 3-5 business days. International shipping takes 7-14 business days depending on the destination.' : language === 'fr' ? 'La livraison standard en Tunisie prend 3-5 jours ouvrables. La livraison internationale prend 7-14 jours ouvrables selon la destination.' : 'الشحن القياسي داخل تونس يستغرق 3-5 أيام عمل. الشحن الدولي يستغرق 7-14 يوم عمل حسب الوجهة.'
    },
    {
      question: language === 'en' ? 'What is your return policy ?' : language === 'fr' ? 'Quelle est votre politique de retour ?' : 'ما هي سياسة الإرجاع الخاصة بك ؟',
      answer: language === 'en' ? 'We offer a 30-day return policy for unused items in their original packaging. Returns are free within Tunisia.' : language === 'fr' ? 'Nous offrons une politique de retour de 30 jours pour les articles non utilisés dans leur emballage d\'origine. Les retours sont gratuits en Tunisie.' : 'نحن نقدم سياسة إرجاع لمدة 30 يوماً للعناصر غير المستخدمة في تغليفها الأصلي. الإرجاع مجاني داخل تونس.'
    },
    {
      question: language === 'en' ? 'What payment methods do you accept ?' : language === 'fr' ? 'Quels modes de paiement acceptez-vous ?' : 'ما هي طرق الدفع التي تقبلها ؟',
      answer: language === 'en' ? 'We accept credit cards, debit cards, and cash on delivery for local orders.' : language === 'fr' ? 'Nous acceptons les cartes de crédit, les cartes de débit et le paiement à la livraison pour les commandes locales.' : 'نحن نقبل بطاقات الائتمان وبطاقات الخصم والدفع عند التسليم للطلبات المحلية.'
    },
    {
      question: language === 'en' ? 'How do I find my correct size ?' : language === 'fr' ? 'Comment trouver ma taille correcte ?' : 'كيف أجد مقاسي الصحيح ؟',
      answer: language === 'en' ? 'Check our detailed size guide with measurements in both inches and centimeters. If you\'re still unsure, contact our customer service for personalized assistance.' : language === 'fr' ? 'Consultez notre guide des tailles détaillé avec les mesures en pouces et centimètres. Si vous n\'êtes toujours pas sûr, contactez notre service client pour une assistance personnalisée.' : 'تحقق من دليل المقاسات التفصيلي الخاص بنا مع القياسات بالبوصات والسنتيمترات. إذا كنت لا تزال غير متأكد، اتصل بخدمة العملاء للحصول على مساعدة شخصية.'
    },
    {
      question: language === 'en' ? 'What is the quality of your products ?' : language === 'fr' ? 'Quelle est la qualité de vos produits ?' : 'ما هي جودة منتجاتك ؟',
      answer: language === 'en' ? 'All our products are made with high-quality materials and undergo strict quality control. We stand behind our craftsmanship with a 1-year warranty.' : language === 'fr' ? 'Tous nos produits sont fabriqués avec des matériaux de haute qualité et subissent un contrôle qualité strict. Nous défendons notre savoir-faire avec une garantie de 1 an.' : 'جميع منتجاتنا مصنوعة من مواد عالية الجودة وتخضع لمراقبة جودة صارمة. نحن نقف وراء حرفيتنا بضمان لمدة عام واحد.'
    },
    {
      question: language === 'en' ? 'How should I care for my Tama clothing ?' : language === 'fr' ? 'Comment dois-je prendre soin de mes vêtements Tama ?' : 'كيف يجب أن أعتني بملابسي تاما ؟',
      answer: language === 'en' ? 'Follow the care instructions on each product label. Most items can be machine washed on gentle cycle and hung to dry.' : language === 'fr' ? 'Suivez les instructions d\'entretien sur l\'étiquette de chaque produit. La plupart des articles peuvent être lavés en machine sur un cycle doux et suspendus pour sécher.' : 'اتبع تعليمات العناية على ملصق كل منتج. معظم العناصر يمكن غسلها في الغسالة على دورة لطيفة وتعليقها لتجف.'
    },
    {
      question: language === 'en' ? 'How can I track my order ?' : language === 'fr' ? 'Comment puis-je suivre ma commande ?' : 'كيف يمكنني تتبع طلبي ؟',
      answer: language === 'en' ? 'Once your order ships, you\'ll receive a tracking number via email. You can also check your order status by contacting our customer service.' : language === 'fr' ? 'Une fois votre commande expédiée, vous recevrez un numéro de suivi par email. Vous pouvez également vérifier le statut de votre commande en contactant notre service client.' : 'بمجرد شحن طلبك، ستتلقى رقم تتبع عبر البريد الإلكتروني. يمكنك أيضاً التحقق من حالة طلبك من خلال الاتصال بخدمة العملاء.'
    },
    {
      question: language === 'en' ? 'How can I contact customer service ?' : language === 'fr' ? 'Comment contacter le service client ?' : 'كيف يمكنني الاتصال بخدمة العملاء ؟',
      answer: language === 'en' ? 'You can reach us through our contact form, by phone, or email. We\'re here to help Monday through Saturday.' : language === 'fr' ? 'Vous pouvez nous joindre via notre formulaire de contact, par téléphone ou par email. Nous sommes là pour vous aider du lundi au samedi.' : 'يمكنك الوصول إلينا من خلال نموذج الاتصال الخاص بنا، أو الهاتف، أو البريد الإلكتروني. نحن هنا للمساعدة من الاثنين إلى السبت.'
    }
  ];

  return (
    <div className="min-h-screen" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <HelpCircle className={`w-12 h-12 text-zinc-600 dark:text-zinc-400 ${language === 'ar' ? 'ml-4' : 'mr-4'}`} />
            <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white">
              {language === 'en' ? 'Frequently Asked Questions' : language === 'fr' ? 'Questions Fréquemment Posées' : 'الأسئلة الشائعة'}
            </h1>
          </div>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {language === 'en' ? 'Find answers to the most common questions about our products, shipping, and services.' : language === 'fr' ? 'Trouvez des réponses aux questions les plus courantes sur nos produits, la livraison et les services.' : 'اعثر على إجابات لأكثر الأسئلة شيوعاً حول منتجاتنا والشحن والخدمات.'}
          </p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <h3 className="text-lg font-semibold text-black dark:text-white pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-zinc-500 transition-transform flex-shrink-0 ${
                    openItems.includes(index) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openItems.includes(index) && (
                <div className="px-8 pb-6">
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">
              {language === 'en' ? 'Still have questions?' : language === 'fr' ? 'Vous avez encore des questions ?' : 'لديك أسئلة أخرى؟'}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              {language === 'en' ? "Can't find the answer you're looking for? Our customer service team is here to help." : language === 'fr' ? 'Vous ne trouvez pas la réponse que vous cherchez ? Notre équipe de service client est là pour vous aider.' : 'لا تجد الإجابة التي تبحث عنها؟ فريق خدمة العملاء لدينا هنا للمساعدة.'}
            </p>
            <a
              href="/contact"
              className="inline-block bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {language === 'en' ? 'Contact us' : language === 'fr' ? 'Contactez-nous' : 'اتصل بنا'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQ;