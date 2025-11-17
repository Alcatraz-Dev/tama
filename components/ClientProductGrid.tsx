"use client";
import { motion } from "framer-motion";
import { ProductGridSkeleton } from "./ui/skeleton";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";
import { useTranslation } from "@/lib/translationContext";

interface Props {
  products: Product[];
  loading?: boolean;
}


export default function ClientProductGrid({ products, loading = false }: Props) {
  const { t, language } = useTranslation();
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05 },
    },
  };


  return (
    <section className="py-8 sm:py-12 md:py-16 bg-fashion-cream" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-12 tracking-tight text-fashion-dark dark:text-white"
        >
          {t('ourProducts')}
        </motion.h2>

        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-fashion-dark dark:text-white mb-2">{t('noProductsFound')}</h3>
            <p className="text-fashion-charcoal/70 dark:text-gray-400">{t('tryAdjustingSearch')}</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-10 z-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((p: Product) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
