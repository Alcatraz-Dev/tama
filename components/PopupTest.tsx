"use client";

import { useState } from "react";
import ReusablePopup from "./ReusablePopup";

// Mock translation context for testing
const useMockTranslation = () => {
  const [language, setLanguage] = useState<'en' | 'fr' | 'ar'>('en');

  const t = (key: string) => {
    // Mock translations for testing
    return key;
  };

  return { language, setLanguage, t };
};

// Sample popup data for testing
const samplePopups = {
  exitIntent: {
    _id: "exit-intent-test",
    popupType: "exit_intent",
    active: true,
    translations: {
      en: {
        title: "Wait! Don't Leave Yet",
        subtitle: "Get 20% off your entire order before you go. Use code EXIT20 at checkout.",
        ctaText: "Claim My 20% Off",
        incentive: "EXIT20 - Valid for 24 hours"
      },
      fr: {
        title: "Attendez ! Ne partez pas encore",
        subtitle: "Obtenez 20% de réduction sur toute votre commande avant de partir. Utilisez le code EXIT20 à la caisse.",
        ctaText: "Réclamer mes 20% de réduction",
        incentive: "EXIT20 - Valable 24 heures"
      },
      ar: {
        title: "انتظر! لا تذهب بعد",
        subtitle: "احصل على خصم 20% على طلبك بالكامل قبل أن تذهب. استخدم الكود EXIT20 عند الدفع.",
        ctaText: "احصل على خصمي 20%",
        incentive: "EXIT20 - صالح لمدة 24 ساعة"
      }
    },
    design: {
      layoutType: "product_grid",
      showImage: true,
      themeColors: {
        primaryColor: { hex: "#DC2626" },
        secondaryColor: { hex: "#F59E0B" },
        backgroundColor: { hex: "#000000" }
      }
    },
    animation: {
      entranceAnimation: "fade_scale",
      exitAnimation: "fade_out",
      duration: 300,
      easing: "easeOut"
    },
    trigger: {
      triggerType: "exit_intent",
      maxDisplays: 3,
      displayFrequency: "once_per_session"
    },
    priority: 10,
    targetAudience: ["new_visitors"],
    selectedProducts: [
      {
        _id: "product-1",
        title: "Designer Dress",
        gallery: [{ asset: { url: "/placeholder-product.jpg" } }],
        price: 89.99,
        slug: { current: "designer-dress" }
      },
      {
        _id: "product-2",
        title: "Fashion Accessories",
        gallery: [{ asset: { url: "/placeholder-product.jpg" } }],
        price: 45.50,
        slug: { current: "fashion-accessories" }
      }
    ]
  },

  limitedTime: {
    _id: "limited-time-test",
    popupType: "limited_time_offer",
    active: true,
    translations: {
      en: {
        title: "Flash Sale: 50% Off Everything!",
        subtitle: "This exclusive offer ends in 24 hours. Don't miss out on the biggest sale of the season!",
        ctaText: "Shop Now - Save 50%",
        incentive: "FLASH50 - Limited time only"
      },
      fr: {
        title: "Vente flash : 50% de réduction sur tout !",
        subtitle: "Cette offre exclusive se termine dans 24 heures. Ne manquez pas la plus grande vente de la saison !",
        ctaText: "Acheter maintenant - Économisez 50%",
        incentive: "FLASH50 - Temps limité uniquement"
      },
      ar: {
        title: "تخفيض فوري: 50% على كل شيء!",
        subtitle: "تنتهي هذه العرض الحصري في غضون 24 ساعة. لا تفوت أكبر تخفيضات الموسم!",
        ctaText: "تسوق الآن - وفر 50%",
        incentive: "FLASH50 - محدود الوقت فقط"
      }
    },
    design: {
      layoutType: "bottom_banner",
      showImage: true,
      themeColors: {
        primaryColor: { hex: "#DC2626" },
        secondaryColor: { hex: "#F59E0B" },
        backgroundColor: { hex: "#000000" }
      }
    },
    animation: {
      entranceAnimation: "slide_up",
      exitAnimation: "slide_out",
      duration: 300,
      easing: "easeOut"
    },
    trigger: {
      triggerType: "scroll_percentage",
      scrollPercentage: 30,
      maxDisplays: 1,
      displayFrequency: "once_per_session"
    },
    priority: 8,
    targetAudience: ["new_visitors", "returning_customers"],
    selectedProducts: [
      {
        _id: "product-3",
        title: "Summer Collection",
        gallery: [{ asset: { url: "/placeholder-product.jpg" } }],
        price: 129.99,
        slug: { current: "summer-collection" }
      },
      {
        _id: "product-4",
        title: "Trendy Shoes",
        gallery: [{ asset: { url: "/placeholder-product.jpg" } }],
        price: 79.99,
        slug: { current: "trendy-shoes" }
      },
      {
        _id: "product-5",
        title: "Fashion Bag",
        gallery: [{ asset: { url: "/placeholder-product.jpg" } }],
        price: 59.99,
        slug: { current: "fashion-bag" }
      }
    ]
  },

  freeShipping: {
    _id: "free-shipping-test",
    popupType: "free_shipping_threshold",
    active: true,
    translations: {
      en: {
        title: "Almost There! Free Shipping",
        subtitle: "Add $25 more to your cart and get FREE shipping on your entire order.",
        ctaText: "Continue Shopping",
        incentive: "FREE shipping on orders over $75"
      },
      fr: {
        title: "Presque arrivé ! Livraison gratuite",
        subtitle: "Ajoutez 25€ de plus à votre panier et obtenez LA LIVRAISON GRATUITE sur toute votre commande.",
        ctaText: "Continuer les achats",
        incentive: "Livraison GRATUITE sur les commandes de plus de 75€"
      },
      ar: {
        title: "على وشك الوصول! شحن مجاني",
        subtitle: "أضف 25 دولارًا إضافيًا إلى سلة التسوق واحصل على شحن مجاني على طلبك بالكامل.",
        ctaText: "متابعة التسوق",
        incentive: "شحن مجاني للطلبات فوق 75 دولارًا"
      }
    },
    design: {
      layoutType: "side_panel",
      showImage: false,
      themeColors: {
        primaryColor: { hex: "#059669" },
        secondaryColor: { hex: "#10B981" },
        backgroundColor: { hex: "#000000" }
      }
    },
    animation: {
      entranceAnimation: "slide_up",
      exitAnimation: "slide_out",
      duration: 300,
      easing: "easeOut"
    },
    trigger: {
      triggerType: "cart_threshold",
      cartThreshold: 50,
      maxDisplays: 2,
      displayFrequency: "once_per_session"
    },
    priority: 7,
    targetAudience: ["cart_abandoners"]
  },

  postPurchase: {
    _id: "post-purchase-test",
    popupType: "post_purchase_upsell",
    active: true,
    translations: {
      en: {
        title: "Complete Your Look",
        subtitle: "Customers who bought this also loved these matching accessories. Add them now!",
        ctaText: "Add to Cart + Get 15% Off",
        incentive: "Complete the set - Save 15%"
      },
      fr: {
        title: "Complétez votre look",
        subtitle: "Les clients qui ont acheté ceci ont aussi adoré ces accessoires assortis. Ajoutez-les maintenant !",
        ctaText: "Ajouter au panier + Obtenir 15% de réduction",
        incentive: "Complétez l'ensemble - Économisez 15%"
      },
      ar: {
        title: "أكمل إطلالتك",
        subtitle: "العملاء الذين اشتروا هذا أحبوا أيضًا هذه الإكسسوارات المطابقة. أضفهم الآن!",
        ctaText: "أضف إلى السلة + احصل على خصم 15%",
        incentive: "أكمل المجموعة - وفر 15%"
      }
    },
    design: {
      layoutType: "center_modal",
      showImage: true,
      themeColors: {
        primaryColor: { hex: "#7C3AED" },
        secondaryColor: { hex: "#A855F7" },
        backgroundColor: { hex: "#000000" }
      }
    },
    animation: {
      entranceAnimation: "bounce_in",
      exitAnimation: "scale_down",
      duration: 400,
      easing: "easeOut"
    },
    trigger: {
      triggerType: "purchase_complete",
      maxDisplays: 1,
      displayFrequency: "once_per_session"
    },
    featuredProduct: {
      _id: "sample-product-id",
      title: "Sample Fashion Item",
      gallery: [{
        asset: {
          url: "/placeholder-product.jpg"
        }
      }]
    },
    priority: 9,
    targetAudience: ["high_value_customers"]
  }
};

