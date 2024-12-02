import { useSelector } from "react-redux";
import ButtonSecondary from "../../../../../shared/Button/ButtonSecondary";
import Input from "../../../../../shared/Input";
import Label from "../../../../../shared/Label";
import Select from "../../../../../shared/Select";
import { FormCreateType } from "../context/FormContants";
import { useForm } from "../context/FormContext";
import { RootState } from "../../../../../context/store";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Category } from "../../../../../context/type_stores";
import { DataInfo } from "../context/type_context";
import { useProductAdmin } from "../../../../../hooks/admin";

export default function StepInfo() {
  const { state, dispatch } = useForm();
  const { checkInfo } = useProductAdmin();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const brandInputRef = useRef<HTMLInputElement>(null);
  const { data_admin: categories } = useSelector(
    (state: RootState) => state.category
  );
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0]
  );
  const handleNextStep = () => {
    if (
      nameInputRef.current != null &&
      priceInputRef.current != null &&
      brandInputRef.current != null
    ) {
      const value = {
        nameRef: nameInputRef.current,
        brandRef: brandInputRef.current,
        priceRef: priceInputRef.current,
      };

      if (
        nameInputRef.current.value.trim() != "" &&
        brandInputRef.current.value.trim() != "" &&
        priceInputRef.current.value.trim() != "" &&
        priceInputRef.current.value.match(/\d+/g) != null &&
        selectedCategory?.id
      ) {
        checkInfo({
          name: value.nameRef.value,
          brand: value.brandRef.value,
          categoryId: selectedCategory.id,
        }).then((status) => {
          const dataInfo: DataInfo = {
            name: value.nameRef.value,
            brand: value.brandRef.value,
            price: Number(value.priceRef.value),
            category: selectedCategory,
          };
          dispatch({ type: FormCreateType.SET_DATA_INFO, payload: dataInfo });
          if (status) dispatch({ type: FormCreateType.NEXT_STEP });
        });
      }
    }
  };
  const handleCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const valueSelect =
      e.target.options[e.target.selectedIndex].getAttribute("data-item");
    if (valueSelect) {
      setSelectedCategory(JSON.parse(valueSelect) as Category);
    } else {
      setSelectedCategory(categories[0]);
    }
  };
  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, []);
  if (categories.length > 0) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl mt-5 bg-white">
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
            // onClick={() => }
            onClick={handleNextStep}
          >
            Next
          </ButtonSecondary>
        </div>
        {selectedCategory?.id && (
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
                  defaultValue={state.dataInfo?.name}
                />
              </div>
              <div>
                <Label className="text-sm">Category</Label>
                <Select
                  id="select_info"
                  className="mt-1.5"
                  onChange={handleCategorySelect}
                  defaultValue={
                    (state.dataInfo?.category &&
                      state.dataInfo?.category?.id) ||
                    selectedCategory?.id
                  }
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
                  defaultValue={state.dataInfo?.price}
                />
              </div>
              <div>
                <Label className="text-sm">Brand</Label>
                <Input
                  className="mt-1.5"
                  ref={brandInputRef}
                  defaultValue={state.dataInfo?.brand}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
