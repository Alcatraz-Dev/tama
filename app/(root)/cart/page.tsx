"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const tunisianTowns = [
  "Tunis",
  "Sfax",
  "Sousse",
  "Kairouan",
  "Bizerte",
  "Gabes",
  "Nabeul",
  "Gafsa",
  "Monastir",
  "Mahdia",
];

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartStore();

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [town, setTown] = useState("");

  const shippingFee = 7; // flat fee
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

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

    setIsSubmitting(true);

    try {
      await client.create({
        _type: "order",
        fullName,
        town,
        location,
        phone,
        items: cartItems.map((item) => ({
          _key: crypto.randomUUID(), // <--- Add this
          product: { _type: "reference", _ref: item._id },
          quantity: item.quantity,
          selectedColor: item.color,
          selectedSize: item.size,
        })),
        subtotal,
        shippingFee,
        total,
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      toast("Order submitted successfully!", {
        description: "We have received your order and will process it shortly.",
      });
      const newOrder = {
        fullName,
        town,
        location,
        phone,
        items: cartItems.map((item) => ({
          _key: crypto.randomUUID(), // <--- Add this
          product: { _type: "reference", _ref: item._id },
          quantity: item.quantity,
          selectedColor: item.color,
          selectedSize: item.size,
        })),
        subtotal,
        shippingFee,
        total,
        status: "pending",
      };

      // Send email to admin
      await fetch("/api/send-order-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      setFullName("");
      setLocation("");
      setPhone("");
      setTown("");
      clearCart();
      setShowCheckoutForm(false);
    } catch (err) {
      console.error("Cart order failed:", err);
      toast("Failed to submit order", { description: "Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center my-20">
        <ShoppingCart className="w-14 h-14 mx-auto text-gray-400 mb-4" />
        <p className="text-lg font-medium">Your cart is empty 🛒</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold my-6 flex items-center gap-2">
        <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" /> Your Cart
      </h1>

      <ul className="space-y-6">
        {cartItems.map((item) => (
          <li
            key={`${item._id}-${item.size ?? ""}-${item.color ?? ""}`}
            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-2xl bg-white/80 backdrop-blur-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition"
          >
            {/* Product Image */}
            {item.gallery && item.gallery[0]?._type === "image" && (
              <Image
                src={item.gallery[0].asset?.url}
                alt={item.title}
                width={100}
                height={100}
                className="rounded-xl object-cover w-24 h-24 sm:w-[100px] sm:h-[100px]"
              />
            )}

            {/* Product Info */}
            <div className="flex-1">
              <h2 className="text-base sm:text-lg font-semibold">
                {item.title}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                ${item.price.toFixed(2)}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs sm:text-sm text-gray-500">
                {item.size && <span>Size: {item.size}</span>}
                {item.color && (
                  <span className="flex items-center gap-1">
                    Color:
                    <span
                      className="inline-block w-4 h-4 rounded-full border shadow"
                      style={{ backgroundColor: item.color }}
                    />
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 sm:gap-3 mt-3">
                <button
                  onClick={() => decreaseQuantity(item._id)}
                  className="p-1 rounded-full border hover:bg-gray-100 transition"
                >
                  <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <span className="px-2 sm:px-3 py-1 rounded-full bg-gray-100 text-xs sm:text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(item._id)}
                  className="p-1 rounded-full border hover:bg-gray-100 transition"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Subtotal + remove */}
            <div className="flex sm:flex-col sm:items-end justify-between sm:justify-start gap-2 sm:gap-3 mt-3 sm:mt-0">
              <p className="text-sm sm:text-md font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs sm:text-sm"
              >
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" /> Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Checkout Section */}
      <div className="mt-10 p-6 rounded-2xl bg-white/95 shadow-lg max-w-4xl mx-auto">
        <div className="flex flex-col gap-6 items-center">
          {/* Order Summary */}
          <div className="w-full flex flex-col gap-2">
            <p className="text-sm text-gray-600">
              Subtotal: ${subtotal.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">Shipping: ${shippingFee}</p>
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
          </div>

          {/* Checkout Form / Button */}
          <div className="w-full flex flex-col items-center">
            {!showCheckoutForm ? (
              <Button
                className="w-full max-w-sm rounded-lg"
                onClick={() => setShowCheckoutForm(true)}
              >
                Proceed to Checkout
              </Button>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-full max-w-sm"
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border rounded-lg px-3 py-2 w-full"
                  required
                />
                <select
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  className="border rounded-lg px-3 py-2 w-full"
                  required
                >
                  <option value="">Select Tunisian Town</option>
                  {tunisianTowns.map((t, i) => (
                    <option key={i} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border rounded-lg px-3 py-2 w-full"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border rounded-lg px-3 py-2 w-full"
                  required
                />

                <div className="flex flex-col md:flex-row gap-2 md:gap-5 mt-2 w-full">
                  <Button
                    type="button"
                    className="flex-1 rounded-lg bg-gray-200 text-black hover:bg-gray-300"
                    onClick={() => setShowCheckoutForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 rounded-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Order"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
