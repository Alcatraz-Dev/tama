export interface Product {
  _id: string;
  title: string;
  title_fr?: string;
  title_ar?: string;
  slug: {
    current: string;
  };
  description: string;
  description_fr?: string;
  description_ar?: string;
  price: number;
  originalPrice?: number;
  gallery: Array<{
    _key?: string;
    _type: string;
    asset: {
      url: string;
      _ref?: string;
    };
  }>;
  colors?: Array<string | {
    name?: string;
    hex?: string;
    value?: string;
  }>;
  sizes?: string[];
  materials?: string[];
  careInstructions?: string[];
  productDetails?: Array<{
    label: string;
    value: string;
  }>;
  category?: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  };
  collection?: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  };
  inStock: boolean;
  shippingInfo?: string;
  returnPolicy?: string;
  subcategory?: {
    _id: string;
    title: string;
  };
  onSale?: boolean;
  _createdAt?: string;
  popularity?: string;
  reviews?: {
    count: number;
    averageRating: number;
  };
}

export interface Review {
  _id: string;
  customerName: string;
  reviewText: string;
  rating: number;
  reviewDate: string;
  verifiedPurchase?: boolean;
}

export interface HeroCard {
  _id: string;
  type: "text" | "image";
  title?: string;
  title_fr?: string;
  title_ar?: string;
  subtitle?: string;
  subtitle_fr?: string;
  subtitle_ar?: string;
  buttonText?: string;
  buttonText_fr?: string;
  buttonText_ar?: string;
  buttonLink?: string;
  withButton?: boolean;
  withIcon?: boolean;
  icon?: React.ReactNode;
  image?: string;
  variant?: "large" | "small";
  order?: number;
}

export interface SocialLink {
  _id: string;
  name: string;
  url: string;
  icon: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  imageUrl?: string;
  productCount: number;
}

export interface Collection {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  imageUrl?: string;
  products?: Product[];
  season?: string;
  year?: number;
  theme?: string;
  stylingTips?: string;
}

export interface Lookbook {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: {
    asset: {
      url: string;
    };
  };
  images?: Array<{
    _key?: string;
    _type: string;
    asset: {
      url: string;
    };
  }>;
  products?: Product[];
  season?: string;
  year?: string;
  theme?: string;
  stylingTips?: string;
}

export interface OrderItem {
  _key: string;
  product: {
    _type: "reference";
    _ref: string;
  };
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  price: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  status: string;
  createdAt: string;
}

export interface Order {
  _type: "order";
  fullName: string;
  town: string;
  location: string;
  phone: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: string;
  createdAt: string;
}

export interface GalleryItem {
  _key?: string;
  _type: string;
  asset: {
    url: string;
    _ref?: string;
  };
}

export interface CartItem {
  _id: string;
  title: string;
  slug: string;
  price: number;
  gallery: GalleryItem[];
  color?: string;
  size?: string;
  quantity: number;
  inStock: boolean;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  subcategory: string;
  colors: string[];
  sizes: string[];
  materials: string[];
  priceRange: [number, number];
  sortBy: string;
  newArrivals: boolean;
  onSale: boolean;
}