import { ProductVariant } from "../data_app/products";

const mapInputToResult = (
  options: ProductVariant[],
  userSelection: string[]
): { type: string; value: string; price_modifier: number }[] => {
  // Kiểm tra tất cả các giá trị trong `userSelection` có tìm thấy không
  const allSelectionsNotFound = userSelection.every(
    (selection) =>
      !options.some((option) =>
        option.item.some((item) => item.value === selection)
      )
  );

  if (allSelectionsNotFound) {
    // Nếu tất cả đều không tìm thấy, trả về giá cao nhất của từng loại
    return options.map((option) => {
      const highestPricedItem = option.item.reduce((max, item) =>
        item.price_modifier > max.price_modifier ? item : max
      );
      return {
        type: option.type,
        value: highestPricedItem.value,
        price_modifier: highestPricedItem.price_modifier,
      };
    });
  }

  // Nếu có ít nhất một giá trị tìm thấy, xử lý từng loại
  return options.map((option) => {
    const foundItem = option.item.find((item) =>
      userSelection.includes(item.value)
    );
    if (foundItem) {
      return {
        type: option.type,
        value: foundItem.value,
        price_modifier: foundItem.price_modifier,
      };
    }
    // Nếu không tìm thấy, chọn giá trị cao nhất
    const highestPricedItem = option.item.reduce((max, item) =>
      item.price_modifier > max.price_modifier ? item : max
    );
    return {
      type: option.type,
      value: highestPricedItem.value,
      price_modifier: highestPricedItem.price_modifier,
    };
  });
};
const mapInputToResultSingle = (
  option: ProductVariant,
  userSelection: string[]
): { value: string; price_modifier: number } => {
  // Tìm item đầu tiên có trong userSelection
  const foundItem = option.item.find((item) =>
    userSelection.includes(item.value)
  );

  if (foundItem) {
    // Nếu tìm thấy, trả về phần tử phù hợp
    return { value: foundItem.value, price_modifier: foundItem.price_modifier };
  }

  // Nếu không tìm thấy, lấy phần tử có `price_modifier` cao nhất
  const highestPricedItem = option.item.reduce((max, item) =>
    item.price_modifier > max.price_modifier ? item : max
  );

  return {
    value: highestPricedItem.value,
    price_modifier: highestPricedItem.price_modifier,
  };
};
export { mapInputToResult, mapInputToResultSingle };
