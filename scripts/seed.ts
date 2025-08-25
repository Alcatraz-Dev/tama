// scripts/seed.ts
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const products = [
  { _type: "product", title: "Basic Tee", slug: { _type: "slug", current: "basic-tee" }, description: "100% cotton tee", price: 199, category: "tops", inStock: true },
  { _type: "product", title: "Denim Jacket", slug: { _type: "slug", current: "denim-jacket" }, description: "Classic fit jacket", price: 899, category: "outerwear", inStock: true },
  { _type: "product", title: "Chino Pants", slug: { _type: "slug", current: "chino-pants" }, description: "Slim fit chinos", price: 599, category: "bottoms", inStock: true },
];

async function main() {
  for (const p of products) {
    await client.createIfNotExists({ ...p, _id: `seed.${p.slug.current}` });
  }
  console.log("Seeded products ✔");
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});