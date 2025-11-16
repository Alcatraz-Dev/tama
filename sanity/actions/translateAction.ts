import { DocumentActionComponent } from 'sanity'

export const translateAction: DocumentActionComponent = (props) => {
  const { draft, published, type, onComplete } = props

  // Only show for documents that have translation fields
  const translatableTypes = ['product', 'banner', 'heroCard']
  if (!translatableTypes.includes(type)) {
    return null
  }

  const handleTranslate = async () => {
    const document = draft || published
    if (!document) return

    try {
      // Get the English text fields based on document type
      let textFields: Record<string, string> = {}

      if (type === 'product') {
        textFields = {
          title: (document.title as string) || '',
          description: (document.description as string) || ''
        }
      } else if (type === 'banner') {
        textFields = {
          title: (document.title as string) || '',
          subtitle: (document.subtitle as string) || '',
          buttonText: (document.buttonText as string) || ''
        }
      } else if (type === 'heroCard') {
        textFields = {
          title: (document.title as string) || '',
          content: (document.content as string) || '',
          buttonText: (document.buttonText as string) || ''
        }
      }

      // Translate each field
      const translations: Record<string, string> = {}
      for (const [field, text] of Object.entries(textFields)) {
        if (text) {
          const fr = await translateText(text, 'en', 'fr')
          const ar = await translateText(text, 'en', 'ar')
          translations[`${field}_fr`] = fr
          translations[`${field}_ar`] = ar
        }
      }

      // Update the document with translations using Sanity client
      const { createClient } = await import('@sanity/client')
      const client = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
        useCdn: false,
        token: process.env.SANITY_API_TOKEN!,
        apiVersion: '2024-01-01',
      })

      await client
        .patch(document._id)
        .set(translations)
        .commit()

      onComplete()

    } catch (error) {
      console.error('Translation failed:', error)
      alert('Translation failed. Please try again.')
    }
  }

  return {
    label: 'Translate Content',
    onHandle: handleTranslate,
    tone: 'positive',
    icon: () => '🌐'
  }
}

async function translateText(text: string, from: string, to: string): Promise<string> {
  try {
    const response = await fetch('/api/translate', {
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