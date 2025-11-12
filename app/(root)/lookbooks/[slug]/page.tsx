import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getLookbookBySlug } from "@/lib/useQuery";
import ProductCard from "@/components/ProductCard";
import LookbookGallery from "@/components/LookbookGallery";
import ShareButtons from "@/components/ShareButtons";
import ShopTheLook from "@/components/ShopTheLook";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Palette, Sparkles, Heart, ShoppingBag } from "lucide-react";

interface LookbookPageProps {
  params: {
    slug: string;
  };
}

export default async function LookbookPage({ params }: LookbookPageProps) {
  const lookbook = await getLookbookBySlug(params.slug);

  if (!lookbook) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lookbook Not Found</h1>
          <Link href="/lookbooks">
            <Button>Back to Lookbooks</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {lookbook.title}
            </h1>

            {/* Lookbook Metadata */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {lookbook.season && (
                <Badge variant="secondary">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {lookbook.season.charAt(0).toUpperCase() + lookbook.season.slice(1)}
                </Badge>
              )}
              {lookbook.year && (
                <Badge variant="secondary">
                  <Calendar className="w-4 h-4 mr-2" />
                  {lookbook.year}
                </Badge>
              )}
              {lookbook.theme && (
                <Badge variant="secondary">
                  <Palette className="w-4 h-4 mr-2" />
                  {lookbook.theme}
                </Badge>
              )}
            </div>

            {lookbook.description && (
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                {lookbook.description}
              </p>
            )}

            {lookbook.stylingTips && (
              <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                  Styling Tips
                </h3>
                <p className="text-gray-700 leading-relaxed">{lookbook.stylingTips}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {lookbook.images && lookbook.images.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">The Look</h2>
            <LookbookGallery images={lookbook.images} title={lookbook.title} />
          </div>
        </section>
      )}

      {/* Products Section */}
      {lookbook.products && lookbook.products.length > 0 && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop the Look</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the pieces that make this look complete. Each item is carefully selected to bring the vision to life.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {lookbook.products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Shop the Look Button */}
            <div className="text-center space-y-4">
              <ShopTheLook products={lookbook.products} lookbookTitle={lookbook.title} />
              <Link href="/products">
                <Button variant="outline" size="lg" className="inline-flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Browse All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Social Sharing */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Love this look?</h3>
          <p className="text-gray-600 mb-8">Share it with your friends and followers</p>

          <div className="flex justify-center mb-6">
            <ShareButtons
              title={`${lookbook.title} Lookbook`}
              description={lookbook.description}
              url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/lookbooks/${lookbook.slug}`}
            />
          </div>

          <Button variant="outline" size="lg" className="inline-flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            Save for Later
          </Button>
        </div>
      </section>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: LookbookPageProps) {
  const lookbook = await getLookbookBySlug(params.slug);

  if (!lookbook) {
    return {
      title: 'Lookbook Not Found',
    };
  }

  return {
    title: `${lookbook.title} Lookbook | Tama Shop`,
    description: lookbook.description || `Explore the ${lookbook.title} lookbook featuring ${lookbook.products?.length || 0} pieces.`,
    openGraph: {
      title: `${lookbook.title} Lookbook`,
      description: lookbook.description,
      images: lookbook.images?.[0]?.asset?.url ? [lookbook.images[0].asset.url] : [],
    },
  };
}