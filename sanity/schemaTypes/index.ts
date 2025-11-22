import { type SchemaTypeDefinition } from "sanity";
import product from "./product";
import category from "./category";
import lookbook from "./lookbook";
import collection from "./collection";
import heroCard from "./heroCard";
import order from "./order";
import socialLinks from "./socialLinks";
import review from "./review";
import contact from "./contact";
import contactInfo from "./contactInfo";
import ads from "./ads";
import discountOffer from "./discountOffer";
import specialEvent from "./specialEvent";


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroCard, product , category , collection , lookbook , order , socialLinks, review, contact, contactInfo, ads, discountOffer, specialEvent
  ],
};
