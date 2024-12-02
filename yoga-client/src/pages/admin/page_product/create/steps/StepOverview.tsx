import { Carousel } from "react-responsive-carousel";
import ButtonPrimary from "../../../../../shared/Button/ButtonPrimary";
import { useCallback, useState } from "react";
import Prices from "../../../../../components/Prices";
import { FormCreateType } from "../context/FormContants";
import { useForm } from "../context/FormContext";
import { Typography } from "@material-tailwind/react";
import parse from "html-react-parser";
import ButtonSecondary from "../../../../../shared/Button/ButtonSecondary";
import { useNavigate } from "react-router-dom";
import { useProductAdmin } from "../../../../../hooks/admin";
import VariantItemProduct from "../common/VariantItemProduct";

export default function StepOverview() {
  const { addProduct } = useProductAdmin();
  const { dispatch, state } = useForm();
  const navigate = useNavigate();
  const LIST_IMAGES = state.dataImage;
  const [priceProduct, setPriceProduct] = useState((): number => {
    if (state.dataInfo?.price) {
      let price = state.dataInfo.price;
      state.dataVariant.forEach((item) => {
        price += item.variantItems[0].priceModifier;
      });
      return price;
    } else {
      return 0;
    }
  });
  const handleChangePrice = useCallback(
    ({
      typeId,
      oldItemId,
      newItemId,
    }: {
      typeId: number;
      oldItemId: number;
      newItemId: number;
    }) => {
      const item = state.dataVariant.find((pv) => pv.variantType.id == typeId);
      if (item && oldItemId != newItemId) {
        const oldVariantItem = item.variantItems.find(
          (pi) => pi.variantItem.id == oldItemId
        );
        const newVariantItem = item.variantItems.find(
          (pi) => pi.variantItem.id == newItemId
        );
        if (oldVariantItem && newVariantItem) {
          const priceOld = oldVariantItem.priceModifier;
          const priceNew = newVariantItem.priceModifier;
          const price = priceProduct - priceOld + priceNew;
          setPriceProduct(price);
        }
      }
    },
    [priceProduct]
  );

  const renderSectionContent = () => {
    return (
      <div className="space-y-7 2xl:space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {state.dataInfo?.name}
          </h2>

          <div className="flex items-center">
            <Typography variant="paragraph">{state.dataInfo?.brand}</Typography>
          </div>
          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={priceProduct}
            />
          </div>
        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        {state.dataVariant.map((v) => (
          <VariantItemProduct
            variant={v}
            key={v.variantType.id}
            handleChangePriceProduct={handleChangePrice}
          />
        ))}
      </div>
    );
  };

  const renderDetailSection = () => {
    return (
      <div className="">
        <h2 className="text-2xl font-semibold">Description</h2>
        <div className=" dark:prose-invert sm:max-w-4xl my-3">
          {parse(state.dataDescription)}
        </div>
      </div>
    );
  };

  const handleSubmit = () => {
    addProduct({
      dataInfo: state.dataInfo!,
      dataVariant: state.dataVariant,
      dataImage: state.dataImage,
      dataDescription: state.dataDescription,
    }).then(async (res) => {
      if (res) {
        navigate("/admin/product");
      }
    });
  };
  return (
    <div className={"w-full flex justify-center"}>
      <div className="flex flex-col justify-center items-start mt-5">
        <ButtonSecondary
          sizeClass="py-2 px-7 "
          fontSize="text-sm font-medium"
          className="!bg-transparent mt-5 sm:mt-0 sm:ml-auto !rounded-lg text-slate-800 !ring-transparent border-2 border-slate-800 "
          onClick={() => {
            dispatch({ type: FormCreateType.PREV_STEP });
          }}
        >
          Back
        </ButtonSecondary>
        <main className="bg-white max-w-5xl p-5 rounded-2xl mt-5">
          <div className="lg:flex">
            <div className="w-full lg:w-[55%] ">
              <div className="relative">
                <Carousel
                  swipeable={false}
                  infiniteLoop={true}
                  showIndicators={false}
                  showStatus={false}
                  showArrows={false}
                  thumbWidth={60}
                  className="productCarousel"
                >
                  {LIST_IMAGES.map((item, index) => (
                    <img
                      key={index}
                      src={item.urlImage}
                      className="w-full rounded-2xl object-cover "
                      alt="product detail 1"
                    />
                  ))}
                </Carousel>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
              {renderSectionContent()}
            </div>
          </div>

          <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
            {renderDetailSection()}
          </div>
          <div className="flex justify-end">
            <div className="flex gap-2">
              <ButtonPrimary
                className="!bg-white !text-slate-800 border "
                onClick={() => navigate("/admin/product")}
              >
                Cancel
              </ButtonPrimary>
              <ButtonPrimary onClick={handleSubmit}>
                Submit & Create product
              </ButtonPrimary>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
