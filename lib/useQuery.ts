import { client } from "@/sanity/lib/client";
import { FiFacebook } from "react-icons/fi";
import { RiInstagramLine, RiTiktokLine, RiYoutubeLine } from "react-icons/ri";
import React from "react";

interface CollectionFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export async function getHeroCards() {
  const query = `*[_type == "heroCard"] | order(order asc){
    _id,
    title,
    content,
    cardType,
    "imageUrl": image.asset->url,
    buttonText,
    buttonLink,
    withButton,
    withIcon,
    order
  }`;

  const results = await client.fetch(query);

  return results.map((item: Record<string, unknown>) => ({
    type: item.cardType,
    title: item.title,
    subtitle: item.content,
    image: item.imageUrl,
    buttonText: item.buttonText,
    buttonLink: item.buttonLink,
    withButton: item.withButton,
    withIcon: item.withIcon,
  }));
}

export async function getSubHeroCards() {
  const query = `
*[_type == "subcategory"]{
  _id,
  title,
  slug,
  "imageUrl": image.asset->url,
  "productCount": count(*[_type == "product" && references(^._id)])
}
`;

  const results = await client.fetch(query);

  return results;
}

export async function getProducts() {
  const query = `
*[_type == "product"]{
  _id,
  title,
  price,
  originalPrice,
  description,
  "slug": slug.current,
  gallery[]{
    _type,
    asset->{
      _id,
      url
    }
  },
  colors[]{
    value,
    hex,
  },
  sizes,
  inStock,
  category->{...,},
  "reviews": {
    "count": count(*[_type == "review" && product._ref == ^._id]),
    "averageRating": math::avg(*[_type == "review" && product._ref == ^._id].rating)
  }
}
`;

  const results = await client.fetch(query);

  return results;
}
export async function getProductBySlug(slug: string) {
  const query = `
*[_type == "product" && slug.current == $slug][0]{
  _id,
  title,
  description,
  price,
  originalPrice,
  inStock,
  gallery[]{
   ...,
    _key,
    _type,
    _type == "image" => {
      asset->{_id, url}
    },
    _type == "file" => {
     ...,
      asset->{_id, url, originalFilename, mimeType}
    }
  },
  colors[]{hex, name},
  sizes,
  materials,
  careInstructions,
  productDetails,
  shippingInfo,
  returnPolicy,
  category->{...,},
  "collection": *[_type == "collection" && references(^._id)][0]{
    _id,
    title,
    slug
  },
  "reviews": {
    "count": count(*[_type == "review" && product._ref == ^._id]),
    "averageRating": math::avg(*[_type == "review" && product._ref == ^._id].rating)
  }
}
`;
  const product = await client.fetch(query, { slug });
  return product;
}
export async function getBanner() {
  const query = `
*[_type == "banner"][0]{
  title,
  subtitle,
  buttonText,
  buttonLink,
  "backgroundImageUrl": backgroundImage.asset->url
}
`;

  const results = await client.fetch(query);

  return results;
}
export async function getAllProducts() {
  const query = `
*[_type == "product"]{
  _id,
  title,
  "slug": slug.current,
  description,
  price,
  originalPrice,
  inStock,
  gallery[]{
    ...,
    _key,
    _type,
    _type == "image" => {
      asset->{_id, url}
    },
    _type == "file" => {
      ...,
      asset->{_id, url, originalFilename, mimeType}
    }
  },
  colors[]{hex, name},
  sizes,
  materials,
  onSale,
  popularity,
  _createdAt,
  category->{...,},
  "reviews": {
    "count": count(*[_type == "review" && product._ref == ^._id]),
    "averageRating": math::avg(*[_type == "review" && product._ref == ^._id].rating)
  }
}
`;

  const products = await client.fetch(query);
  return products;
}
export async function getCategories(limit = 5) {
  const query = `*[_type == "category"][0...${limit}]{
    _id,
    title,
    slug,
    "imageUrl": image.asset->url,
    "productCount": count(*[_type == "product" && category._ref == ^._id])
  }`;
  const categories = await client.fetch(query);
  return categories;
}

export async function getCategoryBySlug(slug: string, productLimit = 12, productOffset = 0) {
  const query = `
*[_type == "category" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  "imageUrl": image.asset->url,
  "totalProducts": count(*[_type == "product" && category._ref == ^._id]),
  "products": *[_type == "product" && category._ref == ^._id]{
    _id,
    title,
    "slug": slug.current,
    price,
    originalPrice,
    description,
    gallery[]{
      ...,
      _key,
      _type,
      _type == "image" => {
        asset->{_id, url}
      },
      _type == "file" => {
        ...,
        asset->{_id, url, originalFilename, mimeType}
      }
    },
    inStock,
    colors[]{hex, name},
    sizes,
    "reviews": {
      "count": count(*[_type == "review" && product._ref == ^._id]),
      "averageRating": math::avg(*[_type == "review" && product._ref == ^._id].rating)
    }
  }
}
`;
  const category = await client.fetch(query, { slug });

  // Handle pagination and limit on the client side
  if (category && category.products) {
    // First apply limit, then offset
    const limitedProducts = category.products.slice(0, productLimit + productOffset);
    category.products = limitedProducts.slice(productOffset, productOffset + productLimit);
  }

  return category;
}

