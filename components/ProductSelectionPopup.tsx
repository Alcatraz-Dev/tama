"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Tag } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { CartItem } from "@/store/cart";
import { useTranslation } from "@/lib/translationContext";
import { Product } from "@/lib/types";

interface ProductSelectionPopupProps {
  isOpen: boolean;
  discountPercentage: number;
  onClose: () => void;
  onComplete: () => void;
}

export default function ProductSelectionPopup({
  isOpen,
  discountPercentage,
  onClose,
  onComplete
}: ProductSelectionPopupProps) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCartStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Fetch products from your API or Sanity
      const response = await fetch('/api/products?limit=20');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      // Fallback to empty array
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleProductSelection = (product: Product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.some(p => p._id === product._id);
      if (isSelected) {
        return prev.filter(p => p._id !== product._id);
      } else if (prev.length < 3) { // Limit to 3 products
        return [...prev, product];
      }
      return prev;
    });
  };

  const applyDiscountAndAddToCart = () => {
    selectedProducts.forEach(product => {
      const discountedPrice = Math.round((product.price * (1 - discountPercentage / 100)) * 100) / 100; // Round to 2 decimal places

      const cartItem: CartItem = {
        _id: product._id,
        title: product.title,
        slug: typeof product.slug === 'string' ? product.slug : product.slug?.current || '',
        price: discountedPrice, // Apply discount
        gallery: product.gallery,
        quantity: 1,
        inStock: product.inStock || true,
      };

      addToCart(cartItem);
    });

    onComplete();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="relative w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto bg-gradient-to-br from-white/95 via-white/90 to-white/95 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Animated border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-20 animate-pulse"></div>
          <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/95 via-white/90 to-white/95 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-900/95"></div>

          <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {t('selectProducts')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-1">
                  {t('chooseUpTo3Products')} <span className="font-semibold text-orange-500">{discountPercentage}% {t('discount')}</span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 transition-all hover:scale-110 shadow-lg ml-4"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[50vh] sm:max-h-[60vh]">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-purple-500 border-t-transparent rounded-full"
                  ></motion.div>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Tag className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                  </motion.div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                    {t('noProductsAvailable')}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {products.map((product) => {
                    const isSelected = selectedProducts.some(p => p._id === product._id);
                    const firstImage = product.gallery?.[0]?.asset?.url;

                    return (
                      <motion.div
                        key={product._id}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative border-2 rounded-xl p-3 sm:p-4 cursor-pointer transition-all duration-300 ${
                          isSelected
                            ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 shadow-lg shadow-purple-500/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md'
                        }`}
                        onClick={() => toggleProductSelection(product)}
                      >
                        {/* Selection indicator */}
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                          >
                            <span className="text-white text-sm font-bold">✓</span>
                          </motion.div>
                        )}

                        {/* Product image */}
                        <div className="aspect-square relative mb-3 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 shadow-inner">
                          {firstImage ? (
                            <Image
                              src={firstImage}
                              alt={product.title}
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Tag className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* Product info */}
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-2 line-clamp-2 leading-tight">
                          {product.title}
                        </h3>

                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                              {product.price} {t('currency') || 'DT'}
                            </span>
                            <span className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-semibold bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded-full">
                              -{discountPercentage}%
                            </span>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium">{t('discounted')}</span> {(product.price * (1 - discountPercentage / 100)).toFixed(2)} {t('currency') || 'DT'}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/80 to-white/80 dark:from-gray-800/50 dark:to-gray-900/50">
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
                <span className="inline-flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${selectedProducts.length > 0 ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  {selectedProducts.length} {t('productsSelected')}
                </span>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-700/80 rounded-xl transition-all duration-200 font-medium border border-gray-200 dark:border-gray-600"
                >
                  {t('cancel')}
                </motion.button>

                <motion.button
                  whileHover={{ scale: selectedProducts.length > 0 ? 1.02 : 1 }}
                  whileTap={{ scale: selectedProducts.length > 0 ? 0.98 : 1 }}
                  onClick={applyDiscountAndAddToCart}
                  disabled={selectedProducts.length === 0}
                  className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-200 font-semibold flex items-center justify-center gap-2 ${
                    selectedProducts.length > 0
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('applyDiscount')}</span>
                  <span className="sm:hidden">{t('apply')}</span>
                  {selectedProducts.length > 0 && (
                    <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-bold">
                      {selectedProducts.length}
                    </span>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}