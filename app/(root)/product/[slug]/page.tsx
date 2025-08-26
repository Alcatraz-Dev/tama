
import { ProductDetails } from "@/components/ProductDetails";
import { getProductBySlug } from "@/lib/useQuery";
import { notFound } from "next/navigation";


type Props = { params: { slug: string } };

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);

  if (!product) return notFound();

  return <ProductDetails product={product} />;
}