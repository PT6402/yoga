import { ChangeEvent, useEffect, useState } from "react";
import { useCategoryAdmin } from "../../../../hooks/admin";
import { Category } from "../../../../context/type_stores";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Input from "../../../../shared/Input";

interface CategoryState {
  file: File | null;
  urlImage: string;
}
interface Props {
  item: Category;
  handleClose: () => void;
}
export default function FormEditCategory({ item, handleClose }: Props) {
  const { updateCategory, getAllCategoryByAdmin } = useCategoryAdmin();
  const [inputName, setInputName] = useState(item.name!);
  const [fileImage, setFileImage] = useState<CategoryState>({
    file: null,
    urlImage: `${import.meta.env.VITE_SERVER_URL}/images/${item.image!}`,
  });
  const handleChangeFileImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const urlImage = URL.createObjectURL(file);
      setFileImage({ file, urlImage });
    }
  };
  const handleSubmit = () => {
    if (fileImage && inputName.trim() != "") {
      updateCategory({
        id: item.id!,
        nameUpdate: inputName,
        file: fileImage.file || null,
      }).then(async (status) => {
        if (status) {
          setInputName("");
          await getAllCategoryByAdmin();
          handleClose();
        }
      });
    }
  };
  useEffect(() => {
    if (!fileImage?.file || !fileImage?.urlImage) {
      setFileImage({
        file: null,
        urlImage: `${import.meta.env.VITE_SERVER_URL}/images/${item.image!}`,
      });
    }
    return () => {
      if (fileImage?.urlImage && fileImage?.file) {
        URL.revokeObjectURL(fileImage.urlImage);
      }
    };
  }, []);
  return (
    <>
      <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 relative max-h-fit">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-0 right-0"
        >
          <div className="flex-1 text-start  w-fit p-1 rounded-bl-lg rounded-tr-md  bg-red-400">
            <XMarkIcon className="w-6 h-6 text-white" />
          </div>
        </button>
        <div className="flex flex-row justify-between items-center border-b border-slate-200 pb-2 ">
          <div>
            <Input
              className="rounded-md !ring-transparent !border-gray-600 focus:outline-gray-600 focus:!border-transparent "
              placeholder="enter name category ..."
              onChange={(e) => setInputName(e.target.value)}
              value={inputName}
            />
          </div>
          <div className="inline-flex space-x-2 items-center">
            <button
              className=" py-3 px-4 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-white bg-green-400"
              onClick={handleSubmit}
            >
              <span className="text-sm font-medium hidden md:block">
                Update
              </span>
            </button>
          </div>
        </div>
        <div
          className="w-full relative border-2 border-gray-300 border-dashed rounded-lg p-6 mx-auto mt-2 h-full "
          id="dropzone"
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 z-20"
            onChange={handleChangeFileImage}
          />
          {fileImage && (
            <div className="absolute inset-0 w-full h-full bg-white z-10">
              <img
                className="mx-auto w-full h-full object-contain"
                src={fileImage.urlImage}
              />
            </div>
          )}
          <div className="text-center">
            <img
              className="mx-auto h-12 w-12"
              src="https://www.svgrepo.com/show/357902/image-upload.svg"
            />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              <label htmlFor="file-upload" className="relative cursor-pointer">
                <span>Drag and drop or </span>
                <span className="text-indigo-600 hover:!underline px-2 cursor-pointer font-bold text-xl">
                  browse
                </span>
                <span>to upload</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleChangeFileImage}
                />
              </label>
            </h3>
            <p className="mt-1 text-xs text-gray-500">PNG, JPG</p>
          </div>
        </div>
      </div>
    </>
  );
}
