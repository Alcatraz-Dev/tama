import { createClient } from '@sanity/client'
import { config } from 'dotenv'

// Load environment variables from .env file
config()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
})

async function translateText(text: string, from: string, to: string): Promise<string> {
  try {
    const response = await fetch('http://localhost:3000/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        from,
        to,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      return data.translatedText
    }
  } catch (error) {
    console.error('Translation failed:', error)
  }

  return text // fallback to original text
}

async function translateProducts() {
  console.log('Translating products...')

  const products = await client.fetch('*[_type == "product"]')

  for (const product of products) {
    console.log(`Translating product: ${product.title}`)

    const titleFr = await translateText(product.title, 'en', 'fr')
    const titleAr = await translateText(product.title, 'en', 'ar')
    const descriptionFr = product.description ? await translateText(product.description, 'en', 'fr') : ''
    const descriptionAr = product.description ? await translateText(product.description, 'en', 'ar') : ''

    await client
      .patch(product._id)
      .set({
        title_fr: titleFr,
        title_ar: titleAr,
        description_fr: descriptionFr,
        description_ar: descriptionAr,
      })
      .commit()

    console.log(`✓ Translated ${product.title}`)
  }
}

async function translateBanners() {
  console.log('Translating banners...')

  const banners = await client.fetch('*[_type == "banner"]')

  for (const banner of banners) {
    console.log(`Translating banner: ${banner.title}`)

    const titleFr = await translateText(banner.title, 'en', 'fr')
    const titleAr = await translateText(banner.title, 'en', 'ar')
    const subtitleFr = banner.subtitle ? await translateText(banner.subtitle, 'en', 'fr') : ''
    const subtitleAr = banner.subtitle ? await translateText(banner.subtitle, 'en', 'ar') : ''
    const buttonTextFr = banner.buttonText ? await translateText(banner.buttonText, 'en', 'fr') : ''
    const buttonTextAr = banner.buttonText ? await translateText(banner.buttonText, 'en', 'ar') : ''

    await client
      .patch(banner._id)
      .set({
        title_fr: titleFr,
        title_ar: titleAr,
        subtitle_fr: subtitleFr,
        subtitle_ar: subtitleAr,
        buttonText_fr: buttonTextFr,
        buttonText_ar: buttonTextAr,
      })
      .commit()

    console.log(`✓ Translated banner ${banner.title}`)
  }
}

async function translateHeroCards() {
  console.log('Translating hero cards...')

  const heroCards = await client.fetch('*[_type == "heroCard"]')

  for (const card of heroCards) {
    console.log(`Translating hero card: ${card.title}`)

    const titleFr = await translateText(card.title, 'en', 'fr')
    const titleAr = await translateText(card.title, 'en', 'ar')
    const contentFr = card.content ? await translateText(card.content, 'en', 'fr') : ''
    const contentAr = card.content ? await translateText(card.content, 'en', 'ar') : ''
    const buttonTextFr = card.buttonText ? await translateText(card.buttonText, 'en', 'fr') : ''
    const buttonTextAr = card.buttonText ? await translateText(card.buttonText, 'en', 'ar') : ''

    await client
      .patch(card._id)
      .set({
        title_fr: titleFr,
        title_ar: titleAr,
        content_fr: contentFr,
        content_ar: contentAr,
        buttonText_fr: buttonTextFr,
        buttonText_ar: buttonTextAr,
      })
      .commit()

    console.log(`✓ Translated hero card ${card.title}`)
  }
}

async function main() {
  try {
    await translateProducts()
    await translateBanners()
    await translateHeroCards()
    console.log('✅ All translations completed!')
  } catch (error) {
    console.error('❌ Translation failed:', error)
  }
}

main()