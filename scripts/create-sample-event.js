import { createClient } from '@sanity/client'

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
  apiVersion: '2024-01-01',
})

const sampleEvent = {
  _type: 'specialEvent',
  eventName: 'Black Friday Sale',
  eventName_fr: 'Soldes du Black Friday',
  eventName_ar: 'تخفيضات الجمعة السوداء',
  eventType: 'holiday_sale',
  headline: 'BLACK FRIDAY MADNESS!',
  headline_fr: 'FOU DU BLACK FRIDAY!',
  headline_ar: 'جنون الجمعة السوداء!',
  description: 'Massive savings on all products! Up to 70% off everything. Don\'t miss out on the biggest sale of the year!',
  description_fr: 'Économies massives sur tous les produits ! Jusqu\'à 70% de réduction sur tout. Ne manquez pas la plus grande vente de l\'année !',
  description_ar: 'توفيرات هائلة على جميع المنتجات! حتى 70% خصم على كل شيء. لا تفوت أكبر تخفيضات العام!',
  isActive: 'active',
  startDate: '2024-11-29T00:00:00.000Z',
  endDate: '2024-12-02T23:59:59.000Z',
  eventFeatures: [
    {
      _type: 'feature',
      featureType: 'discount_offers',
      featureTitle: 'Up to 70% Off',
      featureTitle_fr: 'Jusqu\'à 70% de réduction',
      featureTitle_ar: 'خصم يصل إلى 70%',
      featureDescription: 'Massive discounts on all categories',
      featureDescription_fr: 'Réductions massives sur toutes les catégories',
      featureDescription_ar: 'خصومات هائلة على جميع الفئات',
      featureValue: '70% OFF',
      featureIcon: 'tag',
      isPrimary: true
    },
    {
      _type: 'feature',
      featureType: 'free_shipping',
      featureTitle: 'Free Shipping',
      featureTitle_fr: 'Livraison gratuite',
      featureTitle_ar: 'شحن مجاني',
      featureDescription: 'Free delivery on all orders over $50',
      featureDescription_fr: 'Livraison gratuite sur toutes les commandes de plus de 50€',
      featureDescription_ar: 'توصيل مجاني لجميع الطلبات فوق 50 دولار',
      featureValue: 'FREE',
      featureIcon: 'truck',
      isPrimary: true
    },
    {
      _type: 'feature',
      featureType: 'bonus_points',
      featureTitle: 'Double Points',
      featureTitle_fr: 'Points doubles',
      featureTitle_ar: 'نقاط مضاعفة',
      featureDescription: 'Earn double loyalty points on all purchases',
      featureDescription_fr: 'Gagnez des points de fidélité doubles sur tous les achats',
      featureDescription_ar: 'اكسب نقاط ولاء مضاعفة على جميع المشتريات',
      featureValue: '2x Points',
      featureIcon: 'star',
      isPrimary: false
    }
  ],
  themeColors: {
    primaryColor: '#DC2626',
    secondaryColor: '#F59E0B',
    backgroundColor: '#000000'
  },
  backgroundPattern: 'none',
  popupDelay: 10,
  scrollTrigger: 300,
  maxDisplays: 3,
  priority: 10,
  primaryCTA: {
    text: 'Shop Black Friday Deals',
    text_fr: 'Acheter les offres Black Friday',
    text_ar: 'تسوق صفقات الجمعة السوداء',
    action: 'navigate',
    url: '/collections/black-friday'
  },
  secondaryCTA: {
    text: 'Maybe Later',
    text_fr: 'Peut-être plus tard',
    text_ar: 'ربما لاحقاً'
  }
}

async function createSampleEvent() {
  try {
    console.log('Creating sample Black Friday event...')

    const result = await client.create(sampleEvent)

    console.log('✅ Sample event created successfully!')
    console.log('Event ID:', result._id)
    console.log('Event Name:', result.eventName)
    console.log('')
    console.log('You can now view and edit this event in your Sanity Studio at:')
    console.log('🏠 Homepage & Marketing → 🎉 Special Events')

  } catch (error) {
    console.error('❌ Error creating sample event:', error.message)
    console.log('')
    console.log('Make sure you have set the SANITY_AUTH_TOKEN environment variable')
    console.log('You can create a token at: https://sanity.io/manage')
  }
}

createSampleEvent()