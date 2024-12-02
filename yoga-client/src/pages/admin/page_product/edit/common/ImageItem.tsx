import { XCircleIcon } from "@heroicons/react/24/solid";
import { ProductImage } from "../../../../../context/type_stores";
import { useEffect, useState } from "react";

interface Props {
  item: ProductImage;
  handleRemoveItem: (id: number) => void;
}
export default function ImageItem({ item, handleRemoveItem }: Props) {
  const [urlImage, setUrlImage] = useState(item.src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setUrlImage(item.src);
    setHasError(false); // Reset error state when item.src changes
  }, [item.src]);

  // Function to handle image error and reload component
  const handleImageError = () => {
    // console.log("Image failed to load, reloading component...");
    setHasError(true);
    setTimeout(() => {
      setUrlImage(item.src); // Attempt to reload the image
      setHasError(false);
    }, 100); // Optional delay before retrying
  };

  if (hasError) {
    return null; // Optionally, render a fallback UI or loader
  }

  return (
    <div className="!z-5 relative border-2 rounded-[20px] max-w-[300px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex-col w-full !p-2 3xl:p-![18px] pics m-2">
      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/images/${urlImage}`}
            className="h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
            onError={handleImageError}
            alt="Product"
          />
          <button
            className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white text-brand-500 hover:cursor-pointer"
            onClick={() => handleRemoveItem(item.id)}
          >
            <XCircleIcon className="w-7 h-7 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
