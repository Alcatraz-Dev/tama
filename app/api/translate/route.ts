import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text, from, to } = await request.json();

    if (!text || !from || !to) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Try LibreTranslate API first (free and open source)
    try {
      const LIBRETRANSLATE_URL = 'https://libretranslate.com/translate';
      const response = await fetch(LIBRETRANSLATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: from,
          target: to,
          format: 'text',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({
          translatedText: data.translatedText,
        });
      }
    } catch (libreTranslateError) {
      console.warn('LibreTranslate failed, using fallback:', libreTranslateError);
    }

    // Fallback to mock translations for common phrases
    const mockTranslations: Record<string, Record<string, Record<string, string>>> = {
      en: {
        fr: {
          'Hello': 'Bonjour',
          'Products': 'Produits',
          'Cart': 'Panier',
          'Wishlist': 'Liste de souhaits',
          'Add to cart': 'Ajouter au panier',
          'Quick Add': 'Ajout rapide',
          'View Details': 'Voir les détails',
          'Color': 'Couleur',
          'Size': 'Taille',
          'In Stock': 'En stock',
          'Out of Stock': 'Épuisé',
          'Customer Reviews': 'Avis clients',
          'Write a Review': 'Écrire un avis',
          'Submit Review': 'Soumettre l\'avis',
          'Your Name': 'Votre nom',
          'Your Review': 'Votre avis',
          'Rating': 'Évaluation',
          'Cancel': 'Annuler',
          'Complete Your Order': 'Finaliser votre commande',
          'Order submitted successfully!': 'Commande soumise avec succès!',
          'We have received your order and will process it shortly.': 'Nous avons reçu votre commande et la traiterons sous peu.',
          'Home': 'Accueil',
          'All Products': 'Tous les produits',
          'No products found.': 'Aucun produit trouvé.',
          'Be the first to review this product!': 'Soyez le premier à commenter ce produit!',
          'No reviews yet': 'Aucun avis pour le moment',
          'Verified Purchase': 'Achat vérifié',
          'Search products...': 'Rechercher des produits...',
          'Advanced Filters': 'Filtres avancés',
          'On Sale': 'En promotion',
          'New Arrivals': 'Nouveautés',
          'Sort by': 'Trier par',
          'Price: Low to High': 'Prix : Croissant',
          'Price: High to Low': 'Prix : Décroissant',
          'Newest': 'Plus récent',
          'Popularity': 'Popularité',
        },
        ar: {
          'Hello': 'مرحباً',
          'Products': 'المنتجات',
          'Cart': 'السلة',
          'Wishlist': 'قائمة الرغبات',
          'Add to cart': 'أضف إلى السلة',
          'Quick Add': 'إضافة سريعة',
          'View Details': 'عرض التفاصيل',
          'Color': 'اللون',
          'Size': 'الحجم',
          'In Stock': 'متوفر',
          'Out of Stock': 'غير متوفر',
          'Customer Reviews': 'آراء العملاء',
          'Write a Review': 'اكتب تقييم',
          'Submit Review': 'إرسال التقييم',
          'Your Name': 'اسمك',
          'Your Review': 'تقييمك',
          'Rating': 'التقييم',
          'Cancel': 'إلغاء',
          'Complete Your Order': 'إكمال طلبك',
          'Order submitted successfully!': 'تم إرسال الطلب بنجاح!',
          'We have received your order and will process it shortly.': 'لقد استلمنا طلبك وسنقوم بمعالجته قريباً.',
          'Home': 'الرئيسية',
          'All Products': 'جميع المنتجات',
          'No products found.': 'لم يتم العثور على منتجات.',
          'Be the first to review this product!': 'كن أول من يقيم هذا المنتج!',
          'No reviews yet': 'لا توجد تقييمات بعد',
          'Verified Purchase': 'شراء موثق',
          'Search products...': 'البحث عن المنتجات...',
          'Advanced Filters': 'مرشحات متقدمة',
          'On Sale': 'عرض خاص',
          'New Arrivals': 'وصل حديثاً',
          'Sort by': 'ترتيب حسب',
          'Price: Low to High': 'السعر: من الأقل للأعلى',
          'Price: High to Low': 'السعر: من الأعلى للأقل',
          'Newest': 'الأحدث',
          'Popularity': 'الشعبية',
        },
      },
      fr: {
        ar: {
          'Bonjour': 'مرحباً',
          'Produits': 'المنتجات',
          'Panier': 'السلة',
          'Liste de souhaits': 'قائمة الرغبات',
          'Ajouter au panier': 'أضف إلى السلة',
          'Ajout rapide': 'إضافة سريعة',
          'Voir les détails': 'عرض التفاصيل',
          'Couleur': 'اللون',
          'Taille': 'الحجم',
          'En stock': 'متوفر',
          'Épuisé': 'غير متوفر',
          'Avis clients': 'آراء العملاء',
          'Écrire un avis': 'اكتب تقييم',
          'Soumettre l\'avis': 'إرسال التقييم',
          'Votre nom': 'اسمك',
          'Votre avis': 'تقييمك',
          'Évaluation': 'التقييم',
          'Annuler': 'إلغاء',
          'Finaliser votre commande': 'إكمال طلبك',
          'Commande soumise avec succès!': 'تم إرسال الطلب بنجاح!',
          'Nous avons reçu votre commande et la traiterons sous peu.': 'لقد استلمنا طلبك وسنقوم بمعالجته قريباً.',
          'Accueil': 'الرئيسية',
          'Tous les produits': 'جميع المنتجات',
          'Aucun produit trouvé.': 'لم يتم العثور على منتجات.',
          'Soyez le premier à commenter ce produit!': 'كن أول من يقيم هذا المنتج!',
          'Aucun avis pour le moment': 'لا توجد تقييمات بعد',
          'Achat vérifié': 'شراء موثق',
          'Rechercher des produits...': 'البحث عن المنتجات...',
          'Filtres avancés': 'مرشحات متقدمة',
          'En promotion': 'عرض خاص',
          'Nouveautés': 'وصل حديثاً',
          'Trier par': 'ترتيب حسب',
          'Prix : Croissant': 'السعر: من الأقل للأعلى',
          'Prix : Décroissant': 'السعر: من الأعلى للأقل',
          'Plus récent': 'الأحدث',
          'Popularité': 'الشعبية',
        },
      },
    };

    // Check if we have a mock translation
    const sourceTranslations = mockTranslations[from];
    if (sourceTranslations && sourceTranslations[to] && sourceTranslations[to][text]) {
      return NextResponse.json({
        translatedText: sourceTranslations[to][text],
      });
    }

    // For texts not in our mock database, return the original text
    // In production, you'd call a real translation API here
    console.log(`Translation needed: "${text}" from ${from} to ${to}`);

    // For now, return the original text (you can integrate with Google Translate API)
    return NextResponse.json({
      translatedText: text, // Placeholder - integrate with real translation service
    });

  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
}