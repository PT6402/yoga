import { Product, ProductVariant } from "../data_app/products";

export function getHighestPriceVariants(
  variants: ProductVariant[]
): { type: string; value: string; price_modifier: number }[] {
  return variants.map((variant) => {
    // Tìm item có price_modifier cao nhất trong mỗi loại variant
    const highestPriceItem = variant.item.reduce((maxItem, currentItem) => {
      return currentItem.price_modifier > maxItem.price_modifier
        ? currentItem
        : maxItem;
    });

    // Trả về đối tượng theo định dạng [{type: "Color", value: "Green"}, ...]
    return {
      type: variant.type,
      value: highestPriceItem.value,
      price_modifier: highestPriceItem.price_modifier,
    };
  });
}

export function getCategoriesAndBrands(products: Product[]): {
  categories: string[];
  brands: string[];
} {
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );
  const brands = Array.from(new Set(products.map((product) => product.brand)));

  return { categories, brands };
}
export function getHighestPriceForProduct(product: Product): number {
  const highestModifiersSum = product.variants.reduce((sum, variant) => {
    const highestPriceModifier = Math.max(
      ...variant.item.map((item) => item.price_modifier)
    );
    return sum + highestPriceModifier;
  }, 0);

  return product.price_base + highestModifiersSum;
}
export function getLowestPriceForProduct(product: Product): number {
  const lowestModifiersSum = product.variants.reduce((sum, variant) => {
    const lowestPriceModifier = Math.min(
      ...variant.item.map((item) => item.price_modifier)
    );
    return sum + lowestPriceModifier;
  }, 0);

  return product.price_base + lowestModifiersSum;
}
export function getHighestAndLowestPrices(products: Product[]): {
  highest: number;
  lowest: number;
} {
  let highestPrice = -Infinity;
  let lowestPrice = Infinity;

  products.forEach((product) => {
    const highestProductPrice = getHighestPriceForProduct(product);

    if (highestProductPrice > highestPrice) highestPrice = highestProductPrice;
    if (highestProductPrice < lowestPrice) lowestPrice = highestProductPrice;
  });

  return { highest: highestPrice, lowest: lowestPrice };
}

export type FilterOptions = {
  priceRange: [number, number];
  category?: string;
  brand?: string;
};
export function filterProducts(
  products: Product[],
  options: FilterOptions
): Product[] {
  const { priceRange, category, brand } = options;

  return products.filter((product) => {
    const highestProductPrice = getHighestPriceForProduct(product);

    // Check if the product's highest price falls within the given price range
    const isWithinPriceRange =
      highestProductPrice >= priceRange[0] &&
      highestProductPrice <= priceRange[1];

    // Check if the product matches the category and brand if specified
    const isCategoryMatch = category ? product.category === category : true;
    const isBrandMatch = brand ? product.brand === brand : true;

    return isWithinPriceRange && isCategoryMatch && isBrandMatch;
  });
}
export function paginateProducts(
  products: Product[],
  itemsPerPage: number,
  page: number
): { paginatedProducts: Product[]; totalPages: number } {
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return { paginatedProducts, totalPages };
}

export async function searchProductByName(
  searchTerm: string,
  products: Product[]
) {
  const lowercasedSearchTerm = searchTerm.toLowerCase();

  // Filter products by name, checking if the search term exists in the product name (case-insensitive)
  return products.filter((product) =>
    product.name.toLowerCase().includes(lowercasedSearchTerm)
  );
}

export function hasDuplicateVariants(items: string[][], item: string[]) {
  const variantSet = new Set();
  for (const currentItem of items) {
    const itemString = JSON.stringify(currentItem);
    variantSet.add(itemString);
  }
  const newItemString = JSON.stringify(item);
  return variantSet.has(newItemString);
}
export function formatPrice(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function formatPriceCusK(price: number): string {
  // Nếu giá trị lớn hơn hoặc bằng 1000, chia cho 1000 và thêm chữ 'K'
  if (price >= 1000) {
    const formatted = (price / 1000).toFixed(0); // Chia cho 1000 và giữ 1 chữ số thập phân
    // Định dạng với dấu phẩy và thêm 'K' vào cuối
    return Number(formatted).toLocaleString() + "K";
  } else {
    // Nếu giá trị nhỏ hơn 1000, định dạng với dấu phẩy
    return price.toLocaleString();
  }
}
export function formatPriceMinMax(price: string | number) {
  const priceStr = String(price);
  let resultPrice = "";
  if (priceStr.includes("-")) {
    const priceSplit = priceStr.split("-");
    priceSplit.forEach((item, i) => {
      resultPrice += formatPriceCusK(Number(item));
      if (i != priceSplit.length - 1) resultPrice += " - ";
    });
  } else {
    resultPrice = formatPriceCusK(Number(price));
  }
  return resultPrice;
}
