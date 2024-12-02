import { Button } from "@material-tailwind/react";

import ButtonSecondary from "../../../../../shared/Button/ButtonSecondary";
import { useForm } from "../context/FormContext";
import { FormCreateType } from "../context/FormContants";
import { ChangeEvent, useState } from "react";
import { DataImage } from "../context/type_context";
import { isImage } from "../../../../../utils/checkFileUpload";
import toast from "react-hot-toast";
import ImageItem from "../common/ImageItem";

export default function StepImage() {
  const { dispatch, state } = useForm();
  const [listImage, setListImage] = useState<DataImage[]>(state.dataImage);
  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length > 0) {
      const listFile = [...e.target.files];
      for (let i = 0; i < listFile.length; i++) {
        if (listFile[i] && isImage(listFile[i].name)) {
          const image = listImage.some(
            (im) => im.nameImage == listFile[i].name
          );
          if (!image) {
            setListImage((prev) => [
              ...prev,
              {
                file: listFile[i],
                nameImage: listFile[i].name,
                urlImage: URL.createObjectURL(listFile[i]),
              },
            ]);
          }
        }
      }
    }
  };
  const handleRemoveImage = (nameImage: string) => {
    const item = listImage.find((img) => img.nameImage == nameImage);
    if (item) {
      URL.revokeObjectURL(item.urlImage);
      const newList = listImage.filter((img) => img.nameImage != nameImage);
      setListImage(newList);
    }
  };
  const handleChangeStep = (type: FormCreateType) => {
    if (listImage.length > 0) {
      dispatch({
        type: FormCreateType.SET_DATA_IMAGE,
        payload: listImage,
      });
      dispatch({ type: type });
    } else {
      toast.error("upload a image required");
    }
  };
  return (
    <>
      <div className="flex justify-between mt-5 mb-5">
        <div className="relative w-fit ">
          <input
            type="file"
            onChange={handleUploadImage}
            className="absolute w-full h-full z-10 opacity-0 "
            multiple
          />

          <Button
            variant="filled"
            className=" w-fit self-start "
            color="light-green"
          >
            Upload
          </Button>
        </div>

        <div className="flex gap-2">
          <ButtonSecondary
            sizeClass="py-2 px-7 "
            fontSize="text-sm font-medium"
            className="!bg-transparent mt-5 sm:mt-0 sm:ml-auto !rounded-lg text-slate-800 !ring-transparent border-2 border-slate-800 "
            onClick={() => {
              handleChangeStep(FormCreateType.PREV_STEP);
            }}
          >
            Back
          </ButtonSecondary>
          <ButtonSecondary
            sizeClass="py-2 px-7 "
            fontSize="text-sm font-medium"
            className="!bg-slate-800 mt-5 sm:mt-0 sm:ml-auto !rounded-lg text-white !ring-transparent"
            onClick={() => {
              handleChangeStep(FormCreateType.NEXT_STEP);
            }}
          >
            Next
          </ButtonSecondary>
        </div>
      </div>
      <div className="gallery">
        {listImage.length > 0 &&
          listImage.map((item) => (
            <ImageItem
              item={item}
              key={item.urlImage}
              handleRemoveItem={handleRemoveImage}
            />
          ))}
      </div>
    </>
  );
}
