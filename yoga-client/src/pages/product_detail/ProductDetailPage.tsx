import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/user";
import { Product } from "../../data_app/products";
import parse from "html-react-parser";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SectionContentProductDetail from "./SectionContentProductDetail";

export interface ProductDetailPageProps {
  className?: string;
}
export default function ProductDetailPage({
  className = "",
}: ProductDetailPageProps) {
  const { id } = useParams();
  const { getOne } = useProduct();
  const [productDetail, setProductDetail] = useState<Product>();
  useEffect(() => {
    getOne(Number(id)).then((data) => {
      if (data) {
        setProductDetail(data);
      }
    });
  }, [id]);
  return (
    <>
      {productDetail && (
        <div className={`nc-ProductDetailPage ${className}`}>
          <main className="container mt-5 lg:mt-11">
            <div className="lg:flex">
              <div className="w-full lg:w-[55%] ">
                <div className="relative">
                  <Carousel
                    swipeable={false}
                    infiniteLoop={true}
                    showIndicators={false}
                    showStatus={false}
                    showArrows={true}
                    thumbWidth={60}
                    className="productCarousel "
                  >
                    {productDetail.image.images.map((item, index) => (
                      <img
                        key={index}
                        src={`${
                          import.meta.env.VITE_SERVER_URL
                        }/images/${item}`}
                        className="w-full rounded-2xl object-cover"
                        alt="product detail 1"
                      />
                    ))}
                  </Carousel>
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
                <SectionContentProductDetail product={productDetail} />
              </div>
            </div>

            <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
              <div className="">
                <h2 className="text-2xl font-semibold">Description</h2>
                <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
                  {parse(productDetail.description)}
                </div>
              </div>
              <hr className="border-slate-200 dark:border-slate-700" />
            </div>
          </main>
        </div>
      )}
    </>
  );
}
