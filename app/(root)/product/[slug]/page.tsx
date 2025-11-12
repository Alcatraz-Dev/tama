
import { ProductDetails } from "@/components/ProductDetails";
import { getProductBySlug } from "@/lib/useQuery";
import { notFound } from "next/navigation";


type Props = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  return <ProductDetails product={product} />;
}