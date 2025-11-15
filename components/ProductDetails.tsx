"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlaySquare, Star, Heart, Truck, Shield, RotateCcw, ChevronRight, Minus, Plus, ZoomIn, Home, X } from "lucide-react";
import { Button } from "./ui/button";
import { client } from "@/sanity/lib/client";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart";
import { getProductReviews, getRelatedProducts } from "@/lib/useQuery";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";
import { ProductDetailsSkeleton } from "./ui/skeleton";
import { Product, Review } from "@/lib/types";

const tunisianTowns = [
  "Tunis",
  "Ariana",
  "Ben Arous",
  "Manouba",
  "Nabeul",
  "Zaghouan",
  "Bizerte",
  "Béja",
  "Jendouba",
  "Kef",
  "Siliana",
  "Kairouan",
  "Kasserine",
  "Sidi Bouzid",
  "Sousse",
  "Monastir",
  "Mahdia",
  "Sfax",
  "Gabès",
  "Medenine",
  "Tataouine",
  "Gafsa",
  "Tozeur",
  "Kebili",
];

export function ProductDetails({ product }: { product: Product }) {
  const [selectedMedia, setSelectedMedia] = useState(
    product.gallery?.[0] || null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showShopForm, setShowShopForm] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [town, setTown] = useState("");
  const { addToCart } = useCartStore();

  useEffect(() => {
    const loadAdditionalData = async () => {
      try {
        const [reviewsData, relatedData] = await Promise.all([
          getProductReviews(product._id),
          product.category?._id ? getRelatedProducts(product.category._id, product._id) : Promise.resolve([])
        ]);
        setReviews(reviewsData);
        setRelatedProducts(relatedData);
      } catch (error) {
        console.error("Error loading additional data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAdditionalData();
  }, [product._id, product.category?._id]);

  const getVideoUrl = (media: Product['gallery'][0]) => {
    if (!media?.asset?._ref) return null;
    const ref = media.asset._ref;
    const hash = ref.replace("file-", "").replace("-mp4", "");
    return `${process.env.NEXT_PUBLIC_SANITY_ASSET_URL}/${hash}.mp4`;
  };

  const videoUrl = getVideoUrl(selectedMedia);

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // prevent double submission

    if (!product) return;

    // Validate all required fields
    if (!fullName.trim()) {
      toast("Missing Full Name", {
        description: "Please enter your full name.",
      });
      return;
    }
    if (!town) {
      toast("Missing Town", { description: "Please select your town." });
      return;
    }
    if (!location.trim()) {
      toast("Missing Location", { description: "Please enter your location." });
      return;
    }
    if (!phone.trim()) {
      toast("Missing Phone Number", {
        description: "Please enter your phone number.",
      });
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast("Missing Color", { description: "Please select a color." });
      return;
    }
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast("Missing Size", { description: "Please select a size." });
      return;
    }

    setIsSubmitting(true); // start submission

    try {
      await client.create({
        _type: "order",
        fullName,
        town,
        location,
        phone,
        items: [
          {
            _key: crypto.randomUUID(), // unique key for Sanity array
            product: { _type: "reference", _ref: product._id }, // reference to the product
            quantity: 1, // or allow user to select quantity if needed
            selectedColor,
            selectedSize,
            price: product.price,
            subtotal: product.price,
            shippingFee: 7,
            total: product.price + 7,
            status: "pending",
            createdAt: new Date().toISOString(),
          },
        ],
        subtotal: product.price,
        shippingFee: 7, // or calculate dynamically
        total: product.price + 7,
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      toast("Order submitted successfully!", {
        description: "We have received your order and will process it shortly.",
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
      const newOrder = {
        fullName,
        town,
        location,
        phone,
        product,
        selectedColor,
        subtotal: product.price * quantity,
        shippingFee: 50,
        total: product.price * quantity + 50,
        selectedSize,
        status: "pending",
      };

      // Send email to admin
      await fetch("/api/send-order-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      // Reset form
      setFullName("");
      setLocation("");
      setPhone("");
      setTown("");
      setSelectedColor(null);
      setSelectedSize(null);
      setShowShopForm(false);
    } catch (err) {
      console.error("Order submission failed:", err);
      toast("Failed to submit order", {
        description: "Please try again.",
      });
    } finally {
      setIsSubmitting(false); // allow future submissions
    }
  };

  const handleAdd = () => {
    if (!selectedColor || !selectedSize) return; // prevent adding without both

    addToCart({
      _id: product._id,
      title: product.title,
      slug:
        typeof product.slug === "string" ? product.slug : product.slug?.current,
      price: product.price,
      gallery: product.gallery,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      inStock: product.inStock,
    });

    toast.success("Added to cart!", {
      description: `${quantity} ${product.title} added to your cart.`,
    });
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(`Check out this ${product.title}!`);

    let shareLink = '';
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing, so we'll copy to clipboard
        navigator.clipboard.writeText(`${text} ${shareUrl}`);
        toast.success("Link copied to clipboard!");
        return;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <div className=" border-b border-gray-300 dark:border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="flex items-center hover:text-fashion-dark transition-colors duration-200 p-1 rounded">
              <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            {product.category && (
              <>
                <Link
                  href={`/collection/${product.category.slug?.current}`}
                  className="hover:text-fashion-dark transition-colors duration-200 p-1 rounded truncate max-w-[120px] sm:max-w-none"
                >
                  {product.category.title}
                </Link>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 " />
              </>
            )}
            <span className="text-fashion-dark font-medium truncate">{product.title}</span>
          </nav>
        </div>
      </div>

      <section className="max-w-7xl mx-auto py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Enhanced Image Gallery */}
          <div className="space-y-4">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl bg-card">
              {selectedMedia?._type === "image" ? (
                <div className="relative w-full h-full group cursor-zoom-in" onClick={() => setIsZoomed(true)}>
                  <Image
                    src={selectedMedia.asset.url}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </div>
                </div>
              ) : videoUrl ? (
                <video
                  src={videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : null}
            </div>

            {/* Zoom Modal */}
            {isZoomed && selectedMedia?._type === "image" && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4" onClick={() => setIsZoomed(false)}>
                <div className="relative max-w-4xl max-h-full">
                  <Image
                    src={selectedMedia.asset.url}
                    alt={product.title}
                    width={800}
                    height={800}
                    className="object-contain max-h-full max-w-full "
                  />
                  <button
                    onClick={() => setIsZoomed(false)}
                    className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-0.5 py-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X size={20}/>
                  </button>
                </div>
              </div>
            )}

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2 m-5">
              {product.gallery?.map((media, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedMedia(media)}
                  className={`relative  w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedMedia?._key === media._key
                      ? "border-gray-900 dark:border-white scale-90 shadow-lg"
                      : "border-gray-200 dark:border-gray-600 scale-90 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                >
                  {media._type === "image" ? (
                    <Image
                      src={media.asset.url}
                      alt={product.title}
                      fill
                      className="object-cover rounded-xl"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-700">
                      <PlaySquare className="w-6 h-6 text-gray-500 dark:text-gray-400 rounded-2xl" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="lg:text-xl text-lg font-bold text-gray-900 dark:text-white mb-2">{product.title}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                        ({reviews.length} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{product.description}</p>

              <div className="flex items-center justify-between mb-6">
                <p className="lg:text-xl text-lg font-bold text-gray-900 dark:text-white">{product.price} DT</p>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`font-medium ${product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Color</p>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color, i: number) => {
                      const colorHex = typeof color === 'string' ? color : (color.hex || color.value || '');
                      const colorName = typeof color === 'string' ? color : (color.name || colorHex);
                      return (
                        <button
                          key={i}
                          style={{ backgroundColor: colorHex }}
                          onClick={() => setSelectedColor(colorHex)}
                          className={`w-6 h-6 rounded-full border shadow-sm transition-all duration-300 ${
                            selectedColor === colorHex
                              ? "border-black dark:border-white scale-110 ring-1 ring-black dark:ring-white ring-opacity-20"
                              : "border-gray-300 hover:scale-105"
                          }`}
                          title={colorName}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Size</p>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-2 border-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                          selectedSize === size
                            ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white scale-105"
                            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Quantity</p>
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      onClick={decreaseQuantity}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-4">
                <Button
                  disabled={!product.inStock || !selectedColor || !selectedSize}
                  className="flex-1 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black py-3 rounded-lg font-semibold text-base"
                  onClick={handleAdd}
                >
                  Add to Cart
                </Button>
                <Button
                  className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-3 rounded-lg font-semibold text-base"
                  onClick={() => setShowShopForm((prev) => !prev)}
                  disabled={!product.inStock}
                >
                  {showShopForm ? "Cancel" : "Buy Now"}
                </Button>
              </div>

              {/* Social Sharing */}
              <div className="border-t border-gray-300 dark:border-gray-600 pt-6">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Share this product</p>
                <div className="flex space-x-6">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <FiFacebook className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <FiTwitter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('instagram')}
                    className="text-gray-600 dark:text-gray-400 hover:text-pink-600 transition-colors"
                  >
                    <FiInstagram className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-700 transition-colors"
                  >
                    <FiLinkedin className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="space-y-4">
                {/* Materials */}
                {product.materials && product.materials.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Materials</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                      {product.materials.map((material: string, i: number) => (
                        <li key={i}>{material}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Care Instructions */}
                {product.careInstructions && product.careInstructions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Care Instructions</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                      {product.careInstructions.map((instruction: string, i: number) => (
                        <li key={i}>{instruction}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Product Details */}
                {product.productDetails && product.productDetails.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Details</h3>
                    <div className="space-y-2">
                      {product.productDetails.map((detail, i: number) => (
                        <div key={i} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                          <span className="font-medium text-gray-700 dark:text-gray-300">{detail.label}</span>
                          <span className="text-gray-600 dark:text-gray-400">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shipping & Returns */}
                <div className="  space-y-4">
                  <div className="flex items-start space-x-3">
                    <Truck className="w-4 h-4 text-gray-600 dark:text-gray-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Shipping Information</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                        {product.shippingInfo || "Free shipping on orders over 100 DT. Standard delivery within 3-5 business days."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <RotateCcw className="w-4 h-4 text-gray-600 dark:text-gray-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Returns & Exchanges</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                        {product.returnPolicy || "30-day return policy. Items must be unused and in original packaging."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-4 h-4 text-gray-600 dark:text-gray-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Warranty</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                        1-year warranty against manufacturing defects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-card rounded-2xl p-4 md:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="lg:text-xl text-sm font-bold text-gray-900 dark:text-white">Customer Reviews</h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-900 dark:text-white">{averageRating.toFixed(1)}</span>
              <span className="text-gray-600 dark:text-gray-400 text-xs">({reviews.length} reviews)</span>
            </div>
          </div>

          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review, i) => (
                <div key={i} className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                          {review.customerName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{review.customerName}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, j) => (
                              <Star
                                key={j}
                                className={`w-4 h-4 ${j < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          {review.verifiedPurchase && (
                            <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(review.reviewDate).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{review.reviewText}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Star className="w-10 h-10 lg:w-14 lg:h-14 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 lg:text-lg text-sm">No reviews yet</p>
              <p className="text-gray-500 dark:text-gray-500 lg:text-lg text-sm">Be the first to review this product!</p>
            </div>
          )}
        </div>

        {/* Shop Form Modal */}
        {showShopForm && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Complete Your Order</h3>
                <button
                  onClick={() => setShowShopForm(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-700 text-black dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Town</label>
                  <select
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-700 text-black dark:text-white"
                    required
                  >
                    <option value="">Select your town</option>
                    {tunisianTowns.map((t, i) => (
                      <option key={i} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-700 text-black dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-700 text-black dark:text-white"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black py-4 rounded-lg font-semibold text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Complete Order"}
                </Button>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
