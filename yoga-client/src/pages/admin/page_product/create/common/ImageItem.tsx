import { XCircleIcon } from "@heroicons/react/24/solid";
import { DataImage } from "../context/type_context";

interface Props {
  item: DataImage;
  handleRemoveItem: (nameImage: string) => void;
}
export default function ImageItem({ item, handleRemoveItem }: Props) {
  return (
    <>
      <div className="!z-5 relative border-2  rounded-[20px] max-w-[300px] bg-white bg-clip-border shadow-3xl shadow-shadow-500  flex-col w-full !p-2 3xl:p-![18px] pics m-2">
        <div className="h-full w-full">
          <div className="relative w-full">
            <img
              src={item.urlImage}
              className=" h-full w-full rounded-xl 3xl:h-full 3xl:w-full "
            />
            <button className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white text-brand-500 hover:cursor-pointer">
              <XCircleIcon
                className="w-7 h-7 text-red-400"
                onClick={() => handleRemoveItem(item.nameImage)}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
