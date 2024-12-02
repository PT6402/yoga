import product16 from "../assets/img/products/16.png";
import product17 from "../assets/img/products/17.png";
import product18 from "../assets/img/products/18.png";
import product19 from "../assets/img/products/19.png";
import product20 from "../assets/img/products/20.png";
import { getCategory } from "./categories";
import { Product } from "./products";

const NEW_ARRIVALS: Product[] = [
  {
    id: 1,
    name: "new product 1",
    description: ` 
          <p>
            The patented eighteen-inch hardwood Arrowhead deck --- finely
            mortised in, makes this the strongest and most rigid canoe ever
            built. You cannot buy a canoe that will afford greater satisfaction.
          </p>
          <p>
            The St. Louis Meramec Canoe Company was founded by Alfred Wickett in
            1922. Wickett had previously worked for the Old Town Canoe Co from
            1900 to 1914. Manufacturing of the classic wooden canoes in Valley
            Park, Missouri ceased in 1978.
          </p>
          <ul>
            <li>Regular fit, mid-weight t-shirt</li>
            <li>Natural color, 100% premium combed organic cotton</li>
            <li>
              Quality cotton grown without the use of herbicides or pesticides -
              GOTS certified
            </li>
            <li>Soft touch water based printed in the USA</li>
          </ul>`,
    price_base: 100000,
    brand: "no brand",
    image: {
      mainImage: product16,
      images: [product17, product18, product19, product20],
    },
    category: getCategory(1),
    variants: [
      {
        type: "Size",
        item: [
          { value: "L", price_modifier: 5000 },
          { value: "M", price_modifier: 2000 },
        ],
      },
      {
        type: "Color",
        item: [
          { value: "Green", price_modifier: 10000 },
          { value: "Red", price_modifier: 2000 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "new product 2",
    description: ` 
          <p>
            The patented eighteen-inch hardwood Arrowhead deck --- finely
            mortised in, makes this the strongest and most rigid canoe ever
            built. You cannot buy a canoe that will afford greater satisfaction.
          </p>
          <p>
            The St. Louis Meramec Canoe Company was founded by Alfred Wickett in
            1922. Wickett had previously worked for the Old Town Canoe Co from
            1900 to 1914. Manufacturing of the classic wooden canoes in Valley
            Park, Missouri ceased in 1978.
          </p>
          <ul>
            <li>Regular fit, mid-weight t-shirt</li>
            <li>Natural color, 100% premium combed organic cotton</li>
            <li>
              Quality cotton grown without the use of herbicides or pesticides -
              GOTS certified
            </li>
            <li>Soft touch water based printed in the USA</li>
          </ul>`,
    price_base: 150000,
    brand: "brand local new",
    image: {
      mainImage: product16,
      images: [product17, product18, product19, product20],
    },
    category: getCategory(2),
    variants: [
      {
        type: "Size",
        item: [
          { value: "L", price_modifier: 5000 },
          { value: "M", price_modifier: 2000 },
        ],
      },
    ],
  },
];
export { NEW_ARRIVALS };
