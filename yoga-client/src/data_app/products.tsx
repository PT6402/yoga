import product16 from "../assets/img/products/16.png";
import product17 from "../assets/img/products/17.png";
import product18 from "../assets/img/products/18.png";
import product19 from "../assets/img/products/19.png";
import product20 from "../assets/img/products/20.png";
import lang_tap_main from "../assets/img/product_app/lang-product.png";
import lang_tap_1 from "../assets/img/product_app/lang-product-1.jpg";
import lang_tap_2 from "../assets/img/product_app/lang-product-2.jpg";
import lang_tap_3 from "../assets/img/product_app/lang-product-3.jpg";
import lang_tap_4 from "../assets/img/product_app/lang-prdouct-4.jpg";
import lang_tap_5 from "../assets/img/product_app/lang-product-5.jpg";
import dai_tap_main from "../assets/img/product_app/dai-tap.png";
import dai_tap_1 from "../assets/img/product_app/dai-tap-1.jpg";
import dai_tap_2 from "../assets/img/product_app/dai-tap-2.jpg";
import dai_tap_3 from "../assets/img/product_app/dai-tap-3.jpg";
import dai_tap_4 from "../assets/img/product_app/dai-tap-4.jpg";

import { getCategory } from "./categories";
import { NEW_ARRIVALS } from "./new_arrivals";
export interface ProductVariantItem {
  value: string;
  price_modifier: number;
}
export interface ProductVariant {
  type: string;
  item: ProductVariantItem[];
}
export interface ProductImage {
  mainImage: string;
  images: string[];
}
export interface Product {
  id: number;
  name: string;
  price_base: number;
  image: ProductImage;
  brand: string;
  description: string;
  category: string;
  variants: ProductVariant[];
}
let PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Vòng tập yoga cao cấp",
    description: ` 
          <p>
            – Vòng tập yoga làm từ chất liệu nhựa cho phép chịu được trọng lượng lên tới 150kg.
          </p>
          <p>
            – Được gia công bằng công nghệ ép phun và sơn tĩnh điện mang đến độ mịn, bóng, màu sắc bắt mắt.
          </p>
          <p>
           – Sản phẩm sử dụng vỏ bọc dày 6mm bằng chất liệu cao su tự nhiên cho độ bám cao, độ đàn hồi tốt, khả năng chịu nước và kháng khuẩn…
          </p>
          <p>
           – Đường kính 33cm của vòng tập yoga Đài Loan rất phù hợp với vóc dáng của đa số người Việt Nam nói riêng và châu Á nói chung.
          </p>
          <p>
           – Đặc biệt, bản của vòng có độ rộng tiêu chuẩn 13cm cho phép khả năng mở vai tối đa khi tập các tư thế mở vai (nằm gọn vào phần lưng giữa 2 bả vai) cũng như dễ dàng nằm gọn giữa 2 chân và đùi trong động tác bánh xe nâng cao chẳng hạn.
          </p>
          <p>
           – Một trong những lợi ích lớn nhất của việc sử dụng vòng tập yoga Đài Loan trong các bài tập yoga là khả năng làm giảm đau lưng và giúp đỡ những người bị chấn thương lưng trong quá trình điều trị.
          </p>
          <p>
           – Bởi vì, khi sử dụng vòng trong bài tập cho phép người tập thực hiện các động tác ngã người về sau nhưng vẫn được hỗ trợ, thư giãn cơ bắp và căn chỉnh cột sống.
          </p>
          `,
    price_base: 1500000,
    brand: "no brand new",
    image: {
      mainImage: lang_tap_main,
      images: [lang_tap_1, lang_tap_2, lang_tap_3, lang_tap_4, lang_tap_5],
    },
    category: getCategory(1),
    variants: [
      {
        type: "Color",
        item: [
          { value: "Gray", price_modifier: 10000 },
          { value: "Pink", price_modifier: 0 },
        ],
      },
      // {
      //   type: "Size",
      //   item: [
      //     { value: "L", price_modifier: 0 },
      //     { value: "M", price_modifier: 0 },
      //   ],
      // },
    ],
  },
  {
    id: 2,
    name: "Đai yoga",
    description: ` 
          <p>
            Dây đai hatha yoga là sản phẩm được thiết kế cho các buổi tập thể dục, tập Gym, đặc biệt là tập yoga, thiền… giúp kéo căng và cố định các loại cơ bắp, Đai hỗ trợ người tập trong các động tác lưng, kéo dẫn chân, bàn chân và các động tác từ trung bình đến khó khác.
          </p>
          <p>
            – Dây đai tập Yoga thiết kế với các màu sắc nổi bật.
          </p>
          <p>
            – Với chất liệu dệt 100% sợi bông tự nhiên, chắc chắn, an toàn
          </p>
          <p>
            – Gọn nhẹ, dễ dàng vận chuyển, cất giữ và bảo quản.
          </p>
          <p>
           – Dung tích 500 ml tiện lợi mang theo đi làm, đi học, thể thao…
          </p>
          `,
    price_base: 220000,
    brand: "local brand",
    image: {
      mainImage: dai_tap_main,
      images: [dai_tap_1, dai_tap_2, dai_tap_3, dai_tap_4],
    },
    category: getCategory(2),
    variants: [
      {
        type: "Color",
        item: [
          { value: "Red", price_modifier: 0 },
          { value: "Purple", price_modifier: 0 },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Rey Nylon Backpack 3",
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
    brand: "brand local",
    image: {
      mainImage: product16,
      images: [product17, product18, product19, product20],
    },
    category: getCategory(3),
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
  {
    id: 4,
    name: "Rey Nylon Backpack 4",
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
    brand: "brand local",
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
PRODUCTS = [...PRODUCTS, ...NEW_ARRIVALS];
export { PRODUCTS };
