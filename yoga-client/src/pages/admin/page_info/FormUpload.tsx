import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../context/store";

interface LogoState {
  file: File | null;
  urlImage?: string;
}
interface Props {
  title: string;
  handleGetValue: (fileImage: File) => void;
}
export default function FormUpload({ handleGetValue, title }: Props) {
  const { infoApp } = useSelector((state: RootState) => state.uiApp);
  const [fileImage, setFileImage] = useState<LogoState>(() => {
    if (infoApp) {
      if (title == "Logo" && infoApp.logoApp) {
        return {
          file: null,
          urlImage: `${import.meta.env.VITE_SERVER_URL}/info_app/${
            infoApp.logoApp
          }`,
        };
      } else if (title == "QRCode" && infoApp.bankQRCode) {
        return {
          file: null,
          urlImage: `${import.meta.env.VITE_SERVER_URL}/info_app/${
            infoApp.bankQRCode
          }`,
        };
      } else {
        return {
          file: null,
          urlImage: undefined,
        };
      }
    } else {
      return {
        file: null,
        urlImage: undefined,
      };
    }
  });
  const handleChangeFileImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const urlImage = URL.createObjectURL(file);
      setFileImage({ file, urlImage });
      if (file) {
        handleGetValue(file);
      }
    }
  };
  useEffect(() => {
    return () => {
      if (fileImage?.urlImage && fileImage?.file) {
        URL.revokeObjectURL(fileImage.urlImage);
      }
    };
  }, []);
  return (
    <>
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300 overflow-hidden ">
        <div className="flex flex-row justify-end items-center border-b border-slate-200 pb-2 ">
          <div className="inline-flex space-x-2 items-center relative ">
            <button className=" py-3 px-4 border border-slate-200 rounded-md inline-flex space-x-1 items-center text-white bg-green-400">
              <span className="text-sm font-medium">Upload {title}</span>
            </button>
            <input
              id={`file-upload-${title}`}
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 z-20 top-0 left-0"
              onChange={handleChangeFileImage}
            />
          </div>
        </div>
        <div className="w-full relative rounded-lg p-6 mx-auto mt-2 overflow-hidden">
          {/* <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 z-20 top-0 left-0"
            onChange={handleChangeFileImage}
          /> */}
          {fileImage.urlImage && (
            <div className="absolute inset-0 w-full  bg-white z-10">
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
              <label
                htmlFor={`file-upload-${title}`}
                className="relative cursor-pointer"
              >
                <span>Drag and drop or </span>
                <span className="text-indigo-600 hover:!underline px-2 cursor-pointer font-bold text-xl">
                  browse
                </span>
                <span>to upload</span>
                <input
                  id={`file-upload-${title}`}
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
