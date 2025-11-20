"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/translationContext";
import { useLoyaltyStore } from "@/store/loyalty";

const tunisianTownsEn = [
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

const tunisianTownsFr = [
  "Tunis",
  "Ariana",
  "Ben Arous",
  "La Manouba",
  "Nabeul",
  "Zaghouan",
  "Bizerte",
  "Béja",
  "Jendouba",
  "Le Kef",
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

const tunisianTownsAr = [
  "تونس",
  "أريانة",
  "بن عروس",
  "منوبة",
  "نابل",
  "زغوان",
  "بنزرت",
  "باجة",
  "جندوبة",
  "الكاف",
  "سليانة",
  "القيروان",
  "القصرين",
  "سيدي بوزيد",
  "سوسة",
  "المنستير",
  "المهدية",
  "صفاقس",
  "قابس",
  "مدنين",
  "تطاوين",
  "قفصة",
  "توزر",
  "قبلي",
];

export default function CartPage() {
  const { t, language } = useTranslation();
  const { addPurchasePoints } = useLoyaltyStore();
  const {
    cartItems,
    discount,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartStore();

  const getTunisianTowns = () => {
    switch (language) {
      case 'fr':
        return tunisianTownsFr;
      case 'ar':
        return tunisianTownsAr;
      default:
        return tunisianTownsEn;
    }
  };

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
  const total = Math.max(0, subtotal + shippingFee - discount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!fullName.trim()) {
      toast(t("missingFullName"), {
        description: t("enterYourFullName"),
      });
      return;
    }
    if (!town) {
      toast(t("missingTown"), { description: t("selectYourTown") });
      return;
    }
    if (!location.trim()) {
      toast(t("missingLocation"), { description: t("enterYourLocation") });
      return;
    }
    if (!phone.trim()) {
      toast(t("missingPhoneNumber"), {
        description: t("enterYourPhoneNumber"),
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const orderDoc = await client.create({
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
      toast(t("orderSubmittedSuccessfully"), {
        description: t("orderReceivedMessage"),
      });

      // Add loyalty points
      addPurchasePoints(total, orderDoc._id);
      toast("🎉 Loyalty points added!", {
        description: "Thank you for your purchase!",
      });
      const newOrder = {
        fullName,
        town,
        location,
        phone,
        items: cartItems.map((item) => ({
          product: {
            title: item.title,
            price: item.price,
            image: item.gallery?.map(g => g.asset?.url) || [],
          },
          selectedColor: item.color,
          selectedSize: item.size,
          quantity: item.quantity,
        })),
        subtotal,
        shippingFee,
        total,
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
      toast(t("failedToSubmitOrder"), { description: t("pleaseTryAgain") });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center my-20" dir={language === "ar" ? "rtl" : "ltr"}>
        <ShoppingCart className="w-14 h-14 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
        <p className="text-lg font-medium text-black dark:text-white">{t('yourCartIsEmpty')}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto bg-background min-h-screen" dir={language === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-2xl sm:text-3xl font-bold my-6 flex items-center gap-2 text-black dark:text-white">
        <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" /> {t('yourCart')}
      </h1>

      <ul className="space-y-6">
        {cartItems.map((item) => (
          <li
            key={`${item._id}-${item.size ?? ""}-${item.color ?? ""}`}
            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-2xl bg-card shadow-md p-4 sm:p-6 hover:shadow-lg transition"
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
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                {item.price.toFixed(2)} {t('currency')}
              </p>
              <div className="flex items-center justify-between gap-2 mt-3 w-full px-2">
                <div className="flex items-center gap-2">
                  {item.size && <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t('sizeLabel')}: {item.size}</span>}
                  {item.color && item.color.startsWith('#') && (
                    <div className="flex gap-1 flex-wrap justify-start">
                      <span
                        title={item.color}
                        className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-black/50 dark:border-gray-400 shadow-sm transition-transform hover:scale-110"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end">
                  <p className="text-sm sm:text-base lg:text-lg font-extrabold text-black dark:text-white">
                    {(item.price * item.quantity).toFixed(2)} {t('currency')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 mt-3">
                <button
                  onClick={() => decreaseQuantity(item._id)}
                  className="p-1 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <span className="px-2 sm:px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-900 text-xs sm:text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(item._id)}
                  className="p-1 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Subtotal + remove */}
            <div className="flex sm:flex-col sm:items-end justify-between sm:justify-start gap-2 sm:gap-3 mt-3 sm:mt-0">
              <p className="text-sm sm:text-md font-semibold">
                {(item.price * item.quantity).toFixed(2)} {t('currency')}
              </p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs sm:text-sm"
              >
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" /> {t('remove')}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Checkout Section */}
      <div className="mt-10 p-6 rounded-2xl bg-card shadow-lg max-w-4xl mx-auto">
        <div className="flex flex-col gap-6 items-center">
          {/* Order Summary */}
          <div className="w-full flex flex-col gap-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('subtotal')}: {subtotal.toFixed(2)} {t('currency')}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('shipping')}: {shippingFee} {t('currency')}</p>
            {discount > 0 && (
              <p className="text-sm text-green-600 dark:text-green-400">
                Discount: -{discount.toFixed(2)} {t('currency')}
              </p>
            )}
            <p className="text-xl font-bold text-black dark:text-white">{t('total')}: {total.toFixed(2)} {t('currency')}</p>
          </div>

          {/* Checkout Form / Button */}
          <div className="w-full flex flex-col items-center">
            {!showCheckoutForm ? (
              <Button
                className="w-full max-w-sm rounded-lg"
                onClick={() => setShowCheckoutForm(true)}
              >
                {t('proceedToCheckout')}
              </Button>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-full max-w-sm"
              >
                <input
                  type="text"
                  placeholder={t('fullName')}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  required
                />
                <select
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  className="border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  required
                >
                  <option value="">{t('selectTunisianTown')}</option>
                  {getTunisianTowns().map((t, i) => (
                    <option key={i} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder={t('location')}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  required
                />
                <input
                  type="tel"
                  placeholder={t('phoneNumber')}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 w-full bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  required
                />

                <div className="flex flex-col md:flex-row gap-2 md:gap-5 mt-2 w-full">
                  <Button
                    type="button"
                    className="flex-1 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-600"
                    onClick={() => setShowCheckoutForm(false)}
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 rounded-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('submitting') : t('submitOrder')}
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
