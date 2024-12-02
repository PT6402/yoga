import { useSelector } from "react-redux";
import { Category, Product } from "../../../../../context/type_stores";
import ButtonSecondary from "../../../../../shared/Button/ButtonSecondary";
import Input from "../../../../../shared/Input";
import Label from "../../../../../shared/Label";
import Select from "../../../../../shared/Select";
import { RootState } from "../../../../../context/store";
import { ChangeEvent, useRef, useState } from "react";
import { useProductAdmin } from "../../../../../hooks/admin";
import { Switch } from "@material-tailwind/react";

export default function StepInfo() {
  const { product } = useSelector((state: RootState) => state.product);
  const { data_admin: categories } = useSelector(
    (state: RootState) => state.category
  );
  const [data] = useState<Product>((): Product => {
    if (product) {
      return product;
    } else {
      return {
        id: 0,
        name: "",
        brand: "",
        category: categories[0],
        price_base: "0",
      };
    }
  });
  const { updateInfo } = useProductAdmin();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const brandInputRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    data.category
  );
  const [isNewArrival, setIsNewArrival] = useState(data.newArrival!);
  const handleCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const valueSelect =
      e.target.options[e.target.selectedIndex].getAttribute("data-item");
    if (valueSelect) {
      setSelectedCategory(JSON.parse(valueSelect) as Category);
    } else {
      setSelectedCategory(data.category);
    }
  };
  const handleUpdate = () => {
    if (
      nameInputRef.current != null &&
      priceInputRef.current != null &&
      brandInputRef.current != null
    ) {
      if (
        nameInputRef.current.value.trim() != "" &&
        brandInputRef.current.value.trim() != "" &&
        priceInputRef.current.value.trim() != "" &&
        priceInputRef.current.value.match(/\d+/g) != null &&
        selectedCategory?.id
      ) {
        updateInfo({
          name: nameInputRef.current.value,
          brand: brandInputRef.current.value,
          price_base: priceInputRef.current.value,
          category: selectedCategory,
          newArrival: isNewArrival,
          id: data.id,
        });
      }
    }
  };

  return (
    <>
      {data && (
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white mt-5">
          <div className="p-6 flex flex-col sm:flex-row items-center">
            <div className="sm:ml-8">
              <h3 className=" text-slate-700 dark:text-slate-300 flex ">
                <span className="uppercase">Information product</span>
              </h3>
            </div>
            <ButtonSecondary
              sizeClass="py-2 px-7 "
              fontSize="text-sm font-medium"
              className="!bg-slate-800 mt-5 sm:mt-0 sm:ml-auto !rounded-lg text-white !ring-transparent"
              onClick={handleUpdate}
            >
              Update info
            </ButtonSecondary>
          </div>
          <div
            className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${"block"}`}
          >
            {/* ============ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
              <div>
                <Label className="text-sm">Name</Label>
                <Input
                  className="mt-1.5"
                  ref={nameInputRef}
                  defaultValue={data.name}
                />
              </div>
              <div>
                <Label className="text-sm">Category</Label>
                <Select
                  id="select_info"
                  className="mt-1.5"
                  onChange={handleCategorySelect}
                  defaultValue={data.category && data.category.id}
                >
                  {categories.length > 0 &&
                    categories.map((item) => (
                      <option
                        value={item.id}
                        key={item.id}
                        data-item={JSON.stringify(item)}
                      >
                        {item.name}
                      </option>
                    ))}
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
              <div>
                <Label className="text-sm">Price</Label>
                <Input
                  className="mt-1.5"
                  ref={priceInputRef}
                  defaultValue={data.price_base}
                />
              </div>
              <div>
                <Label className="text-sm">Brand</Label>
                <Input
                  className="mt-1.5"
                  ref={brandInputRef}
                  defaultValue={data.brand}
                />
              </div>
              <div>
                <Label className="text-sm">new arrival</Label>
                <div>
                  <Switch
                    defaultChecked={data.newArrival}
                    style={{ backgroundImage: "none" }}
                    ripple={true}
                    className="h-full w-full !ring-transparent checked:!bg-red-500 !border-none  "
                    containerProps={{
                      className: "w-11 h-6  ",
                    }}
                    circleProps={{
                      className: " left-0.5 border-none ",
                    }}
                    crossOrigin={undefined}
                    onChange={() => setIsNewArrival(!isNewArrival)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