export default function PopupTest() {
  const [activePopup, setActivePopup] = useState<keyof typeof samplePopups | null>(null);
  const { language, setLanguage } = useMockTranslation();

  const handleCtaClick = () => {
    console.log("CTA clicked for popup:", activePopup);
    alert(`CTA clicked for ${activePopup} popup!`);
    setActivePopup(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Reusable Popup Test</h1>

        {/* Language Switcher */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg shadow-md p-1 flex">
            {[
              { code: 'en', name: 'English', flag: '🇺🇸' },
              { code: 'fr', name: 'Français', flag: '🇫🇷' },
              { code: 'ar', name: 'العربية', flag: '🇹🇳' }
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as 'en' | 'fr' | 'ar')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  language === lang.code
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {lang.flag} {lang.name}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-600">
            Current Language: <span className="font-semibold">{language.toUpperCase()}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {Object.entries(samplePopups).map(([key, popup]) => (
            <div key={key} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2 capitalize">
                {key.replace('_', ' ')} Popup
              </h2>
              <p className="text-gray-600 mb-4">
                Type: {popup.popupType.replace('_', ' ')}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Layout: {popup.design.layoutType.replace('_', ' ')}
              </p>
              <button
                onClick={() => setActivePopup(key as keyof typeof samplePopups)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                Test This Popup
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Test Instructions</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Language Switching:</strong> Use the language buttons above to test EN/FR/AR translations</li>
            <li>Click any "Test This Popup" button to see the popup in action</li>
            <li>Try different popup types to see various layouts and animations</li>
            <li>Test the close button and overlay click to dismiss</li>
            <li>Check responsive behavior by resizing your browser</li>
            <li>Observe the different animation styles for each popup type</li>
            <li>CTA buttons will show an alert when clicked</li>
            <li>Product images and prices are displayed in modern card layouts</li>
          </ul>
        </div>

        {/* Render active popup */}
        {activePopup && (
          <ReusablePopup
            popup={samplePopups[activePopup]}
            isOpen={true}
            onClose={() => setActivePopup(null)}
            onCtaClick={handleCtaClick}
            language={language}
          />
        )}
      </div>
    </div>
  );
}