export type Language = 'en' | 'fr' | 'ar';

export type TranslationKey =
  | 'home'
  | 'products'
  | 'categories'
  | 'collections'
  | 'about'
  | 'contact'
  | 'cart'
  | 'wishlist'
  | 'gallery'
  | 'allProductsPage'
  | 'productsFoundCount'
  | 'previousPage'
  | 'nextPage'
  | 'productGallery'
  | 'galleryDescription'
  | 'search'
  | 'filter'
  | 'sortBy'
  | 'priceRange'
  | 'category'
  | 'size'
  | 'color'
  | 'material'
  | 'onSale'
  | 'newArrivals'
  | 'addToCart'
  | 'viewDetails'
  | 'share'
  | 'loading'
  | 'noProductsFound'
  | 'featuredProducts'
  | 'shopNow'
  | 'discoverMore'
  | 'liveChat'
  | 'copyright'
  | 'continueShopping'
  | 'inStock'
  | 'outOfStock'
  | 'applyFilters'
  | 'company'
  | 'meetTheTeam'
  | 'careers'
  | 'helpfulLinks'
  | 'faqs'
  | 'legal'
  | 'accessibility'
  | 'returnsPolicy'
  | 'refundPolicy'
  | 'termsAndConditions'
  | 'footerDescription'
  | 'madeWithLove'
  | 'millionCustomers'
  | 'trustedCustomers'
  | 'colorRequired'
  | 'sizeRequired'
  | 'addedToCart'
  | 'itemAdded'
  | 'removedFromWishlist'
  | 'addedToWishlist'
  | 'quickAdd'
  | 'myWishlist'
  | 'wishlistDescription'
  | 'item'
  | 'items'
  | 'clearAll'
  | 'wishlistCleared'
  | 'wishlistEmpty'
  | 'startAddingItems'
  | 'browseProducts'
  | 'savedItems'
  | 'curatedSelection'
  | 'filters'
  | 'applyPriceFilter'
  | 'filterSize'
  | 'filterColor'
  | 'specialOffers'
  | 'filterSortBy'
  | 'filterDefault'
  | 'priceLow'
  | 'priceHigh'
  | 'newest'
  | 'popularity'
  | 'resetAll'
  | 'imagesLabel'
  | 'productsLabel'
  | 'allProductImages'
  | 'browseVisualCollection'
  | 'stopAutoScroll'
  | 'autoScroll'
  | 'noImagesAvailable'
  | 'workingOnImages'
  | 'browseProductsGallery'
  | 'ourProducts'
  | 'tryAdjustingSearch'
  | 'ourCategoryList'
  | 'categoryItems'
  | 'ourFeaturedCollections'
  | 'seeMoreProducts'
  | 'nameRequired'
  | 'enterFullName'
  | 'selectTown'
  | 'enterLocation'
  | 'enterPhone'
  | 'orderSubmitted'
  | 'orderSuccess'
  | 'cancel'
  | 'reviewRequired'
  | 'writeReview'
  | 'reviews'
  | 'customerReviews'
  | 'voiceSearchNotSupported'
  | 'searchPlaceholder'
  | 'stopVoiceSearch'
  | 'startVoiceSearch'
  | 'recentSearches'
  | 'backToProducts'
  | 'categories'
  | 'categoriesDescription'
  | 'discoverCollection'
  | 'shopNow'
  | 'noCategoriesFound'
  | 'workingOnCategories'
  | 'browseAllProducts'
  | 'items'
  | 'collections'
  | 'collectionsDescription'
  | 'exploreNow'
  | 'noCollectionsAvailable'
  | 'workingOnCollections'
  | 'aboutTitle'
  | 'aboutClothing'
  | 'aboutDescription'
  | 'ourStory'
  | 'ourStoryDescription'
  | 'ourMission'
  | 'ourMissionDescription'
  | 'whyTitle'
  | 'whyQuestion'
  | 'whyDescription'
  | 'styleStories'
  | 'lookbookNotFound'
  | 'backToStyleStories'
  | 'theLook'
  | 'shopTheLook'
  | 'shopTheLookDescription'
  | 'loveThisLook'
  | 'shareWithFriends'
  | 'saveForLater'
  | 'stylingTips'
  | 'discoverStyleStories'
  | 'styleStory'
  | 'viewStory'
  | 'noStyleStoriesAvailable'
  | 'workingOnStyleStories'
  | 'discoverProductsInStyleStory'
  | 'noProductsInStyleStory'
  | 'styleStoryNoProductsYet'
  | 'browseAllProducts';

