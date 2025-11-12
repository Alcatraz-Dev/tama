import { getProducts } from "@/lib/useQuery";
import ClientProductGrid from "./ClientProductGrid";


export default async function ProductGrid() {
  const products = await getProducts();

  return <ClientProductGrid products={products} />;
}
