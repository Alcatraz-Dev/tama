import { getCategories } from "@/lib/useQuery";
import ClientSubcategoryGrid from "./ClientSubcategoryGrid";

export default async function SubcategoryGrid() {
  const categories = await getCategories(3);

  return <ClientSubcategoryGrid categories={categories} />;
}