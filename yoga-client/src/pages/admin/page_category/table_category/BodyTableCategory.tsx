import { Button } from "@material-tailwind/react";

import CategoryEditDialog from "../edit/CategoryEditDialog";
import { useSelector } from "react-redux";
import { RootState } from "../../../../context/store";
import { useCategoryAdmin } from "../../../../hooks/admin";
import ImageItem from "../../common/ImageItem";
import Swal from "sweetalert2";

export default function BodyTableCategory() {
  const { data_admin } = useSelector((state: RootState) => state.category);
  const { removeCategory, getAllCategoryByAdmin } = useCategoryAdmin();
  const handleRemove = ({ id }: { id: number | undefined }) => {
    if (id != undefined) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          removeCategory({ id }).then(async (status) => {
            if (status) {
              await getAllCategoryByAdmin().then((status) => {
                if (status) {
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your item has been deleted.",
                    icon: "success",
                  });
                }
              });
            }
          });
        }
      });
    }
  };
  const Image = ({ src }: { src: string }) => ImageItem({ srcImage: src });
  return (
    <>
      <tbody>
        {data_admin.length > 0 &&
          data_admin.map((item) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={item.id}
            >
              <td className="py- px-6 w-[20rem]">
                <div className="flex items-center my-2">
                  <div className="relative inline-block shrink-0 rounded-2xl me-3">
                    <Image src={item.image!} />
                  </div>
                  <div className="flex flex-col justify-start">
                    <a className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
                      {item.name}
                    </a>
                  </div>
                </div>
              </td>
              {/* <td className="py-4 px-6 ">
                <div className="flex items-center gap-2">
                  <Chip
                    variant="ghost"
                    value={item.referenceProduct}
                    color="gray"
                    className="text-md w-fit"
                  />
                  products
                </div>
              </td> */}

              <td className="py-4 px-6 ">
                <div className="flex gap-2 w-fit">
                  <CategoryEditDialog item={item} />
                  {item.referenceProduct == 0 && (
                    <Button
                      variant="filled"
                      className="bg-red-500 !shadow-gray-300"
                      onClick={() => handleRemove({ id: item.id })}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
}
