"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Check, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useCartStore } from "@/store/cart";
import { Product } from "@/lib/types";

interface ShopTheLookProps {
  products: Product[];
  lookbookTitle: string;
}

export default function ShopTheLook({ products, lookbookTitle }: ShopTheLookProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set());
  const { addToCart } = useCartStore();

  const handleAddAllToCart = () => {
    products.forEach((product) => {
      if (product._id && !addedToCart.has(product._id)) {
        addToCart({
          _id: product._id,
          title: product.title,
          slug: typeof product.slug === "string" ? product.slug : product.slug?.current || '',
          price: product.price,
          quantity: 1,
          inStock: product.inStock || true,
        });
        setAddedToCart(prev => new Set(prev).add(product._id));
      }
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      _id: product._id,
      title: product.title,
      slug: typeof product.slug === "string" ? product.slug : product.slug?.current || '',
      price: product.price,
      quantity: 1,
      inStock: product.inStock || true,
    });
    setAddedToCart(prev => new Set(prev).add(product._id));
  };

  if (!products || products.length === 0) return null;

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="inline-flex items-center bg-black hover:bg-gray-800 text-white"
      >
        <ShoppingBag className="w-5 h-5 mr-2" />
        Shop the Look ({products.length} items)
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Shop the {lookbookTitle} Look</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-gray-600 mt-2">
                Add all items to your cart or select individual pieces
              </p>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="mb-6">
                <Button
                  onClick={handleAddAllToCart}
                  className="w-full bg-black hover:bg-gray-800 text-white"
                  size="lg"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add All to Cart
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product._id} className="relative">
                    <ProductCard product={product} />
                    <div className="mt-3">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        disabled={addedToCart.has(product._id)}
                        className="w-full"
                        variant={addedToCart.has(product._id) ? "secondary" : "default"}
                      >
                        {addedToCart.has(product._id) ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Added
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}