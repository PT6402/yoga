/* eslint-disable @typescript-eslint/ban-ts-comment */
import Heading from "./Heading";
import Glide from "@glidejs/glide";
import { useEffect, useId } from "react";
import CardCategory2 from "./CardCategory2";
import { CardCategoryData } from "../data_app/categories";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";

export interface SectionSliderCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  data?: CardCategoryData[];
}

export default function SectionSliderCategories({
  heading = "Category",
  subHeading = "",
  className = "",
  itemClassName = "",
}: // data = CATS,
SectionSliderCategoriesProps) {
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");
  const { data } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    // @ts-ignore
    const OPTIONS: Glide.Options = {
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4,
        },
        1024: {
          gap: 20,
          perView: 3.4,
        },
        768: {
          gap: 20,
          perView: 3,
        },
        640: {
          gap: 20,
          perView: 2.3,
        },
        500: {
          gap: 20,
          perView: 1.4,
        },
      },
    };

    const slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    return () => {
      slider.destroy();
    };
  }, [UNIQUE_CLASS]);

  return (
    <div className={`nc-SectionSliderCategories ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`}>
        <Heading desc={subHeading} hasNextPrev>
          {heading}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {data.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <CardCategory2
                  featuredImage={`${import.meta.env.VITE_SERVER_URL}/images/${
                    item.image
                  }`}
                  name={item.name!}
                  id={item.id || 0}
                  bgClass={"bg-[#f7f7f7]"}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
