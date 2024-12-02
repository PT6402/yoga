import { Button } from "@material-tailwind/react";
import ImageItem from "../common/ImageItem";
import { ChangeEvent, useEffect, useState } from "react";
import { ProductImage } from "../../../../../context/type_stores";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../context/store";
import {
  extractFileNamePart,
  isImage,
} from "../../../../../utils/checkFileUpload";
import { useParams } from "react-router-dom";
import { useProductAdmin } from "../../../../../hooks/admin";

export default function StepImage() {
  const { id: productId } = useParams();
  const { product_image } = useSelector((state: RootState) => state.product);
  const { uploadImage, getOneProduct, removeImage } = useProductAdmin();
  const [listImage, setListImage] = useState<ProductImage[]>(product_image);
  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length > 0) {
      const listFile = [...e.target.files];
      if (listFile[0] && isImage(listFile[0].name)) {
        const image = listImage.some(
          (im) => extractFileNamePart(im.src) == listFile[0].name
        );
        if (!image) {
          uploadImage({ productId: Number(productId), file: listFile[0] }).then(
            async (res) => {
              if (res) {
                await getOneProduct(Number(productId));
              }
            }
          );
        }
      }
    }
  };
  const handleRemoveImage = (id: number) => {
    removeImage(id).then(async (res) => {
      if (res) {
        await getOneProduct(Number(productId));
      }
    });
  };
  useEffect(() => {
    setListImage([...product_image]);
  }, [product_image]);
  return (
    <div>
      <div className="flex justify-start mt-5 mb-5">
        <div className="relative w-fit ">
          <input
            type="file"
            onChange={handleUploadImage}
            className="absolute w-full h-full z-10 opacity-0 "
          />

          <Button
            variant="filled"
            className=" w-fit self-start "
            color="light-green"
          >
            Upload
          </Button>
        </div>
      </div>
      <div className="gallery">
        {listImage.length > 0 &&
          listImage.map((item) => (
            <ImageItem
              item={item}
              key={item.id}
              handleRemoveItem={handleRemoveImage}
            />
          ))}
      </div>
    </div>
  );
}