export async function getSocialLinks() {
  const query = `*[_type == "socialLinks"]{
   ...,
    name,
    url,
    icon
  }`;
  const socialLinks = await client.fetch(query);
  return socialLinks;
}
export const iconMap: Record<string, React.ComponentType> = {
  facebook: FiFacebook,
  instagram: RiInstagramLine,
  tiktok: RiTiktokLine,
  youtube: RiYoutubeLine,
};
export async function getAndFilterProducts(filter: string) {
  const query = `
*[_type == "product" && $filter in categories[]->title][0..3]{
  _id,
  title,
  price,
  originalPrice,
  description,
  "slug": slug.current,
  gallery[]{
    _type,
    asset->{
      _id,
      url
    }
  },
  colors[]{
    value,    // if using simple string list
    hex,      // if using @sanity/color-input
  },
  sizes,
  inStock,
  "reviews": {
    "count": count(*[_type == "review" && product._ref == ^._id]),
    "averageRating": math::avg(*[_type == "review" && product._ref == ^._id].rating)
  }
}
`;
  const results = await client.fetch(query, { filter });
  return results;
}
export async function getCollectionsLimit(limit = 5) {
  const query = `*[_type == "collection"][0...${limit}]{
    _id,
    title,
    "slug": slug.current,
    description,
    stylingTips,
    season,
    year,
    theme,
    "imageUrl": image.asset->url,
  }`;
  const collections = await client.fetch(query);
  return collections;
}
export async function getCollections() {
  const query = `*[_type == "collection"]{
    _id,
    title,
    "slug": slug.current,
    description,
    stylingTips,
    season,
    year,
    theme,
    "imageUrl": image.asset->url,
  }`;
  const collections = await client.fetch(query);
  return collections;
}
export async function getCollectionBySlug(slug: string, productLimit = 12, productOffset = 0, filters: CollectionFilters = {}) {
  let productFilter = '';

  if (filters.category) {
    productFilter += ` && category._ref == "${filters.category}"`;
  }

  if (filters.minPrice) {
    productFilter += ` && price >= ${filters.minPrice}`;
  }

  if (filters.maxPrice) {
    productFilter += ` && price <= ${filters.maxPrice}`;
  }

  const query = `
*[_type == "collection" && slug.current == $slug][0]{
  _id,
  title,
  description,
  stylingTips,
  season,
  year,
  theme,
  "slug": slug.current,
  "imageUrl": image.asset->url,
  "totalProducts": count(products${productFilter}),
  products${productFilter}[$offset...$limit]->{
    _id,
    title,
    "slug": slug.current,
    price,
    originalPrice,
    description,
    "image": gallery[0].asset->url,
    inStock,
    category->{
      _id,
      title
    },
    "reviews": {
      "count": count(*[_type == "review" && product._ref == ^._id]),
      "averageRating": math::avg(*[_type == "review" && product._ref == ^._id].rating)
    }
  }
}
`;
  const collection = await client.fetch(query, {
    slug,
    limit: productOffset + productLimit,
    offset: productOffset
  });
  return collection;
}

export async function getLookbook(){
  const query = `
*[_type == "lookbook"]{
  _id,
  title,
  "slug": slug.current,
  description,
  stylingTips,
  season,
  year,
  theme,
  "images": images[]{
    asset->{_id, url}
  },
  "products": products[]->{
    _id,
    title,
    "slug": slug.current,
    price,
    originalPrice,
    "image": gallery[0].asset->url,
    inStock,
    "reviews": {
      "count": count(*[_type == "review" && product._ref == ^._id]),
      "averageRating": math::avg(*[_type == "review" && product._ref == ^._id].rating)
    }
  }
}
`;
  const results = await client.fetch(query);
  return results;
}

export async function getLookbookBySlug(slug: string) {
  const query = `
*[_type == "lookbook" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  description,
  stylingTips,
  season,
  year,
  theme,
  "images": images[]{
    asset->{_id, url}
  },
  "products": products[]->{
    _id,
    title,
    "slug": slug.current,
    price,
    description,
    "image": gallery[0].asset->url,
    inStock
  }
}
`;
  const lookbook = await client.fetch(query, { slug });
  return lookbook;
}

export async function getProductReviews(productId: string) {
  const query = `
*[_type == "review" && product._ref == $productId]{
  _id,
  customerName,
  rating,
  reviewText,
  reviewDate,
  verifiedPurchase
} | order(reviewDate desc)
`;
  const reviews = await client.fetch(query, { productId });
  return reviews;
}

export async function getRelatedProducts(categoryId: string, currentProductId: string, limit = 4) {
  const query = `
*[_type == "product" && category._ref == $categoryId && _id != $currentProductId][0...${limit}]{
  _id,
  title,
  price,
  "slug": slug.current,
  gallery[]{
    _type,
    asset->{
      _id,
      url
    }
  },
  inStock
}
`;
  const products = await client.fetch(query, { categoryId, currentProductId });
  return products;
}

export async function getSearchSuggestions(query: string, limit = 10) {
  const groqQuery = `
    *[_type == "product" && lower(title) match lower("${query}*")] | order(title asc)[0...${limit}]{
      _id,
      title,
      "slug": slug.current
    }
  `;
  const suggestions = await client.fetch(groqQuery);
  return suggestions;
}
