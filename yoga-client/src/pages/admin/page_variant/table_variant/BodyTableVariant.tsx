import { Button, Chip } from "@material-tailwind/react";
import VariantUpdateDialog from "../edit/VariantEditDialog";
import { useSelector } from "react-redux";
import { RootState } from "../../../../context/store";
import { useVariantAdmin } from "../../../../hooks/admin";
import Swal from "sweetalert2";

export default function BodyTableVariant() {
  const { data } = useSelector((state: RootState) => state.variant);
  const { removeVariant, getAllVariant } = useVariantAdmin();
  const handleRemoveVariant = (id?: number | null) => {
    if (id) {
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
          removeVariant(id).then(async (status) => {
            if (status) {
              await getAllVariant();
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
  };

  return (
    <>
      <tbody>
        {data.length > 0 &&
          data.map((item) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={item.id}
            >
              <td className="py- px-6 w-[20rem]">{item.name}</td>

              <td className="py-4 px-6">
                <div className="flex flex-row gap-2 flex-wrap">
                  {item.values &&
                    item.values.length > 0 &&
                    item.values.map((itemChild) => (
                      <Chip
                        value={itemChild.value}
                        variant="outlined"
                        key={itemChild.id}
                        className="w-fit"
                      />
                    ))}
                </div>
              </td>

              {/* <td className="py-4 px-6 ">
                <div className="flex items-center gap-2">
                  <Chip
                    value={item.referenceProduct}
                    variant="ghost"
                    color="gray"
                    className="text-md mr-2 w-fit"
                  />
                  products
                </div>
              </td> */}

              <td className="py-4 px-6 w-fit">
                <div className="flex items-center gap-2">
                  <VariantUpdateDialog variant={item} />
                  {item.referenceProduct == 0 && (
                    <Button
                      variant="filled"
                      className="bg-red-500 !shadow-gray-300"
                      onClick={() => handleRemoveVariant(item.id)}
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
