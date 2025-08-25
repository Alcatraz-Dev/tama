import { type SchemaTypeDefinition } from "sanity";
import product from "./product";
import category from "./category";
import lookbook from "./lookbook";
import collection from "./collection";
import heroCard from "./heroCard";
import subcategory from "./subcategory";
import banner from "./banner";


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroCard, product , category , subcategory, collection , banner, lookbook
  ],
};
