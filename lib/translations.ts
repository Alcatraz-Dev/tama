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
  | 'all'
  | 'more'
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
  | 'recentlyViewed'
  | 'recentlyViewedDescription'
  | 'noRecentlyViewed'
  | 'startBrowsing'
  | 'yourRecentlyViewed'
  | 'discoverMoreProducts'
  | 'loyaltyProgram'
  | 'loyaltyDescription'
  | 'howToEarnPoints'
  | 'earnPointsPerDT'
  | 'bonusPointsReviews'
  | 'doublePointsPromotions'
  | 'tierBenefits'
  | 'bronzeTier'
  | 'silverTier'
  | 'goldTier'
  | 'pointsRequired'
  | 'pointsPerDT'
  | 'totalPoints'
  | 'nextTier'
  | 'recentActivity'
  | 'startEarningPoints'
  | 'pointsEarned'
  | 'pointsEarnedGeneric'
  | 'keepShopping'
  | 'newMember'
  | 'points'
  | 'pointsPerDT'
  | 'pointsToGo'
  | 'liveSupport'
  | 'online'
  | 'typeMessage'
  | 'chatGreeting'
  | 'chatResponse'
  | 'chatGreetingFallback'
  | 'chatResponseFallback'
  | 'openChat'
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
  | 'tamaStories'
  | 'lookbookNotFound'
  | 'backToTamaStories'
  | 'theLook'
  | 'shopTheLook'
  | 'shopTheLookDescription'
  | 'loveThisLook'
  | 'shareWithFriends'
  | 'saveForLater'
  | 'stylingTips'
  | 'discoverTamaStories'
  | 'tamaStory'
  | 'viewStory'
  | 'noTamaStoriesAvailable'
  | 'workingOnTamaStories'
  | 'discoverProductsInTamaStory'
  | 'noProductsInTamaStory'
  | 'tamaStoryNoProductsYet'
  | 'browseAllProducts'
  | 'materials'
  | 'careInstructions'
  | 'details'
  | 'shippingInformation'
  | 'freeShippingInfo'
  | 'returnsExchanges'
  | 'returnPolicy'
  | 'warranty'
  | 'warrantyInfo'
  | 'shop'
  | 'support'
  | 'explore'
  | 'totalItems'
  | 'validItems'
  | 'writeYourReview'
  | 'yourName'
  | 'enterYourName'
  | 'rating'
  | 'yourReview'
  | 'shareThoughts'
  | 'submitting'
  | 'submitReview'
  | 'noReviewsYet'
  | 'beFirstToReview'
  | 'verifiedPurchase'
  | 'completeYourOrder'
  | 'fullName'
  | 'enterYourFullName'
  | 'town'
  | 'selectYourTown'
  | 'location'
  | 'enterYourLocation'
  | 'phoneNumber'
  | 'enterYourPhoneNumber'
  | 'completeOrder'
  | 'quantity'
  | 'buyNow'
  | 'shareProduct'
  | 'cancelReview'
  | 'writeReview'
  | 'reviewSubmitted'
  | 'thankYouFeedback'
  | 'checkOutThisProduct'
  | 'linkCopiedToClipboard'
  | 'viewProduct'
  | 'missingFullName'
  | 'enterYourFullName'
  | 'missingTown'
  | 'selectYourTown'
  | 'missingLocation'
  | 'enterYourLocation'
  | 'missingPhoneNumber'
  | 'enterYourPhoneNumber'
  | 'orderSubmittedSuccessfully'
  | 'orderReceivedMessage'
  | 'failedToSubmitOrder'
  | 'pleaseTryAgain'
  | 'yourCartIsEmpty'
  | 'yourCart'
  | 'sizeLabel'
  | 'remove'
  | 'subtotal'
  | 'shipping'
  | 'total'
  | 'proceedToCheckout'
  | 'fullName'
  | 'selectTunisianTown'
  | 'location'
  | 'phoneNumber'
  | 'cancel'
  | 'submitting'
  | 'submitOrder'
  | 'currency'
  | 'categoryNotFound'
  | 'categoryNotFoundDesc'
  | 'collectionNotFound'
  | 'backToCollections'
  | 'collectionPieces'
  | 'discoverCompleteCollection'
  | 'filterProducts'
  | 'allCategories'
  | 'minPrice'
  | 'maxPrice'
  | 'clearFilters'
  | 'noProductsInCollection'
  | 'casual'
  | 'elegant'
  | 'bohemian'
  | 'minimalist'
  | 'streetwear'
  | 'vintage'
  | 'romantic'
  | 'athletic'
  | 'professional'
  | 'festive'
  | 'layer_jacket'
  | 'neutral_accessories'
  | 'belt_waist'
  | 'comfortable_footwear'
  | 'mix_patterns'
  | 'day_night_transition'
  | 'metallic_accents'
  | 'breathable_fabrics'
  | 'fitted_relaxed_balance'
  | 'scarf_shawl'
  | 'spring'
  | 'summer'
  | 'fall'
  | 'winter'
  | 'contactTitle'
  | 'contactDescription'
  | 'getInTouch'
  | 'sendMessage'
  | 'address'
  | 'phone'
  | 'email'
  | 'businessHours'
  | 'contactName'
  | 'contactEmail'
  | 'contactSubject'
  | 'contactMessage'
  | 'sendMessageBtn'
  | 'messageSent'
  | 'messageSentDesc'
  | 'enterContactName'
  | 'enterContactEmail'
  | 'enterContactSubject'
  | 'enterContactMessage'
  | 'sizeGuide'
  | 'sizeGuideDescription'
  | 'howToMeasure'
  | 'measurementTips'
  | 'chest'
  | 'waist'
  | 'hips'
  | 'inseam'
  | 'shoulder'
  | 'sleeve'
  | 'tops'
  | 'bottoms'
  | 'dresses'
  | 'outerwear'
  | 'guideSize'
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | 'xxl'
  | 'measurements'
  | 'inches'
  | 'cm'
  | 'sizeGuideHelp'
  | 'contactUsBtn'
  | 'measurementTips'
  | 'chestInstruction'
  | 'waistInstruction'
  | 'hipsInstruction'
  | 'inseamInstruction'
  | 'faq'
  | 'faqDescription'
  | 'faqShipping'
  | 'faqShippingAnswer'
  | 'faqReturns'
  | 'faqReturnsAnswer'
  | 'faqPayment'
  | 'faqPaymentAnswer'
  | 'faqSize'
  | 'faqSizeAnswer'
  | 'faqQuality'
  | 'faqQualityAnswer'
  | 'faqCare'
  | 'faqCareAnswer'
  | 'faqOrder'
  | 'faqOrderAnswer'
  | 'faqContact'
  | 'faqContactAnswer'
  | 'navFaq'
  | 'adsTitle'
  | 'adsDescription'
  | 'noAdsAvailable'
  | 'inactive'
  | 'from'
  | 'to'
  | 'learnMore'
  | 'sliderView'
  | 'gridView'
  | 'comingSoon'
  | 'adCurrentlyInactive'
  | 'checkBackSoon'
  | 'video'
  | 'ad'
  | 'ads'
  | 'banner'
  | 'sidebar'
  | 'footer'
  | 'popup'
  | 'bannerAds'
  | 'sidebarAds'
  | 'footerAds'
  | 'popupAds'
  | 'bannerAd'
  | 'sidebarAd'
  | 'footerAd'
  | 'popupAd'
  | 'expired'
  | 'endsIn'
  | 'daysShort'
  | 'hoursShort'
  | 'minutesShort'
  | 'secondsShort'
  | 'fit_regular'
  | 'fit_slim'
  | 'fit_loose'
  | 'fit_oversized'
  | 'style_casual'
  | 'style_formal'
  | 'style_bohemian'
  | 'style_minimalist'
  | 'style_streetwear'
  | 'style_vintage'
  | 'style_romantic'
  | 'style_athletic'
  | 'style_professional'
  | 'style_festive'
  | 'neckline_vneck'
  | 'neckline_round'
  | 'neckline_scoop'
  | 'neckline_square'
  | 'sleeve_short'
  | 'sleeve_long'
  | 'sleeve_sleeveless'
  | 'sleeve_threequarter'
  | 'length_mini'
  | 'length_knee'
  | 'length_midi'
  | 'length_maxi'
  | 'length_cropped'
  | 'pattern_solid'
  | 'pattern_striped'
  | 'pattern_floral'
  | 'pattern_polkadot'
  | 'pattern_geometric'
  | 'pattern_animal'
  | 'occasion_everyday'
  | 'occasion_work'
  | 'occasion_party'
  | 'occasion_wedding'
  | 'occasion_beach'
  | 'season_spring'
  | 'season_summer'
  | 'season_fall'
  | 'season_winter'
  | 'closure_button'
  | 'closure_zipper'
  | 'closure_tie'
  | 'closure_elastic'
  | 'cotton'
  | 'polyester'
  | 'silk'
  | 'wool'
  | 'linen'
  | 'leather'
  | 'denim'
  | 'chiffon'
  | 'satin'
  | 'velvet'
  | 'lace'
  | 'mesh'
  | 'nylon'
  | 'spandex'
  | 'rayon'
  | 'acrylic'
  | 'machine_wash_cold'
  | 'hand_wash_only'
  | 'do_not_wash'
  | 'dry_clean_only'
  | 'tumble_dry_low'
  | 'hang_dry'
  | 'do_not_tumble_dry'
  | 'iron_on_low_heat'
  | 'do_not_iron'
  | 'do_not_bleach'
  | 'bleach_when_needed'
  | 'store_in_cool_dry_place'
  | 'avoid_direct_sunlight'
  | 'professional_cleaning_recommended'
  | 'free_shipping_over_100'
  | 'express_shipping_15'
  | 'international_shipping'
  | 'local_pickup'
  | 'same_day_delivery_tunis'
  | 'premium_shipping_25'
  | 'return_policy_30_days'
  | 'return_policy_14_days'
  | 'return_policy_7_days'
  | 'no_returns_on_sale'
  | 'free_returns_exchanges'
  | 'store_credit_only'
  | 'no_returns'
  | 'redeemLoyaltyPoints'
  | 'usePointsForDiscounts'
  | 'pointsAvailable'
  | 'redeem100Points'
  | 'redeem200Points'
  | 'addItemsToRedeem'
  | 'redeemed100Points'
  | 'redeemed200Points'
  | 'notEnoughPoints';

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
    all: 'All',
    more: 'More',
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
    recentlyViewed: 'Recently Viewed',
    recentlyViewedDescription: 'Your recently viewed products are saved here for easy access',
    noRecentlyViewed: 'No Recently Viewed Products',
    startBrowsing: 'Start browsing our products to see them here',
    yourRecentlyViewed: 'Your Recently Viewed Products',
    discoverMoreProducts: 'Discover more products in our collection',
    loyaltyProgram: 'Loyalty Program',
    loyaltyDescription: 'Earn points with every purchase and unlock exclusive rewards',
    howToEarnPoints: 'How to Earn Points',
    earnPointsPerDT: 'Earn 1 point for every 1 DT spent',
    bonusPointsReviews: 'Bonus points for reviews and referrals',
    doublePointsPromotions: 'Double points on special promotions',
    tierBenefits: 'Tier Benefits',
    bronzeTier: 'Bronze',
    silverTier: 'Silver',
    goldTier: 'Gold',
    pointsRequired: '{{points}}+ points',
    totalPoints: 'Total Points',
    nextTier: 'Next Tier',
    recentActivity: 'Recent Activity',
    startEarningPoints: 'Start shopping to earn loyalty points!',
    pointsEarned: 'Earned {{points}} loyalty points!',
    pointsEarnedGeneric: 'Loyalty points earned!',
    keepShopping: 'Keep shopping to earn more points!',
    newMember: 'New Member',
    points: 'points',
    pointsPerDT: '+1 per DT',
    liveSupport: 'Live Support',
    online: 'Online',
    typeMessage: 'Type your message...',
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
    tamaStories: 'Tama Stories',
    lookbookNotFound: 'Tama Story Not Found',
    backToTamaStories: 'Back to Tama Stories',
    theLook: 'The Look',
    shopTheLook: 'Shop the Look',
    shopTheLookDescription: 'Discover the pieces that make this look complete. Each item is carefully selected to bring the vision to life.',
    loveThisLook: 'Love this look?',
    shareWithFriends: 'Share it with your friends and followers',
    saveForLater: 'Save for Later',
    stylingTips: 'Styling Tips',
    discoverTamaStories: 'Discover our curated Tama stories that showcase fashion inspiration and trends.',
    tamaStory: 'Tama Story',
    viewStory: 'View Story →',
    noTamaStoriesAvailable: 'No Tama Stories Available',
    workingOnTamaStories: 'We\'re working on creating amazing Tama stories. Check back soon or browse our products in the meantime.',
    discoverProductsInTamaStory: 'Discover the products featured in this {{title}} Tama story.',
    noProductsInTamaStory: 'No Products in this Tama Story',
    tamaStoryNoProductsYet: 'This Tama story doesn\'t have any products yet.',
    materials: 'Materials',
    careInstructions: 'Care Instructions',
    details: 'Details',
    shippingInformation: 'Shipping Information',
    freeShippingInfo: 'Free shipping on orders over 100 DT. Standard delivery within 3-5 business days.',
    returnsExchanges: 'Returns & Exchanges',
    returnPolicy: '30-day return policy. Items must be unused and in original packaging.',
    warranty: 'Warranty',
    warrantyInfo: '1-year warranty against manufacturing defects.',
    writeYourReview: 'Write Your Review',
    yourName: 'Your Name',
    enterYourName: 'Enter your name',
    rating: 'Rating',
    yourReview: 'Your Review',
    shareThoughts: 'Share your thoughts about this product...',
    submitting: 'Submitting...',
    submitReview: 'Submit Review',
    noReviewsYet: 'No reviews yet',
    beFirstToReview: 'Be the first to review this product!',
    verifiedPurchase: 'Verified Purchase',
    completeYourOrder: 'Complete Your Order',
    fullName: 'Full Name',
    enterYourFullName: 'Enter your full name',
    town: 'Town',
    selectYourTown: 'Select your town',
    location: 'Location',
    enterYourLocation: 'Enter your location',
    phoneNumber: 'Phone Number',
    enterYourPhoneNumber: 'Enter your phone number',
    completeOrder: 'Complete Order',
    quantity: 'Quantity',
    buyNow: 'Buy Now',
    shareProduct: 'Share Product',
    cancelReview: 'Cancel Review',
    reviewSubmitted: 'Review Submitted',
    thankYouFeedback: 'Thank you for your feedback!',
    checkOutThisProduct: 'Check out this {{title}}!',
    linkCopiedToClipboard: 'Link copied to clipboard!',
    viewProduct: 'View Product',
    missingFullName: 'Missing Full Name',
    orderSubmittedSuccessfully: 'Order submitted successfully!',
    orderReceivedMessage: 'We have received your order and will process it shortly.',
    failedToSubmitOrder: 'Failed to submit order',
    pleaseTryAgain: 'Please try again.',
    yourCartIsEmpty: 'Your cart is empty.',
    yourCart: 'Your Cart',
    sizeLabel: 'Size',
    remove: 'Remove',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    total: 'Total',
    proceedToCheckout: 'Proceed to Checkout',
    selectTunisianTown: 'Select Tunisian Town',
    submitOrder: 'Submit Order',
    currency: 'DT',
    categoryNotFound: 'Category Not Found',
    categoryNotFoundDesc: 'The category you\'re looking for doesn\'t exist.',
    collectionNotFound: 'Collection Not Found',
    backToCollections: 'Back to Collections',
    collectionPieces: 'Collection Pieces',
    discoverCompleteCollection: 'Discover the complete {{title}} collection. Each piece is carefully curated to reflect our vision for {{season}} {{year}}.',
    filterProducts: 'Filter Products',
    allCategories: 'All Categories',
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    clearFilters: 'Clear Filters',
    noProductsInCollection: 'No products in this collection yet.',
    casual: 'Casual',
    elegant: 'Elegant',
    bohemian: 'Bohemian',
    minimalist: 'Minimalist',
    streetwear: 'Streetwear',
    vintage: 'Vintage',
    romantic: 'Romantic',
    athletic: 'Athletic',
    professional: 'Professional',
    festive: 'Festive',
    layer_jacket: 'Layer with a lightweight jacket for transitional weather',
    neutral_accessories: 'Pair with neutral accessories to keep the focus on the outfit',
    belt_waist: 'Add a belt to define your waist and enhance the silhouette',
    comfortable_footwear: 'Complete the look with comfortable yet stylish footwear',
    mix_patterns: 'Mix patterns carefully for a bold, fashion-forward statement',
    day_night_transition: 'Choose pieces that can transition from day to night effortlessly',
    metallic_accents: 'Incorporate metallic accents for a touch of glamour',
    breathable_fabrics: 'Opt for breathable fabrics perfect for all-day wear',
    fitted_relaxed_balance: 'Balance fitted and relaxed pieces for optimal comfort and style',
    scarf_shawl: 'Add a scarf or shawl for an instant style upgrade',
    spring: 'Spring',
    summer: 'Summer',
    fall: 'Fall',
    winter: 'Winter',
    contactTitle: 'Contact Us',
    contactDescription: 'Get in touch with us. We\'re here to help with any questions about our products or services.',
    getInTouch: 'Get In Touch',
    sendMessage: 'Send us a Message',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    businessHours: 'Business Hours',
    contactName: 'Your Name',
    contactEmail: 'Your Email',
    contactSubject: 'Subject',
    contactMessage: 'Your Message',
    sendMessageBtn: 'Send Message',
    messageSent: 'Message Sent',
    messageSentDesc: 'Thank you for your message. We\'ll get back to you soon!',
    enterContactName: 'Enter your full name',
    enterContactEmail: 'Enter your email address',
    enterContactSubject: 'Enter the subject',
    enterContactMessage: 'Tell us how we can help...',
    sizeGuide: 'Size Guide',
    sizeGuideDescription: 'Find your perfect fit with our detailed size guide. Accurate measurements ensure the best shopping experience.',
    howToMeasure: 'How to Measure',
    measurementTips: 'For the most accurate measurements, wear form-fitting clothing and measure yourself in front of a mirror.',
    chest: 'Chest',
    waist: 'Waist',
    hips: 'Hips',
    inseam: 'Inseam',
    shoulder: 'Shoulder',
    sleeve: 'Sleeve',
    tops: 'Tops',
    bottoms: 'Bottoms',
    dresses: 'Dresses',
    outerwear: 'Outerwear',
    guideSize: 'Size',
    xs: 'XS',
    s: 'S',
    m: 'M',
    l: 'L',
    xl: 'XL',
    xxl: 'XXL',
    measurements: 'Measurements',
    inches: 'inches',
    cm: 'cm',
    sizeGuideHelp: 'Still unsure about your size? Contact our customer service for personalized assistance.',
    contactUsBtn: 'Contact Us',
    chestInstruction: 'Measure around the fullest part of your chest',
    waistInstruction: 'Measure around your natural waistline',
    hipsInstruction: 'Measure around the fullest part of your hips',
    inseamInstruction: 'Measure from crotch to ankle',
    faq: 'Frequently Asked Questions',
    faqDescription: 'Find answers to the most common questions about our products, shipping, and services.',
    faqShipping: 'How long does shipping take?',
    faqShippingAnswer: 'Standard shipping within Tunisia takes 3-5 business days. International shipping takes 7-14 business days depending on the destination.',
    faqReturns: 'What is your return policy?',
    faqReturnsAnswer: 'We offer a 30-day return policy for unused items in their original packaging. Returns are free within Tunisia.',
    faqPayment: 'What payment methods do you accept?',
    faqPaymentAnswer: 'We accept credit cards, debit cards, and cash on delivery for local orders.',
    faqSize: 'How do I find my correct size?',
    faqSizeAnswer: 'Check our detailed size guide with measurements in both inches and centimeters. If you\'re still unsure, contact our customer service for personalized assistance.',
    faqQuality: 'What is the quality of your products?',
    faqQualityAnswer: 'All our products are made with high-quality materials and undergo strict quality control. We stand behind our craftsmanship with a 1-year warranty.',
    faqCare: 'How should I care for my Tama clothing?',
    faqCareAnswer: 'Follow the care instructions on each product label. Most items can be machine washed on gentle cycle and hung to dry.',
    faqOrder: 'How can I track my order?',
    faqOrderAnswer: 'Once your order ships, you\'ll receive a tracking number via email. You can also check your order status by contacting our customer service.',
    faqContact: 'How can I contact customer service?',
    faqContactAnswer: 'You can reach us through our contact form, by phone, or email. We\'re here to help Monday through Saturday.',
    navFaq: 'FAQ',
    adsTitle: 'Our Ads',
    adsDescription: 'Discover our latest promotional offers and special deals.',
    noAdsAvailable: 'No ads available at the moment.',
    inactive: 'Inactive',
    from: 'From',
    to: 'To',
    learnMore: 'Learn More',
    sliderView: 'Slider View',
    gridView: 'Grid View',
    comingSoon: 'Coming Soon',
    adCurrentlyInactive: 'This ad is currently not active',
    checkBackSoon: 'Check back soon for exciting offers and promotions.',
    video: 'Video',
    ad: 'ad',
    ads: 'ads',
    banner: 'Banner',
    sidebar: 'Sidebar',
    footer: 'Footer',
    popup: 'Popup',
    bannerAds: 'Banner Ads',
    sidebarAds: 'Sidebar Ads',
    footerAds: 'Footer Ads',
    popupAds: 'Popup Ads',
    bannerAd: 'Banner Ad',
    sidebarAd: 'Sidebar Ad',
    footerAd: 'Footer Ad',
    popupAd: 'Popup Ad',
    expired: 'Expired',
    endsIn: 'Ends in',
    daysShort: 'D',
    hoursShort: 'H',
    minutesShort: 'M',
    secondsShort: 'S',
    fit_regular: 'Fit: Regular',
    fit_slim: 'Fit: Slim',
    fit_loose: 'Fit: Loose',
    fit_oversized: 'Fit: Oversized',
    style_casual: 'Style: Casual',
    style_formal: 'Style: Formal',
    style_bohemian: 'Style: Bohemian',
    style_minimalist: 'Style: Minimalist',
    style_streetwear: 'Style: Streetwear',
    style_vintage: 'Style: Vintage',
    style_romantic: 'Style: Romantic',
    style_athletic: 'Style: Athletic',
    style_professional: 'Style: Professional',
    style_festive: 'Style: Festive',
    neckline_vneck: 'Neckline: V-neck',
    neckline_round: 'Neckline: Round neck',
    neckline_scoop: 'Neckline: Scoop neck',
    neckline_square: 'Neckline: Square neck',
    sleeve_short: 'Sleeve: Short sleeve',
    sleeve_long: 'Sleeve: Long sleeve',
    sleeve_sleeveless: 'Sleeve: Sleeveless',
    sleeve_threequarter: 'Sleeve: 3/4 sleeve',
    length_mini: 'Length: Mini',
    length_knee: 'Length: Knee-length',
    length_midi: 'Length: Midi',
    length_maxi: 'Length: Maxi',
    length_cropped: 'Length: Cropped',
    pattern_solid: 'Pattern: Solid',
    pattern_striped: 'Pattern: Striped',
    pattern_floral: 'Pattern: Floral',
    pattern_polkadot: 'Pattern: Polka dot',
    pattern_geometric: 'Pattern: Geometric',
    pattern_animal: 'Pattern: Animal print',
    occasion_everyday: 'Occasion: Everyday',
    occasion_work: 'Occasion: Work',
    occasion_party: 'Occasion: Party',
    occasion_wedding: 'Occasion: Wedding',
    occasion_beach: 'Occasion: Beach',
    season_spring: 'Season: Spring',
    season_summer: 'Season: Summer',
    season_fall: 'Season: Fall',
    season_winter: 'Season: Winter',
    closure_button: 'Closure: Button',
    closure_zipper: 'Closure: Zipper',
    closure_tie: 'Closure: Tie',
    closure_elastic: 'Closure: Elastic',
    cotton: 'Cotton',
    polyester: 'Polyester',
    silk: 'Silk',
    wool: 'Wool',
    linen: 'Linen',
    leather: 'Leather',
    denim: 'Denim',
    chiffon: 'Chiffon',
    satin: 'Satin',
    velvet: 'Velvet',
    lace: 'Lace',
    mesh: 'Mesh',
    nylon: 'Nylon',
    spandex: 'Spandex',
    rayon: 'Rayon',
    acrylic: 'Acrylic',
    machine_wash_cold: 'Machine wash cold',
    hand_wash_only: 'Hand wash only',
    do_not_wash: 'Do not wash',
    dry_clean_only: 'Dry clean only',
    tumble_dry_low: 'Tumble dry low',
    hang_dry: 'Hang dry',
    do_not_tumble_dry: 'Do not tumble dry',
    iron_on_low_heat: 'Iron on low heat',
    do_not_iron: 'Do not iron',
    do_not_bleach: 'Do not bleach',
    bleach_when_needed: 'Bleach when needed',
    store_in_cool_dry_place: 'Store in cool, dry place',
    avoid_direct_sunlight: 'Avoid direct sunlight',
    professional_cleaning_recommended: 'Professional cleaning recommended',
    free_shipping_over_100: 'Free shipping on orders over 100 DT. Standard delivery within 3-5 business days.',
    express_shipping_15: 'Express shipping available for 15 DT. Standard delivery within 3-5 business days.',
    international_shipping: 'International shipping available. Delivery time 7-14 business days depending on location.',
    local_pickup: 'Local pickup available at our store. Free shipping on orders over 50 DT.',
    same_day_delivery_tunis: 'Same day delivery available in Tunis for orders placed before 2 PM.',
    premium_shipping_25: 'Premium shipping available for 25 DT. Guaranteed delivery within 2 business days.',
    return_policy_30_days: '30-day return policy. Items must be unused and in original packaging.',
    return_policy_14_days: '14-day return policy. Items must be unused and in original packaging.',
    return_policy_7_days: '7-day return policy. Items must be unused and in original packaging.',
    no_returns_on_sale: 'No returns on sale items. Final sale items are not eligible for return.',
    free_returns_exchanges: 'Free returns and exchanges within 30 days. Items must be unused and in original packaging.',
    store_credit_only: 'Store credit only. Returns accepted within 30 days for store credit only. Items must be unused and in original packaging.',
    no_returns: 'No returns accepted on this item. All sales are final.',
    shop: "Shop",
    support: "Support",
    explore: "Explore",
    totalItems: "Total items:",
    validItems: "Valid:",
    redeemLoyaltyPoints: "Redeem Loyalty Points",
    usePointsForDiscounts: "Use your points for special discounts",
    pointsAvailable: "points available",
    redeem100Points: "Redeem 100 Points (10 DT off)",
    redeem200Points: "Redeem 200 Points (25 DT off)",
    addItemsToRedeem: "Add items to cart to redeem points",
    redeemed100Points: "Redeemed 100 points for 10 DT discount!",
    redeemed200Points: "Redeemed 200 points for 25 DT discount!",
    notEnoughPoints: "Not enough points!",
    pointsToGo: 'to achieve',
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
    all: 'Tous',
    more: 'Plus',
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
    recentlyViewed: 'Récemment consultés',
    recentlyViewedDescription: 'Vos produits récemment consultés sont sauvegardés ici pour un accès facile',
    noRecentlyViewed: 'Aucun produit récemment consulté',
    startBrowsing: 'Commencez à parcourir nos produits pour les voir ici',
    yourRecentlyViewed: 'Vos produits récemment consultés',
    discoverMoreProducts: 'Découvrez plus de produits dans notre collection',
    loyaltyProgram: 'Programme de Fidélité',
    loyaltyDescription: 'Gagnez des points avec chaque achat et débloquez des récompenses exclusives',
    howToEarnPoints: 'Comment gagner des points',
    earnPointsPerDT: 'Gagnez 1 point pour chaque 1 DT dépensé',
    bonusPointsReviews: 'Points bonus pour les avis et parrainages',
    doublePointsPromotions: 'Points doubles sur les promotions spéciales',
    tierBenefits: 'Avantages par niveau',
    bronzeTier: 'Bronze',
    silverTier: 'Argent',
    goldTier: 'Or',
    pointsRequired: '{{points}}+ points',
    pointsPerDT: '+1 par DT',
    totalPoints: 'Points Totaux',
    nextTier: 'Niveau Suivant',
    recentActivity: 'Activité Récente',
    startEarningPoints: 'Commencez à magasiner pour gagner des points de fidélité !',
    pointsEarned: 'Gagné {{points}} points de fidélité !',
    pointsEarnedGeneric: 'Points de fidélité gagnés !',
    keepShopping: 'Continuez à magasiner pour gagner plus de points !',
    newMember: 'Nouveau Membre',
    points: 'points',
    pointsToGo: 'à atteindre',
    liveSupport: 'Support en Direct',
    online: 'En ligne',
    typeMessage: 'Tapez votre message...',
    chatGreeting: 'Bonjour ! Comment puis-je vous aider dans vos achats aujourd\'hui ?',
    chatResponse: 'Merci pour votre message ! Notre équipe de service client vous répondra bientôt. En attendant, n\'hésitez pas à parcourir nos produits.',
    openChat: 'Ouvrir le chat',
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
    tamaStories: 'Histoires Tama',
    lookbookNotFound: 'Histoire Tama Non Trouvée',
    backToTamaStories: 'Retour aux Histoires Tama',
    theLook: 'Le Look',
    shopTheLook: 'Acheter le Look',
    shopTheLookDescription: 'Découvrez les pièces qui complètent ce look. Chaque article est soigneusement sélectionné pour donner vie à la vision.',
    loveThisLook: 'Vous aimez ce look ?',
    shareWithFriends: 'Partagez-le avec vos amis et abonnés',
    saveForLater: 'Sauvegarder pour Plus Tard',
    stylingTips: 'Conseils de Style',
    discoverTamaStories: 'Découvrez nos histoires Tama organisées qui mettent en valeur l\'inspiration et les tendances de la mode.',
    tamaStory: 'Histoire Tama',
    viewStory: 'Voir l\'Histoire →',
    noTamaStoriesAvailable: 'Aucune Histoire Tama Disponible',
    workingOnTamaStories: 'Nous travaillons à créer des histoires Tama étonnantes. Revenez bientôt ou parcourez nos produits en attendant.',
    discoverProductsInTamaStory: 'Découvrez les produits présentés dans cette histoire Tama {{title}}.',
    noProductsInTamaStory: 'Aucun Produit dans cette Histoire Tama',
    tamaStoryNoProductsYet: 'Cette histoire Tama n\'a pas encore de produits.',
    materials: 'Matériaux',
    careInstructions: 'Instructions d\'entretien',
    details: 'Détails',
    shippingInformation: 'Informations de livraison',
    freeShippingInfo: 'Livraison gratuite pour les commandes de plus de 100 DT. Livraison standard sous 3-5 jours ouvrables.',
    returnsExchanges: 'Retours et Échanges',
    returnPolicy: 'Politique de retour de 30 jours. Les articles doivent être inutilisés et dans leur emballage d\'origine.',
    warranty: 'Garantie',
    warrantyInfo: 'Garantie de 1 an contre les défauts de fabrication.',
    writeYourReview: 'Écrivez Votre Avis',
    yourName: 'Votre Nom',
    enterYourName: 'Entrez votre nom',
    rating: 'Évaluation',
    yourReview: 'Votre Avis',
    shareThoughts: 'Partagez vos pensées sur ce produit...',
    submitting: 'Soumission...',
    submitReview: 'Soumettre l\'Avis',
    noReviewsYet: 'Aucun avis pour le moment',
    beFirstToReview: 'Soyez le premier à donner votre avis sur ce produit !',
    verifiedPurchase: 'Achat Vérifié',
    completeYourOrder: 'Complétez Votre Commande',
    fullName: 'Nom Complet',
    enterYourFullName: 'Entrez votre nom complet',
    town: 'Ville',
    selectYourTown: 'Sélectionnez votre ville',
    location: 'Emplacement',
    enterYourLocation: 'Entrez votre emplacement',
    phoneNumber: 'Numéro de Téléphone',
    enterYourPhoneNumber: 'Entrez votre numéro de téléphone',
    completeOrder: 'Compléter la Commande',
    quantity: 'Quantité',
    buyNow: 'Acheter Maintenant',
    shareProduct: 'Partager le Produit',
    cancelReview: 'Annuler l\'Avis',
    reviewSubmitted: 'Avis Soumis',
    thankYouFeedback: 'Merci pour votre retour !',
    checkOutThisProduct: 'Découvrez ce {{title}} !',
    linkCopiedToClipboard: 'Lien copié dans le presse-papiers !',
    viewProduct: 'Voir le Produit',
    missingFullName: 'Nom complet manquant',
    orderSubmittedSuccessfully: 'Commande soumise avec succès !',
    orderReceivedMessage: 'Nous avons reçu votre commande et la traiterons sous peu.',
    failedToSubmitOrder: 'Échec de soumission de la commande',
    pleaseTryAgain: 'Veuillez réessayer.',
    yourCartIsEmpty: 'Votre panier est vide.',
    yourCart: 'Votre Panier',
    sizeLabel: 'Taille',
    remove: 'Supprimer',
    subtotal: 'Sous-total',
    shipping: 'Livraison',
    total: 'Total',
    proceedToCheckout: 'Procéder au paiement',
    selectTunisianTown: 'Sélectionner une ville tunisienne',
    submitOrder: 'Soumettre la commande',
    currency: 'DT',
    categoryNotFound: 'Catégorie Non Trouvée',
    categoryNotFoundDesc: 'La catégorie que vous cherchez n\'existe pas.',
    collectionNotFound: 'Collection Non Trouvée',
    backToCollections: 'Retour aux Collections',
    collectionPieces: 'Pièces de Collection',
    discoverCompleteCollection: 'Découvrez la collection complète {{title}}. Chaque pièce est soigneusement sélectionnée pour refléter notre vision pour {{season}} {{year}}.',
    filterProducts: 'Filtrer les Produits',
    allCategories: 'Toutes les Catégories',
    minPrice: 'Prix Min',
    maxPrice: 'Prix Max',
    clearFilters: 'Effacer les Filtres',
    noProductsInCollection: 'Aucun produit dans cette collection pour le moment.',
    casual: 'Décontracté',
    elegant: 'Élégant',
    bohemian: 'Bohème',
    minimalist: 'Minimaliste',
    streetwear: 'Streetwear',
    vintage: 'Vintage',
    romantic: 'Romantique',
    athletic: 'Sportif',
    professional: 'Professionnel',
    festive: 'Festif',
    layer_jacket: 'Superposez avec une veste légère pour un temps de transition',
    neutral_accessories: 'Associez avec des accessoires neutres pour garder le focus sur la tenue',
    belt_waist: 'Ajoutez une ceinture pour définir votre taille et améliorer la silhouette',
    comfortable_footwear: 'Complétez le look avec des chaussures confortables mais stylées',
    mix_patterns: 'Mélangez les motifs avec soin pour une déclaration audacieuse et avant-gardiste',
    day_night_transition: 'Choisissez des pièces qui peuvent passer du jour à la nuit sans effort',
    metallic_accents: 'Incorporez des accents métalliques pour une touche de glamour',
    breathable_fabrics: 'Optez pour des tissus respirants parfaits pour le port toute la journée',
    fitted_relaxed_balance: 'Équilibrez les pièces ajustées et décontractées pour un confort et un style optimaux',
    scarf_shawl: 'Ajoutez un foulard ou un châle pour une mise à niveau instantanée du style',
    spring: 'Printemps',
    summer: 'Été',
    fall: 'Automne',
    winter: 'Hiver',
    contactTitle: 'Contactez-nous',
    contactDescription: 'Entrez en contact avec nous. Nous sommes là pour vous aider avec toutes vos questions sur nos produits ou services.',
    getInTouch: 'Entrer en contact',
    sendMessage: 'Envoyez-nous un message',
    address: 'Adresse',
    phone: 'Téléphone',
    email: 'Email',
    businessHours: 'Heures d\'ouverture',
    contactName: 'Votre nom',
    contactEmail: 'Votre email',
    contactSubject: 'Sujet',
    contactMessage: 'Votre message',
    sendMessageBtn: 'Envoyer le message',
    messageSent: 'Message envoyé',
    messageSentDesc: 'Merci pour votre message. Nous vous répondrons bientôt !',
    enterContactName: 'Entrez votre nom complet',
    enterContactEmail: 'Entrez votre adresse email',
    enterContactSubject: 'Entrez le sujet',
    enterContactMessage: 'Dites-nous comment nous pouvons vous aider...',
    sizeGuide: 'Guide des tailles',
    sizeGuideDescription: 'Trouvez votre taille parfaite avec notre guide détaillé. Des mesures précises assurent la meilleure expérience d\'achat.',
    howToMeasure: 'Comment mesurer',
    measurementTips: 'Pour les mesures les plus précises, portez des vêtements près du corps et mesurez-vous devant un miroir.',
    chest: 'Poitrine',
    waist: 'Taille',
    hips: 'Hanches',
    inseam: 'Entrejambe',
    shoulder: 'Épaule',
    sleeve: 'Manche',
    tops: 'Hauts',
    bottoms: 'Bas',
    dresses: 'Robes',
    outerwear: 'Vêtements d\'extérieur',
    guideSize: 'Taille',
    xs: 'XS',
    s: 'S',
    m: 'M',
    l: 'L',
    xl: 'XL',
    xxl: 'XXL',
    measurements: 'Mesures',
    inches: 'pouces',
    cm: 'cm',
    sizeGuideHelp: 'Toujours incertain sur votre taille ? Contactez notre service client pour une assistance personnalisée.',
    contactUsBtn: 'Contactez-nous',
    faq: 'Questions Fréquemment Posées',
    faqDescription: 'Trouvez des réponses aux questions les plus courantes sur nos produits, la livraison et les services.',
    faqShipping: 'Combien de temps prend la livraison ?',
    faqShippingAnswer: 'La livraison standard en Tunisie prend 3-5 jours ouvrables. La livraison internationale prend 7-14 jours ouvrables selon la destination.',
    faqReturns: 'Quelle est votre politique de retour ?',
    faqReturnsAnswer: 'Nous offrons une politique de retour de 30 jours pour les articles non utilisés dans leur emballage d\'origine. Les retours sont gratuits en Tunisie.',
    faqPayment: 'Quels modes de paiement acceptez-vous ?',
    faqPaymentAnswer: 'Nous acceptons les cartes de crédit, les cartes de débit et le paiement à la livraison pour les commandes locales.',
    faqSize: 'Comment trouver ma taille correcte ?',
    faqSizeAnswer: 'Consultez notre guide des tailles détaillé avec des mesures en pouces et centimètres. Si vous n\'êtes toujours pas sûr, contactez notre service client pour une assistance personnalisée.',
    faqQuality: 'Quelle est la qualité de vos produits ?',
    faqQualityAnswer: 'Tous nos produits sont fabriqués avec des matériaux de haute qualité et subissent un contrôle de qualité strict. Nous défendons notre savoir-faire avec une garantie d\'un an.',
    faqCare: 'Comment prendre soin de mes vêtements Tama ?',
    faqCareAnswer: 'Suivez les instructions d\'entretien sur chaque étiquette de produit. La plupart des articles peuvent être lavés en machine sur cycle doux et suspendus pour sécher.',
    faqOrder: 'Comment puis-je suivre ma commande ?',
    faqOrderAnswer: 'Une fois votre commande expédiée, vous recevrez un numéro de suivi par email. Vous pouvez également vérifier le statut de votre commande en contactant notre service client.',
    faqContact: 'Comment contacter le service client ?',
    faqContactAnswer: 'Vous pouvez nous joindre via notre formulaire de contact, par téléphone ou par email. Nous sommes là pour aider du lundi au samedi.',
    navFaq: 'FAQ',
    chestInstruction: 'Mesurez autour de la partie la plus pleine de votre poitrine',
    waistInstruction: 'Mesurez autour de votre taille naturelle',
    hipsInstruction: 'Mesurez autour de la partie la plus pleine de vos hanches',
    inseamInstruction: 'Mesurez de l\'entrejambe à la cheville',
    stillHaveQuestions: 'Vous avez encore des questions ?',
    cantFindAnswer: 'Vous ne trouvez pas la réponse que vous cherchez ? Notre équipe de service client est là pour vous aider.',
    contactUs: 'Contactez-nous',
    adsTitle: 'Nos Publicités',
    adsDescription: 'Découvrez nos dernières offres promotionnelles et offres spéciales.',
    noAdsAvailable: 'Aucune publicité disponible pour le moment.',
    inactive: 'Inactif',
    from: 'À partir de',
    to: 'À',
    learnMore: 'En Savoir Plus',
    sliderView: 'Vue Curseur',
    gridView: 'Vue Grille',
    comingSoon: 'Bientôt Disponible',
    adCurrentlyInactive: 'Cette publicité n\'est actuellement pas active',
    checkBackSoon: 'Revenez bientôt pour des offres et promotions excitantes.',
    video: 'Vidéo',
    ad: 'publicité',
    ads: 'publicités',
    banner: 'Bannière',
    sidebar: 'Barre latérale',
    footer: 'Pied de page',
    popup: 'Popup',
    bannerAds: 'Publicités Bannière',
    sidebarAds: 'Publicités Barre Latérale',
    footerAds: 'Publicités Pied de Page',
    popupAds: 'Publicités Popup',
    bannerAd: 'Publicité Bannière',
    sidebarAd: 'Publicité Barre Latérale',
    footerAd: 'Publicité Pied de Page',
    popupAd: 'Publicité Popup',
    expired: 'Expiré',
    endsIn: 'Se termine dans',
    daysShort: 'J',
    hoursShort: 'H',
    minutesShort: 'M',
    secondsShort: 'S',
    fit_regular: 'Coupe: Régulière',
    fit_slim: 'Coupe: Slim',
    fit_loose: 'Coupe: Loose',
    fit_oversized: 'Coupe: Oversized',
    style_casual: 'Style: Décontracté',
    style_formal: 'Style: Formel',
    style_bohemian: 'Style: Bohème',
    style_minimalist: 'Style: Minimaliste',
    style_streetwear: 'Style: Streetwear',
    style_vintage: 'Style: Vintage',
    style_romantic: 'Style: Romantique',
    style_athletic: 'Style: Athlétique',
    style_professional: 'Style: Professionnel',
    style_festive: 'Style: Festif',
    neckline_vneck: 'Encolure: V',
    neckline_round: 'Encolure: Ronde',
    neckline_scoop: 'Encolure: Scoop',
    neckline_square: 'Encolure: Carrée',
    sleeve_short: 'Manche: Courte',
    sleeve_long: 'Manche: Longue',
    sleeve_sleeveless: 'Manche: Sans manche',
    sleeve_threequarter: 'Manche: 3/4',
    length_mini: 'Longueur: Mini',
    length_knee: 'Longueur: Au genou',
    length_midi: 'Longueur: Midi',
    length_maxi: 'Longueur: Maxi',
    length_cropped: 'Longueur: Cropped',
    pattern_solid: 'Motif: Uni',
    pattern_striped: 'Motif: Rayé',
    pattern_floral: 'Motif: Floral',
    pattern_polkadot: 'Motif: Pois',
    pattern_geometric: 'Motif: Géométrique',
    pattern_animal: 'Motif: Animal',
    occasion_everyday: 'Occasion: Quotidienne',
    occasion_work: 'Occasion: Travail',
    occasion_party: 'Occasion: Soirée',
    occasion_wedding: 'Occasion: Mariage',
    occasion_beach: 'Occasion: Plage',
    season_spring: 'Saison: Printemps',
    season_summer: 'Saison: Été',
    season_fall: 'Saison: Automne',
    season_winter: 'Saison: Hiver',
    closure_button: 'Fermeture: Bouton',
    closure_zipper: 'Fermeture: Fermeture éclair',
    closure_tie: 'Fermeture: Nœud',
    closure_elastic: 'Fermeture: Élastique',
    cotton: 'Coton',
    polyester: 'Polyester',
    silk: 'Soie',
    wool: 'Laine',
    linen: 'Lin',
    leather: 'Cuir',
    denim: 'Jean',
    chiffon: 'Chiffon',
    satin: 'Satin',
    velvet: 'Velours',
    lace: 'Dentelle',
    mesh: 'Maille',
    nylon: 'Nylon',
    spandex: 'Spandex',
    rayon: 'Rayonne',
    acrylic: 'Acrylique',
    machine_wash_cold: 'Lavage en machine à froid',
    hand_wash_only: 'Lavage à la main uniquement',
    do_not_wash: 'Ne pas laver',
    dry_clean_only: 'Nettoyage à sec uniquement',
    tumble_dry_low: 'Séchage en tambour à basse température',
    hang_dry: 'Sécher suspendu',
    do_not_tumble_dry: 'Ne pas sécher en tambour',
    iron_on_low_heat: 'Repasser à chaleur douce',
    do_not_iron: 'Ne pas repasser',
    do_not_bleach: 'Ne pas blanchir',
    bleach_when_needed: 'Blanchir si nécessaire',
    store_in_cool_dry_place: 'Conserver dans un endroit frais et sec',
    avoid_direct_sunlight: 'Éviter la lumière directe du soleil',
    professional_cleaning_recommended: 'Nettoyage professionnel recommandé',
    free_shipping_over_100: 'Livraison gratuite pour les commandes de plus de 100 DT. Livraison standard sous 3-5 jours ouvrables.',
    express_shipping_15: 'Livraison express disponible pour 15 DT. Livraison standard sous 3-5 jours ouvrables.',
    international_shipping: 'Livraison internationale disponible. Délai de livraison 7-14 jours ouvrables selon l\'emplacement.',
    local_pickup: 'Retrait en magasin disponible. Livraison gratuite pour les commandes de plus de 50 DT.',
    same_day_delivery_tunis: 'Livraison le jour même disponible à Tunis pour les commandes passées avant 14h.',
    premium_shipping_25: 'Livraison premium disponible pour 25 DT. Livraison garantie sous 2 jours ouvrables.',
    return_policy_30_days: 'Politique de retour de 30 jours. Les articles doivent être inutilisés et dans leur emballage d\'origine.',
    return_policy_14_days: 'Politique de retour de 14 jours. Les articles doivent être inutilisés et dans leur emballage d\'origine.',
    return_policy_7_days: 'Politique de retour de 7 jours. Les articles doivent être inutilisés et dans leur emballage d\'origine.',
    no_returns_on_sale: 'Pas de retours sur les articles en solde. Les articles soldés ne sont pas éligibles au retour.',
    free_returns_exchanges: 'Retours et échanges gratuits dans les 30 jours. Les articles doivent être inutilisés et dans leur emballage d\'origine.',
    store_credit_only: 'Crédit en magasin uniquement. Retours acceptés dans les 30 jours pour crédit en magasin uniquement. Les articles doivent être inutilisés et dans leur emballage d\'origine.',
    no_returns: 'Aucun retour accepté sur cet article. Toutes les ventes sont définitives.',
    shop: 'Boutique',
    support: 'Le soutien',
    explore: 'Explorer',
    totalItems: 'Articles totaux:',
    validItems: 'Valides:',
    redeemLoyaltyPoints: 'Échanger des points de fidélité',
    usePointsForDiscounts: 'Utilisez vos points pour des remises spéciales',
    pointsAvailable: 'points disponibles',
    redeem100Points: 'Échanger 100 points (10 DT de réduction)',
    redeem200Points: 'Échanger 200 points (25 DT de réduction)',
    addItemsToRedeem: 'Ajouter des articles au panier pour échanger des points',
    redeemed100Points: 'Échangé 100 points pour une réduction de 10 DT !',
    redeemed200Points: 'Échangé 200 points pour une réduction de 25 DT !',
    notEnoughPoints: 'Pas assez de points !'
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
    all: 'الكل',
    more: 'المزيد',
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
    recentlyViewed: 'المنتجات المُشاهدة مؤخراً',
    recentlyViewedDescription: 'منتجاتك المُشاهدة مؤخراً محفوظة هنا للوصول السهل',
    noRecentlyViewed: 'لا توجد منتجات مُشاهدة مؤخراً',
    startBrowsing: 'ابدأ في تصفح منتجاتنا لرؤيتها هنا',
    yourRecentlyViewed: 'منتجاتك المُشاهدة مؤخراً',
    discoverMoreProducts: 'اكتشف المزيد من المنتجات في مجموعتنا',
    loyaltyProgram: 'برنامج الولاء',
    loyaltyDescription: 'اكسب نقاطاً مع كل شراء وافتح مكافآت حصرية',
    howToEarnPoints: 'كيف تكسب النقاط',
    earnPointsPerDT: 'اكسب نقطة واحدة لكل دينار تونسي تنفقه',
    bonusPointsReviews: 'نقاط إضافية للمراجعات والإحالات',
    doublePointsPromotions: 'نقاط مضاعفة في العروض الخاصة',
    tierBenefits: 'مزايا المستويات',
    bronzeTier: 'برونزي',
    silverTier: 'فضي',
    goldTier: 'ذهبي',
    pointsRequired: '{{points}}+ نقطة',
    totalPoints: 'إجمالي النقاط',
    nextTier: 'المستوى التالي',
    recentActivity: 'النشاط الأخير',
    startEarningPoints: 'ابدأ التسوق لكسب نقاط الولاء!',
    pointsEarned: 'كسبت {{points}} نقطة ولاء!',
    keepShopping: 'استمر في التسوق لكسب المزيد من النقاط!',
    newMember: 'عضو جديد',
    points: 'نقاط',
    pointsPerDT: '+1 لكل دينار تونسي',
    pointsToGo: 'متبقي',
    liveSupport: 'دعم مباشر',
    online: 'متصل',
    typeMessage: 'اكتب رسالتك...',
    chatGreeting: 'مرحبا! كيف يمكنني مساعدتك في تسوقك اليوم؟',
    chatResponse: 'شكراً لرسالتك! سيرد فريق خدمة العملاء قريباً. في هذه الأثناء، لا تتردد في تصفح منتجاتنا.',
    openChat: 'فتح الدردشة',
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
    tamaStories: 'قصص تاما',
    lookbookNotFound: 'لم يتم العثور على قصة تاما',
    backToTamaStories: 'العودة إلى قصص تاما',
    theLook: 'المظهر',
    shopTheLook: 'تسوق المظهر',
    shopTheLookDescription: 'اكتشف القطع التي تكمل هذا المظهر. كل عنصر تم اختياره بعناية لإحياء الرؤية.',
    loveThisLook: 'أتحب هذا المظهر؟',
    shareWithFriends: 'شاركه مع أصدقائك ومتابعيك',
    saveForLater: 'حفظ لوقت لاحق',
    stylingTips: 'نصائح التصميم',
    discoverTamaStories: 'اكتشف قصص تاما المنظمة التي تبرز الإلهام والاتجاهات في الموضة.',
    tamaStory: 'قصة تاما',
    viewStory: 'عرض القصة →',
    noTamaStoriesAvailable: 'لا توجد قصص تاما متاحة',
    workingOnTamaStories: 'نحن نعمل على إنشاء قصص تاما رائعة. تحقق مرة أخرى قريباً أو تصفح منتجاتنا في الوقت الحالي.',
    discoverProductsInTamaStory: 'اكتشف المنتجات المميزة في قصة تاما هذه {{title}}.',
    noProductsInTamaStory: 'لا توجد منتجات في قصة تاما هذه',
    tamaStoryNoProductsYet: 'قصة تاما هذه لا تحتوي على أي منتجات بعد.',
    materials: 'المواد',
    careInstructions: 'تعليمات العناية',
    details: 'التفاصيل',
    shippingInformation: 'معلومات الشحن',
    freeShippingInfo: 'شحن مجاني للطلبات التي تزيد عن 100 دينار تونسي. التسليم القياسي خلال 3-5 أيام عمل.',
    returnsExchanges: 'الإرجاع والتبادل',
    returnPolicy: 'سياسة إرجاع لمدة 30 يوماً. يجب أن تكون العناصر غير مستخدمة وفي تغليفها الأصلي.',
    warranty: 'الضمان',
    warrantyInfo: 'ضمان لمدة عام واحد ضد عيوب التصنيع.',
    writeYourReview: 'اكتب مراجعتك',
    yourName: 'اسمك',
    enterYourName: 'أدخل اسمك',
    rating: 'التقييم',
    yourReview: 'مراجعتك',
    shareThoughts: 'شارك أفكارك حول هذا المنتج...',
    submitting: 'جارٍ الإرسال...',
    submitReview: 'إرسال المراجعة',
    noReviewsYet: 'لا توجد مراجعات بعد',
    beFirstToReview: 'كن أول من يراجع هذا المنتج!',
    verifiedPurchase: 'شراء موثق',
    completeYourOrder: 'أكمل طلبك',
    fullName: 'الاسم الكامل',
    enterYourFullName: 'أدخل اسمك الكامل',
    town: 'المدينة',
    selectYourTown: 'اختر مدينتك',
    location: 'الموقع',
    enterYourLocation: 'أدخل موقعك',
    phoneNumber: 'رقم الهاتف',
    enterYourPhoneNumber: 'أدخل رقم هاتفك',
    completeOrder: 'إتمام الطلب',
    quantity: 'الكمية',
    buyNow: 'اشترِ الآن',
    shareProduct: 'مشاركة المنتج',
    cancelReview: 'إلغاء المراجعة',
    reviewSubmitted: 'تم إرسال المراجعة',
    thankYouFeedback: 'شكراً لملاحظاتك!',
    checkOutThisProduct: 'تحقق من هذا {{title}}!',
    linkCopiedToClipboard: 'تم نسخ الرابط إلى الحافظة!',
    viewProduct: 'عرض المنتج',
    missingFullName: 'الاسم الكامل مفقود',
    orderSubmittedSuccessfully: 'تم تقديم الطلب بنجاح!',
    orderReceivedMessage: 'لقد تلقينا طلبك وسنقوم بمعالجته قريباً.',
    failedToSubmitOrder: 'فشل في تقديم الطلب',
    pleaseTryAgain: 'يرجى المحاولة مرة أخرى.',
    yourCartIsEmpty: 'سلتك فارغة.',
    yourCart: 'سلتك',
    sizeLabel: 'الحجم',
    remove: 'إزالة',
    subtotal: 'المجموع الفرعي',
    shipping: 'الشحن',
    total: 'المجموع',
    proceedToCheckout: 'المتابعة للدفع',
    selectTunisianTown: 'اختر مدينة تونسية',
    submitOrder: 'تقديم الطلب',
    currency: 'دينار تونسي',
    categoryNotFound: 'لم يتم العثور على الفئة',
    categoryNotFoundDesc: 'الفئة التي تبحث عنها غير موجودة.',
    collectionNotFound: 'لم يتم العثور على المجموعة',
    backToCollections: 'العودة إلى المجموعات',
    collectionPieces: 'قطع المجموعة',
    discoverCompleteCollection: 'اكتشف مجموعة {{title}} الكاملة. كل قطعة تم اختيارها بعناية لتعكس رؤيتنا لـ {{season}} {{year}}.',
    filterProducts: 'تصفية المنتجات',
    allCategories: 'جميع الفئات',
    minPrice: 'السعر الأدنى',
    maxPrice: 'السعر الأعلى',
    clearFilters: 'مسح المرشحات',
    noProductsInCollection: 'لا توجد منتجات في هذه المجموعة بعد.',
    casual: 'عارض',
    elegant: 'أنيق',
    bohemian: 'بوهيمي',
    minimalist: 'بسيط',
    streetwear: 'شارعي',
    vintage: 'عتيق',
    romantic: 'رومانسي',
    athletic: 'رياضي',
    professional: 'مهني',
    festive: 'احتفالي',
    layer_jacket: 'طبق مع جاكيت خفيف للطقس الانتقالي',
    neutral_accessories: 'اقرن مع إكسسوارات محايدة للحفاظ على التركيز على الإطلالة',
    belt_waist: 'أضف حزاماً لتحديد خصرك وتعزيز الخطوط العريضة',
    comfortable_footwear: 'أكمل الإطلالة بأحذية مريحة وأنيقة',
    mix_patterns: 'اخلط الأنماط بعناية لبيان جريء ومتقدم في الموضة',
    day_night_transition: 'اختر قطع يمكن أن تنتقل من النهار إلى الليل بسهولة',
    metallic_accents: 'أدرج لمسات معدنية لقدحة من البريق',
    breathable_fabrics: 'اختر أقمشة قابلة للتنفس مثالية للارتداء طوال اليوم',
    fitted_relaxed_balance: 'وازن بين القطع الضيقة والمريحة للراحة والأناقة المثالية',
    scarf_shawl: 'أضف وشاحاً أو شالاً لترقية فورية للأسلوب',
    spring: 'ربيع',
    summer: 'صيف',
    fall: 'خريف',
    winter: 'شتاء',
    contactTitle: 'اتصل بنا',
    contactDescription: 'تواصل معنا. نحن هنا لمساعدتك في أي أسئلة حول منتجاتنا أو خدماتنا.',
    getInTouch: 'تواصل معنا',
    sendMessage: 'أرسل لنا رسالة',
    address: 'العنوان',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    businessHours: 'ساعات العمل',
    contactName: 'اسمك',
    contactEmail: 'بريدك الإلكتروني',
    contactSubject: 'الموضوع',
    contactMessage: 'رسالتك',
    sendMessageBtn: 'إرسال الرسالة',
    messageSent: 'تم إرسال الرسالة',
    messageSentDesc: 'شكراً لرسالتك. سنعود إليك قريباً!',
    enterContactName: 'أدخل اسمك الكامل',
    enterContactEmail: 'أدخل عنوان بريدك الإلكتروني',
    enterContactSubject: 'أدخل الموضوع',
    enterContactMessage: 'أخبرنا كيف يمكننا مساعدتك...',
    sizeGuide: 'دليل المقاسات',
    sizeGuideDescription: 'اعثر على مقاسك المثالي مع دليلنا التفصيلي. القياسات الدقيقة تضمن أفضل تجربة تسوق.',
    howToMeasure: 'كيفية القياس',
    measurementTips: 'للحصول على أدق القياسات، ارتدِ ملابس ضيقة وقيس نفسك أمام المرآة.',
    chest: 'الصدر',
    waist: 'الخصر',
    hips: 'الوركين',
    inseam: 'الطول الداخلي',
    shoulder: 'الكتف',
    sleeve: 'الكم',
    tops: 'الملابس العلوية',
    bottoms: 'الملابس السفلية',
    dresses: 'الفساتين',
    outerwear: 'الملابس الخارجية',
    guideSize: 'المقاس',
    xs: 'XS',
    s: 'S',
    m: 'M',
    l: 'L',
    xl: 'XL',
    xxl: 'XXL',
    measurements: 'القياسات',
    inches: 'بوصة',
    cm: 'سم',
    sizeGuideHelp: 'لا تزال غير متأكد من مقاسك؟ اتصل بخدمة العملاء للحصول على مساعدة شخصية.',
    contactUsBtn: 'اتصل بنا',
    faq: 'الأسئلة الشائعة',
    faqDescription: 'اعثر على إجابات للأسئلة الأكثر شيوعاً حول منتجاتنا والشحن والخدمات.',
    faqShipping: 'كم يستغرق الشحن؟',
    faqShippingAnswer: 'الشحن القياسي داخل تونس يستغرق 3-5 أيام عمل. الشحن الدولي يستغرق 7-14 يوم عمل حسب الوجهة.',
    faqReturns: 'ما هي سياسة الإرجاع الخاصة بك؟',
    faqReturnsAnswer: 'نحن نقدم سياسة إرجاع لمدة 30 يوماً للعناصر غير المستخدمة في تغليفها الأصلي. الإرجاعات مجانية داخل تونس.',
    faqPayment: 'ما هي طرق الدفع التي تقبلها؟',
    faqPaymentAnswer: 'نحن نقبل بطاقات الائتمان وبطاقات الخصم والدفع عند التسليم للطلبات المحلية.',
    faqSize: 'كيف أجد مقاسي الصحيح؟',
    faqSizeAnswer: 'تحقق من دليل المقاسات التفصيلي الخاص بنا مع القياسات بالبوصات والسنتيمترات. إذا كنت لا تزال غير متأكد، اتصل بخدمة العملاء للحصول على مساعدة شخصية.',
    faqQuality: 'ما هي جودة منتجاتك؟',
    faqQualityAnswer: 'جميع منتجاتنا مصنوعة من مواد عالية الجودة وتخضع لمراقبة جودة صارمة. نحن نقف وراء حرفيتنا بضمان لمدة عام واحد.',
    faqCare: 'كيف يجب أن أعتني بملابسي تاما؟',
    faqCareAnswer: 'اتبع تعليمات العناية على كل ملصق منتج. معظم العناصر يمكن غسلها في الغسالة على دورة لطيفة وتعليقها لتجف.',
    faqOrder: 'كيف يمكنني تتبع طلبي؟',
    faqOrderAnswer: 'بمجرد شحن طلبك، ستتلقى رقم تتبع عبر البريد الإلكتروني. يمكنك أيضاً التحقق من حالة طلبك عن طريق الاتصال بخدمة العملاء.',
    faqContact: 'كيف يمكنني الاتصال بخدمة العملاء؟',
    faqContactAnswer: 'يمكنك الوصول إلينا من خلال نموذج الاتصال الخاص بنا، أو الهاتف، أو البريد الإلكتروني. نحن هنا للمساعدة من الاثنين إلى السبت.',
    navFaq: 'الأسئلة الشائعة',
    chestInstruction: 'قيس حول الجزء الأكثر امتلاءً من صدرك',
    waistInstruction: 'قيس حول خصرك الطبيعي',
    hipsInstruction: 'قيس حول الجزء الأكثر امتلاءً من وركيك',
    inseamInstruction: 'قيس من المنطقة بين الساقين إلى الكاحل',
    stillHaveQuestions: 'لديك أسئلة أخرى؟',
    cantFindAnswer: 'لا تجد الإجابة التي تبحث عنها؟ فريق خدمة العملاء لدينا هنا للمساعدة.',
    contactUs: 'اتصل بنا',
    adsTitle: 'إعلاناتنا',
    adsDescription: 'اكتشف أحدث عروضنا الترويجية والصفقات الخاصة.',
    noAdsAvailable: 'لا توجد إعلانات متاحة في الوقت الحالي.',
    inactive: 'غير نشط',
    from: 'من',
    to: 'إلى',
    learnMore: 'اعرف المزيد',
    sliderView: 'عرض المنزلق',
    gridView: 'عرض الشبكة',
    comingSoon: 'قريباً',
    adCurrentlyInactive: 'هذا الإعلان غير نشط حالياً',
    checkBackSoon: 'تحقق مرة أخرى قريباً للحصول على عروض وترقيات مثيرة.',
    video: 'فيديو',
    ad: 'إعلان',
    ads: 'إعلانات',
    banner: 'بانر',
    sidebar: 'الشريط الجانبي',
    footer: 'التذييل',
    popup: 'منبثق',
    bannerAds: 'إعلانات البانر',
    sidebarAds: 'إعلانات الشريط الجانبي',
    footerAds: 'إعلانات التذييل',
    popupAds: 'إعلانات المنبثقة',
    bannerAd: 'إعلان بانر',
    sidebarAd: 'إعلان شريط جانبي',
    footerAd: 'إعلان تذييل',
    popupAd: 'إعلان منبثق',
    expired: 'انتهت',
    endsIn: 'تنتهي في',
    daysShort: 'ي',
    hoursShort: 'س',
    minutesShort: 'د',
    secondsShort: 'ث',
    fit_regular: 'القصة: عادية',
    fit_slim: 'القصة: ضيقة',
    fit_loose: 'القصة: واسعة',
    fit_oversized: 'القصة: كبيرة جداً',
    style_casual: 'الأسلوب: عارض',
    style_formal: 'الأسلوب: رسمي',
    style_bohemian: 'الأسلوب: بوهيمي',
    style_minimalist: 'الأسلوب: بسيط',
    style_streetwear: 'الأسلوب: شارعي',
    style_vintage: 'الأسلوب: عتيق',
    style_romantic: 'الأسلوب: رومانسي',
    style_athletic: 'الأسلوب: رياضي',
    style_professional: 'الأسلوب: مهني',
    style_festive: 'الأسلوب: احتفالي',
    neckline_vneck: 'الياقة: V',
    neckline_round: 'الياقة: دائرية',
    neckline_scoop: 'الياقة: منحنية',
    neckline_square: 'الياقة: مربعة',
    sleeve_short: 'الكم: قصير',
    sleeve_long: 'الكم: طويل',
    sleeve_sleeveless: 'الكم: بدون أكمام',
    sleeve_threequarter: 'الكم: ثلاثة أرباع',
    length_mini: 'الطول: قصير جداً',
    length_knee: 'الطول: حتى الركبة',
    length_midi: 'الطول: متوسط',
    length_maxi: 'الطول: طويل جداً',
    length_cropped: 'الطول: مقصوص',
    pattern_solid: 'النمط: أحادي اللون',
    pattern_striped: 'النمط: مخطط',
    pattern_floral: 'النمط: زهري',
    pattern_polkadot: 'النمط: منقط',
    pattern_geometric: 'النمط: هندسي',
    pattern_animal: 'النمط: حيواني',
    occasion_everyday: 'المناسبة: يومية',
    occasion_work: 'المناسبة: عمل',
    occasion_party: 'المناسبة: حفلة',
    occasion_wedding: 'المناسبة: زفاف',
    occasion_beach: 'المناسبة: شاطئ',
    season_spring: 'الموسم: ربيع',
    season_summer: 'الموسم: صيف',
    season_fall: 'الموسم: خريف',
    season_winter: 'الموسم: شتاء',
    closure_button: 'الإغلاق: زر',
    closure_zipper: 'الإغلاق: سحاب',
    closure_tie: 'الإغلاق: ربطة',
    closure_elastic: 'الإغلاق: مرن',
    cotton: 'قطن',
    polyester: 'بوليستر',
    silk: 'حرير',
    wool: 'صوف',
    linen: 'كتان',
    leather: 'جلد',
    denim: 'جينز',
    chiffon: 'شيفون',
    satin: 'ساتان',
    velvet: 'مخمل',
    lace: 'دانتيل',
    mesh: 'شبكة',
    nylon: 'نايلون',
    spandex: 'سباندكس',
    rayon: 'رايون',
    acrylic: 'أكريليك',
    machine_wash_cold: 'غسل في الغسالة بماء بارد',
    hand_wash_only: 'غسل باليد فقط',
    do_not_wash: 'لا تغسل',
    dry_clean_only: 'تنظيف جاف فقط',
    tumble_dry_low: 'تجفيف في المجفف بدرجة حرارة منخفضة',
    hang_dry: 'تجفيف معلق',
    do_not_tumble_dry: 'لا تجفف في المجفف',
    iron_on_low_heat: 'كي بدرجة حرارة منخفضة',
    do_not_iron: 'لا تكوي',
    do_not_bleach: 'لا تبيض',
    bleach_when_needed: 'بياض عند الحاجة',
    store_in_cool_dry_place: 'احفظ في مكان بارد وجاف',
    avoid_direct_sunlight: 'تجنب أشعة الشمس المباشرة',
    professional_cleaning_recommended: 'يُنصح بتنظيف احترافي',
    free_shipping_over_100: 'شحن مجاني للطلبات التي تزيد عن 100 دينار تونسي. التسليم القياسي خلال 3-5 أيام عمل.',
    express_shipping_15: 'شحن سريع متاح مقابل 15 دينار تونسي. التسليم القياسي خلال 3-5 أيام عمل.',
    international_shipping: 'شحن دولي متاح. وقت التسليم 7-14 يوم عمل حسب الموقع.',
    local_pickup: 'الاستلام المحلي متاح في متجرنا. شحن مجاني للطلبات التي تزيد عن 50 دينار تونسي.',
    same_day_delivery_tunis: 'تسليم في نفس اليوم متاح في تونس للطلبات المقدمة قبل الساعة 2 مساءً.',
    premium_shipping_25: 'شحن مميز متاح مقابل 25 دينار تونسي. تسليم مضمون خلال يومي عمل.',
    return_policy_30_days: 'سياسة إرجاع لمدة 30 يوماً. يجب أن تكون العناصر غير مستخدمة وفي تغليفها الأصلي.',
    return_policy_14_days: 'سياسة إرجاع لمدة 14 يوماً. يجب أن تكون العناصر غير مستخدمة وفي تغليفها الأصلي.',
    return_policy_7_days: 'سياسة إرجاع لمدة 7 أيام. يجب أن تكون العناصر غير مستخدمة وفي تغليفها الأصلي.',
    no_returns_on_sale: 'لا توجد إرجاعات على العناصر المخفضة. العناصر المخفضة غير مؤهلة للإرجاع.',
    free_returns_exchanges: 'إرجاعات وتبادلات مجانية خلال 30 يوماً. يجب أن تكون العناصر غير مستخدمة وفي تغليفها الأصلي.',
    store_credit_only: 'رصيد المتجر فقط. يتم قبول الإرجاعات خلال 30 يوماً لرصيد المتجر فقط. يجب أن تكون العناصر غير مستخدمة وفي تغليفها الأصلي.',
    no_returns: 'لا توجد إرجاعات مقبولة على هذا العنصر. جميع المبيعات نهائية.',
    shop: 'متجر',
    support: 'الدعم',
    explore: 'يستكشف',
    totalItems: 'إجمالي العناصر:',
    validItems: 'صالح:',
    redeemLoyaltyPoints: 'استبدال نقاط الولاء',
    usePointsForDiscounts: 'استخدم نقاطك للحصول على خصومات خاصة',
    pointsAvailable: 'نقاط متاحة',
    redeem100Points: 'استبدال 100 نقطة (خصم 10 دينار تونسي)',
    redeem200Points: 'استبدال 200 نقطة (خصم 25 دينار تونسي)',
    addItemsToRedeem: 'أضف عناصر إلى السلة لاستبدال النقاط',
    redeemed100Points: 'تم استبدال 100 نقطة بخصم 10 دينار تونسي!',
    redeemed200Points: 'تم استبدال 200 نقطة بخصم 25 دينار تونسي!',
    notEnoughPoints: 'لا توجد نقاط كافية!'


  },
};