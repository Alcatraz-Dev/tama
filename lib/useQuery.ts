import { client } from "@/sanity/lib/client";

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

  return results.map((item: any) => ({
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
*[_type == "subcategory"][0..2]{
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
*[_type == "product"][0..3]{
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
  colors[]{
    value,    // if using simple string list
    hex,      // if using @sanity/color-input
  },
  sizes
}
`;

  const results = await client.fetch(query);

  return results;
}
export async function getBanner () {

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