export const translations = {
  en: {
    home: 'Home',
    products: 'Products',
    categories: 'Categories',
    collections: 'Collections',
    about: 'About',
    contact: 'Contact',
    cart: 'Cart',
    wishlist: 'Wishlist',
    gallery: 'Gallery',
    allProductsPage: 'All Products',
    productsFoundCount: '{{count}} products found',
    previousPage: 'Previous',
    nextPage: 'Next',
    productGallery: 'Product Gallery',
    galleryDescription: 'Explore our complete collection of product images',
    search: 'Search',
    filter: 'Filter',
    sortBy: 'Sort by',
    priceRange: 'Price Range',
    category: 'Category',
    size: 'Size',
    color: 'Color',
    material: 'Material',
    onSale: 'On Sale',
    newArrivals: 'New Arrivals',
    addToCart: 'Add to Cart',
    viewDetails: 'View Details',
    share: 'Share',
    loading: 'Loading...',
    noProductsFound: 'No products found',
    featuredProducts: 'Featured Products',
    shopNow: 'Shop Now',
    discoverMore: 'Discover More',
    liveChat: 'Live Chat',
    copyright: '© {{year}} Tama Shop. All rights reserved.',
    continueShopping: 'Continue Shopping',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    applyFilters: 'Apply Filters',
    company: 'Company',
    meetTheTeam: 'Meet the Team',
    careers: 'Careers',
    helpfulLinks: 'Helpful Links',
    faqs: 'FAQs',
    legal: 'Legal',
    accessibility: 'Accessibility',
    returnsPolicy: 'Returns Policy',
    refundPolicy: 'Refund Policy',
    termsAndConditions: 'Terms and Conditions',
    footerDescription: 'Shop the latest fashion & express your individuality.',
    madeWithLove: 'Made with ❤️',
    millionCustomers: '1 Million+ Happy Customers',
    trustedCustomers: 'Trusted by customers worldwide',
    colorRequired: 'Please select a color',
    sizeRequired: 'Please select a size',
    addedToCart: 'Added to cart',
    itemAdded: 'Item added to cart',
    removedFromWishlist: 'Removed from wishlist',
    addedToWishlist: 'Added to wishlist',
    quickAdd: 'Quick Add',
    myWishlist: 'My Wishlist',
    wishlistDescription: 'Your favorite items, saved for later',
    item: 'item',
    items: 'items',
    clearAll: 'Clear All',
    wishlistCleared: 'Wishlist cleared',
    wishlistEmpty: 'Your wishlist is empty',
    startAddingItems: 'Start adding items you love to your wishlist',
    browseProducts: 'Browse Products',
    savedItems: 'Saved Items',
    curatedSelection: 'A curated selection of items you\'ve saved',
    filters: 'Filters',
    applyPriceFilter: 'Apply Price Filter',
    filterSize: 'Size',
    filterColor: 'Color',
    specialOffers: 'Special Offers',
    filterSortBy: 'Sort By',
    filterDefault: 'Default',
    priceLow: 'Price: Low to High',
    priceHigh: 'Price: High to Low',
    newest: 'Newest',
    popularity: 'Popularity',
    resetAll: 'Reset All',
    imagesLabel: 'Images',
    productsLabel: 'Products',
    allProductImages: 'All Product Images',
    browseVisualCollection: 'Browse our visual collection',
    stopAutoScroll: 'Stop Auto Scroll',
    autoScroll: 'Auto Scroll',
    noImagesAvailable: 'No images available',
    workingOnImages: 'We\'re working on adding more images',
    browseProductsGallery: 'Browse Products Gallery',
    ourProducts: 'Our Products',
    tryAdjustingSearch: 'Try adjusting your search or filters',
    ourCategoryList: 'Our Category List',
    categoryItems: 'Category Items',
    ourFeaturedCollections: 'Our Featured Collections',
    seeMoreProducts: 'See More Products',
    nameRequired: 'Name is required',
    enterFullName: 'Enter your full name',
    selectTown: 'Select your town',
    enterLocation: 'Enter your location',
    enterPhone: 'Enter your phone number',
    orderSubmitted: 'Order Submitted',
    orderSuccess: 'Your order has been submitted successfully!',
    cancel: 'Cancel',
    reviewRequired: 'Review is required',
    writeReview: 'Write your review here...',
    reviews: 'Reviews',
    customerReviews: 'Customer Reviews',
    voiceSearchNotSupported: 'Voice search is not supported in this browser',
    searchPlaceholder: 'Search products...',
    stopVoiceSearch: 'Stop Voice Search',
    startVoiceSearch: 'Start Voice Search',
    recentSearches: 'Recent Searches',
    backToProducts: 'Back to Products',
    categoriesDescription: 'Explore our curated collections organized by style, occasion, and theme. Find exactly what you\'re looking for.',
    discoverCollection: 'Discover our {{category}} collection',
    noCategoriesFound: 'No Categories Found',
    workingOnCategories: 'We\'re working on organizing our categories. Check back soon!',
    browseAllProducts: 'Browse All Products',
    collectionsDescription: 'Explore our curated collections, each telling a unique story through fashion. From seasonal trends to timeless pieces, find your perfect style.',
    exploreNow: 'Explore Now',
    noCollectionsAvailable: 'No Collections Available',
    workingOnCollections: 'We\'re working on bringing you amazing collections. Check back soon!',
    aboutTitle: 'About ',
    aboutClothing: 'Clothing ',
    aboutDescription: 'Tama Clothing is a Tunisian fashion brand that celebrates tradition, modernity, and authenticity. Our mission is to create high-quality clothing that reflects the vibrant culture of Tunisia while embracing a contemporary lifestyle.',
    ourStory: 'Our Story',
    ourStoryDescription: 'Founded in Tunisia, Tama Clothing was born out of a passion for style and heritage. We blend traditional Tunisian patterns and fabrics with modern designs to create pieces that are both timeless and trendy. Every collection reflects our dedication to craftsmanship and cultural pride.',
    ourMission: 'Our Mission',
    ourMissionDescription: 'We aim to inspire confidence and individuality through fashion. By combining sustainable practices and creative design, Tama Clothing stands for more than style — it represents identity, culture, and a commitment to the future.',
    whyTitle: 'Why ',
    whyQuestion: '? ',
    whyDescription: 'At Tama, we believe clothing is more than fabric — it\'s a story. From handpicked materials to carefully designed collections, we ensure each piece represents the richness of Tunisian heritage with a modern twist.',
    styleStories: 'Style Stories',
    lookbookNotFound: 'Style Story Not Found',
    backToStyleStories: 'Back to Style Stories',
    theLook: 'The Look',
    shopTheLook: 'Shop the Look',
    shopTheLookDescription: 'Discover the pieces that make this look complete. Each item is carefully selected to bring the vision to life.',
    loveThisLook: 'Love this look?',
    shareWithFriends: 'Share it with your friends and followers',
    saveForLater: 'Save for Later',
    stylingTips: 'Styling Tips',
    discoverStyleStories: 'Discover our curated style stories that showcase fashion inspiration and trends.',
    styleStory: 'Style Story',
    viewStory: 'View Story →',
    noStyleStoriesAvailable: 'No Style Stories Available',
    workingOnStyleStories: 'We\'re working on creating amazing style stories. Check back soon or browse our products in the meantime.',
    discoverProductsInStyleStory: 'Discover the products featured in this {{title}} style story.',
    noProductsInStyleStory: 'No Products in this Style Story',
    styleStoryNoProductsYet: 'This style story doesn\'t have any products yet.',
  },
  fr: {
    home: 'Accueil',
    products: 'Produits',
    categories: 'Catégories',
    collections: 'Collections',
    about: 'À propos',
    contact: 'Contact',
    cart: 'Panier',
    wishlist: 'Liste de souhaits',
    gallery: 'Galerie',
    allProductsPage: 'Tous les produits',
    productsFoundCount: '{{count}} produits trouvés',
    previousPage: 'Précédent',
    nextPage: 'Suivant',
    productGallery: 'Galerie de produits',
    galleryDescription: 'Explorez notre collection complète d\'images de produits',
    search: 'Rechercher',
    filter: 'Filtrer',
    sortBy: 'Trier par',
    priceRange: 'Fourchette de prix',
    category: 'Catégorie',
    size: 'Taille',
    color: 'Couleur',
    material: 'Matériau',
    onSale: 'En solde',
    newArrivals: 'Nouveautés',
    addToCart: 'Ajouter au panier',
    viewDetails: 'Voir les détails',
    share: 'Partager',
    loading: 'Chargement...',
    noProductsFound: 'Aucun produit trouvé',
    featuredProducts: 'Produits en vedette',
    shopNow: 'Acheter maintenant',
    discoverMore: 'Découvrir plus',
    liveChat: 'Chat en direct',
    copyright: '© {{year}} Tama Shop. Tous droits réservés.',
    continueShopping: 'Continuer les achats',
    inStock: 'En stock',
    outOfStock: 'Épuisé',
    applyFilters: 'Appliquer les filtres',
    company: 'Entreprise',
    meetTheTeam: 'Rencontrez l\'équipe',
    careers: 'Carrières',
    helpfulLinks: 'Liens utiles',
    faqs: 'FAQ',
    legal: 'Légal',
    accessibility: 'Accessibilité',
    returnsPolicy: 'Politique de retour',
    refundPolicy: 'Politique de remboursement',
    termsAndConditions: 'Termes et conditions',
    footerDescription: 'Achetez la dernière mode et exprimez votre individualité.',
    madeWithLove: 'Fait avec ❤️',
    millionCustomers: '1 Million+ de Clients Satisfaits',
    trustedCustomers: 'Approuvé par des clients du monde entier',
    colorRequired: 'Veuillez sélectionner une couleur',
    sizeRequired: 'Veuillez sélectionner une taille',
    addedToCart: 'Ajouté au panier',
    itemAdded: 'Article ajouté au panier',
    removedFromWishlist: 'Retiré de la liste de souhaits',
    addedToWishlist: 'Ajouté à la liste de souhaits',
    quickAdd: 'Ajout rapide',
    myWishlist: 'Ma liste de souhaits',
    wishlistDescription: 'Vos articles préférés, sauvegardés pour plus tard',
    item: 'article',
    items: 'articles',
    clearAll: 'Tout effacer',
    wishlistCleared: 'Liste de souhaits effacée',
    wishlistEmpty: 'Votre liste de souhaits est vide',
    startAddingItems: 'Commencez à ajouter des articles que vous aimez à votre liste de souhaits',
    browseProducts: 'Parcourir les produits',
    savedItems: 'Articles sauvegardés',
    curatedSelection: 'Une sélection organisée d\'articles que vous avez sauvegardés',
    filters: 'Filtres',
    applyPriceFilter: 'Appliquer le filtre de prix',
    filterSize: 'Taille',
    filterColor: 'Couleur',
    specialOffers: 'Offres spéciales',
    filterSortBy: 'Trier par',
    filterDefault: 'Par défaut',
    priceLow: 'Prix: Croissant',
    priceHigh: 'Prix: Décroissant',
    newest: 'Plus récent',
    popularity: 'Popularité',
    resetAll: 'Tout réinitialiser',
    imagesLabel: 'Images',
    productsLabel: 'Produits',
    allProductImages: 'Toutes les images de produits',
    browseVisualCollection: 'Parcourez notre collection visuelle',
    stopAutoScroll: 'Arrêter le défilement automatique',
    autoScroll: 'Défilement automatique',
    noImagesAvailable: 'Aucune image disponible',
    workingOnImages: 'Nous travaillons à ajouter plus d\'images',
    browseProductsGallery: 'Parcourir la galerie de produits',
    ourProducts: 'Nos Produits',
    tryAdjustingSearch: 'Essayez d\'ajuster votre recherche ou vos filtres',
    ourCategoryList: 'Notre liste de catégories',
    categoryItems: 'Articles de catégorie',
    ourFeaturedCollections: 'Nos collections en vedette',
    seeMoreProducts: 'Voir plus de produits',
    nameRequired: 'Le nom est requis',
    enterFullName: 'Entrez votre nom complet',
    selectTown: 'Sélectionnez votre ville',
    enterLocation: 'Entrez votre emplacement',
    enterPhone: 'Entrez votre numéro de téléphone',
    orderSubmitted: 'Commande soumise',
    orderSuccess: 'Votre commande a été soumise avec succès !',
    cancel: 'Annuler',
    reviewRequired: 'L\'avis est requis',
    writeReview: 'Écrivez votre avis ici...',
    reviews: 'Avis',
    customerReviews: 'Avis clients',
    voiceSearchNotSupported: 'La recherche vocale n\'est pas prise en charge dans ce navigateur',
    searchPlaceholder: 'Rechercher des produits...',
    stopVoiceSearch: 'Arrêter la recherche vocale',
    startVoiceSearch: 'Démarrer la recherche vocale',
    recentSearches: 'Recherches récentes',
    backToProducts: 'Retour aux produits',
    categoriesDescription: 'Explorez nos collections organisées par style, occasion et thème. Trouvez exactement ce que vous cherchez.',
    discoverCollection: 'Découvrez notre collection {{category}}',
    noCategoriesFound: 'Aucune catégorie trouvée',
    workingOnCategories: 'Nous travaillons à organiser nos catégories. Revenez bientôt !',
    browseAllProducts: 'Parcourir tous les produits',
    collectionsDescription: 'Explorez nos collections organisées, chacune racontant une histoire unique à travers la mode. Des tendances saisonnières aux pièces intemporelles, trouvez votre style parfait.',
    exploreNow: 'Explorer maintenant',
    noCollectionsAvailable: 'Aucune collection disponible',
    workingOnCollections: 'Nous travaillons à vous apporter des collections étonnantes. Revenez bientôt !',
    aboutTitle: 'À propos ',
    aboutClothing: 'Vêtements ',
    aboutDescription: 'Tama Clothing est une marque de mode tunisienne qui célèbre la tradition, la modernité et l\'authenticité. Notre mission est de créer des vêtements de haute qualité qui reflètent la culture vibrante de la Tunisie tout en embrassant un mode de vie contemporain.',
    ourStory: 'Notre Histoire',
    ourStoryDescription: 'Fondée en Tunisie, Tama Clothing est née d\'une passion pour le style et l\'héritage. Nous mélangeons les motifs et tissus tunisiens traditionnels avec des designs modernes pour créer des pièces à la fois intemporelles et tendance. Chaque collection reflète notre dévouement à l\'artisanat et à la fierté culturelle.',
    ourMission: 'Notre Mission',
    ourMissionDescription: 'Nous visons à inspirer la confiance et l\'individualité à travers la mode. En combinant des pratiques durables et un design créatif, Tama Clothing représente plus que le style — elle incarne l\'identité, la culture et un engagement envers l\'avenir.',
    whyTitle: 'Pourquoi ',
    whyQuestion: '? ',
    whyDescription: 'Chez Tama, nous croyons que les vêtements sont plus que du tissu — c\'est une histoire. Des matériaux soigneusement sélectionnés aux collections conçues avec soin, nous nous assurons que chaque pièce représente la richesse de l\'héritage tunisien avec une touche moderne.',
    styleStories: 'Histoires de Style',
    lookbookNotFound: 'Histoire de Style Non Trouvée',
    backToStyleStories: 'Retour aux Histoires de Style',
    theLook: 'Le Look',
    shopTheLook: 'Acheter le Look',
    shopTheLookDescription: 'Découvrez les pièces qui complètent ce look. Chaque article est soigneusement sélectionné pour donner vie à la vision.',
    loveThisLook: 'Vous aimez ce look ?',
    shareWithFriends: 'Partagez-le avec vos amis et abonnés',
    saveForLater: 'Sauvegarder pour Plus Tard',
    stylingTips: 'Conseils de Style',
    discoverStyleStories: 'Découvrez nos histoires de style organisées qui mettent en valeur l\'inspiration et les tendances de la mode.',
    styleStory: 'Histoire de Style',
    viewStory: 'Voir l\'Histoire →',
    noStyleStoriesAvailable: 'Aucune Histoire de Style Disponible',
    workingOnStyleStories: 'Nous travaillons à créer des histoires de style étonnantes. Revenez bientôt ou parcourez nos produits en attendant.',
    discoverProductsInStyleStory: 'Découvrez les produits présentés dans cette histoire de style {{title}}.',
    noProductsInStyleStory: 'Aucun Produit dans cette Histoire de Style',
    styleStoryNoProductsYet: 'Cette histoire de style n\'a pas encore de produits.',
  },
  ar: {
    home: 'الرئيسية',
    products: 'المنتجات',
    categories: 'الفئات',
    collections: 'المجموعات',
    about: 'حول',
    contact: 'اتصل بنا',
    cart: 'السلة',
    wishlist: 'المفضلة',
    gallery: 'المعرض',
    allProductsPage: 'جميع المنتجات',
    productsFoundCount: '{{count}} منتج موجود',
    previousPage: 'السابق',
    nextPage: 'التالي',
    productGallery: 'معرض المنتجات',
    galleryDescription: 'استكشف مجموعتنا الكاملة من صور المنتجات',
    search: 'بحث',
    filter: 'تصفية',
    sortBy: 'ترتيب حسب',
    priceRange: 'نطاق السعر',
    category: 'الفئة',
    size: 'الحجم',
    color: 'اللون',
    material: 'المادة',
    onSale: 'للبيع',
    newArrivals: 'الوافدون الجدد',
    addToCart: 'أضف إلى السلة',
    viewDetails: 'عرض التفاصيل',
    share: 'مشاركة',
    loading: 'جارٍ التحميل...',
    noProductsFound: 'لم يتم العثور على منتجات',
    featuredProducts: 'المنتجات المميزة',
    shopNow: 'تسوق الآن',
    discoverMore: 'اكتشف المزيد',
    liveChat: 'دردشة مباشرة',
    copyright: '© {{year}} متجر تاما. جميع الحقوق محفوظة.',
    continueShopping: 'متابعة التسوق',
    inStock: 'متوفر',
    outOfStock: 'غير متوفر',
    applyFilters: 'تطبيق المرشحات',
    company: 'الشركة',
    meetTheTeam: 'تعرف على الفريق',
    careers: 'الوظائف',
    helpfulLinks: 'روابط مفيدة',
    faqs: 'الأسئلة الشائعة',
    legal: 'قانوني',
    accessibility: 'إمكانية الوصول',
    returnsPolicy: 'سياسة الإرجاع',
    refundPolicy: 'سياسة الاسترداد',
    termsAndConditions: 'الشروط والأحكام',
    footerDescription: 'تسوق أحدث الموضة وأعبر عن فرديتك.',
    madeWithLove: 'مصنوع بـ ❤️',
    millionCustomers: 'أكثر من مليون عميل سعيد',
    trustedCustomers: 'موثوق به من قبل العملاء في جميع أنحاء العالم',
    colorRequired: 'يرجى اختيار لون',
    sizeRequired: 'يرجى اختيار حجم',
    addedToCart: 'تمت الإضافة إلى السلة',
    itemAdded: 'تمت إضافة العنصر إلى السلة',
    removedFromWishlist: 'تم الحذف من المفضلة',
    addedToWishlist: 'تمت الإضافة إلى المفضلة',
    quickAdd: 'إضافة سريعة',
    myWishlist: 'مفضلتي',
    wishlistDescription: 'عناصرك المفضلة، محفوظة لوقت لاحق',
    item: 'عنصر',
    items: 'عناصر',
    clearAll: 'مسح الكل',
    wishlistCleared: 'تم مسح المفضلة',
    wishlistEmpty: 'مفضلتك فارغة',
    startAddingItems: 'ابدأ بإضافة العناصر التي تحبها إلى مفضلتك',
    browseProducts: 'تصفح المنتجات',
    savedItems: 'العناصر المحفوظة',
    curatedSelection: 'مجموعة منتقاة من العناصر التي حفظتها',
    filters: 'المرشحات',
    applyPriceFilter: 'تطبيق مرشح السعر',
    filterSize: 'الحجم',
    filterColor: 'اللون',
    specialOffers: 'العروض الخاصة',
    filterSortBy: 'ترتيب حسب',
    filterDefault: 'افتراضي',
    priceLow: 'السعر: من الأقل للأعلى',
    priceHigh: 'السعر: من الأعلى للأقل',
    newest: 'الأحدث',
    popularity: 'الشعبية',
    resetAll: 'إعادة تعيين الكل',
    imagesLabel: 'الصور',
    productsLabel: 'المنتجات',
    allProductImages: 'جميع صور المنتجات',
    browseVisualCollection: 'تصفح مجموعتنا البصرية',
    stopAutoScroll: 'إيقاف التمرير التلقائي',
    autoScroll: 'التمرير التلقائي',
    noImagesAvailable: 'لا توجد صور متاحة',
    workingOnImages: 'نحن نعمل على إضافة المزيد من الصور',
    browseProductsGallery: 'تصفح معرض المنتجات',
    ourProducts: 'منتجاتنا',
    tryAdjustingSearch: 'جرب تعديل بحثك أو مرشحاتك',
    ourCategoryList: 'قائمة فئاتنا',
    categoryItems: 'عناصر الفئة',
    ourFeaturedCollections: 'مجموعاتنا المميزة',
    seeMoreProducts: 'شاهد المزيد من المنتجات',
    nameRequired: 'الاسم مطلوب',
    enterFullName: 'أدخل اسمك الكامل',
    selectTown: 'اختر مدينتك',
    enterLocation: 'أدخل موقعك',
    enterPhone: 'أدخل رقم هاتفك',
    orderSubmitted: 'تم تقديم الطلب',
    orderSuccess: 'تم تقديم طلبك بنجاح!',
    cancel: 'إلغاء',
    reviewRequired: 'المراجعة مطلوبة',
    writeReview: 'اكتب مراجعتك هنا...',
    reviews: 'المراجعات',
    customerReviews: 'مراجعات العملاء',
    voiceSearchNotSupported: 'البحث الصوتي غير مدعوم في هذا المتصفح',
    searchPlaceholder: 'البحث عن المنتجات...',
    stopVoiceSearch: 'إيقاف البحث الصوتي',
    startVoiceSearch: 'بدء البحث الصوتي',
    recentSearches: 'عمليات البحث الأخيرة',
    backToProducts: 'العودة إلى المنتجات',
    categoriesDescription: 'استكشف مجموعاتنا المنظمة حسب الأسلوب والمناسبة والموضوع. ابحث عن ما تبحث عنه بالضبط.',
    discoverCollection: 'اكتشف مجموعتنا {{category}}',
    noCategoriesFound: 'لم يتم العثور على فئات',
    workingOnCategories: 'نحن نعمل على تنظيم فئاتنا. تحقق مرة أخرى قريباً!',
    browseAllProducts: 'تصفح جميع المنتجات',
    collectionsDescription: 'استكشف مجموعاتنا المنظمة، كل واحدة تحكي قصة فريدة من خلال الموضة. من الاتجاهات الموسمية إلى القطع الخالدة، ابحث عن أسلوبك المثالي.',
    exploreNow: 'استكشف الآن',
    noCollectionsAvailable: 'لا توجد مجموعات متاحة',
    workingOnCollections: 'نحن نعمل على تقديم مجموعات رائعة لك. تحقق مرة أخرى قريباً!',
    aboutTitle: 'حول ',
    aboutClothing: 'الملابس ',
    aboutDescription: 'تاما كلوزينج هي علامة أزياء تونسية تحتفل بالتقاليد والحداثة والأصالة. مهمتنا هي إنشاء ملابس عالية الجودة تعكس الثقافة النابضة بالحياة في تونس مع تبني نمط حياة معاصر.',
    ourStory: 'قصتنا',
    ourStoryDescription: 'تأسست في تونس، ولدت تاما كلوزينج من شغف بالأسلوب والتراث. نحن ندمج الأنماط والأقمشة التونسية التقليدية مع التصاميم الحديثة لإنشاء قطع خالدة ومتميزة. كل مجموعة تعكس التزامنا بالحرفية والفخر الثقافي.',
    ourMission: 'مهمتنا',
    ourMissionDescription: 'نهدف إلى إلهام الثقة والفردية من خلال الموضة. من خلال الجمع بين الممارسات المستدامة والتصميم الإبداعي، تمثل تاما كلوزينج أكثر من مجرد أسلوب — إنها تمثل الهوية والثقافة والالتزام بالمستقبل.',
    whyTitle: 'لماذا ',
    whyQuestion: '؟ ',
    whyDescription: 'في تاما، نؤمن أن الملابس أكثر من مجرد قماش — إنها قصة. من المواد المختارة بعناية إلى المجموعات المصممة بعناية، نحن نضمن أن كل قطعة تمثل غنى التراث التونسي بلمسة حديثة.',
    styleStories: 'قصص الأسلوب',
    lookbookNotFound: 'لم يتم العثور على قصة الأسلوب',
    backToStyleStories: 'العودة إلى قصص الأسلوب',
    theLook: 'المظهر',
    shopTheLook: 'تسوق المظهر',
    shopTheLookDescription: 'اكتشف القطع التي تكمل هذا المظهر. كل عنصر تم اختياره بعناية لإحياء الرؤية.',
    loveThisLook: 'أتحب هذا المظهر؟',
    shareWithFriends: 'شاركه مع أصدقائك ومتابعيك',
    saveForLater: 'حفظ لوقت لاحق',
    stylingTips: 'نصائح التصميم',
    discoverStyleStories: 'اكتشف قصص أسلوبنا المنظمة التي تبرز الإلهام والاتجاهات في الموضة.',
    styleStory: 'قصة الأسلوب',
    viewStory: 'عرض القصة →',
    noStyleStoriesAvailable: 'لا توجد قصص أسلوب متاحة',
    workingOnStyleStories: 'نحن نعمل على إنشاء قصص أسلوب رائعة. تحقق مرة أخرى قريباً أو تصفح منتجاتنا في الوقت الحالي.',
    discoverProductsInStyleStory: 'اكتشف المنتجات المميزة في قصة الأسلوب هذه {{title}}.',
    noProductsInStyleStory: 'لا توجد منتجات في قصة الأسلوب هذه',
    styleStoryNoProductsYet: 'قصة الأسلوب هذه لا تحتوي على أي منتجات بعد.',
  },
};