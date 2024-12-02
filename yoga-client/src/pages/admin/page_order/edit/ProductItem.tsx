import { Fragment, useState } from "react";
import Prices from "../../../../components/Prices";
import { ProductItemCartAdmin } from "../../../../context/type_stores";
import { Button } from "@material-tailwind/react";
import ModalQuickView from "../../../../components/ModalQuickView";
import { useOrderAdmin } from "../../../../hooks/admin";
import Swal from "sweetalert2";
interface Props {
  item: ProductItemCartAdmin;
  reloadPage: () => void;
}
export default function ProductItem({ item, reloadPage }: Props) {
  const { removeOrderItem } = useOrderAdmin();
  const [open, setOpen] = useState(false);
  const { price, quantity, name, image, variants, errors, productId } = item;
  const handleRemoveOrderItem = (id: number) => {
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
        removeOrderItem(id).then((status) => {
          reloadPage();
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
  };
  return (
    <div className="border-0 p-3 relative ">
      <ModalQuickView
        titleFunction={"update"}
        productId={productId}
        defaultItem={item}
        reloadPage={reloadPage}
        show={open}
        onCloseModalQuickView={() => setOpen(false)}
      />
      {
        <div
          className={`absolute top-0 left-0 ${
            errors.length > 0 ? "bg-gray-500 bg-opacity-65" : ""
          } w-full h-full z-10  rounded-xl flex flex-col items-end justify-start `}
        >
          {
            <div className="h-full flex flex-col justify-evenly mr-5">
              <div className="flex gap-2 justify-end justify-self-center">
                {!errors.includes("product not found") &&
                  !errors.includes("product status hidden") && (
                    <Button
                      variant="filled"
                      ripple={false}
                      onClick={() => setOpen(true)}
                    >
                      Update
                    </Button>
                  )}
                <Button
                  variant="filled"
                  ripple={false}
                  color="red"
                  onClick={() => handleRemoveOrderItem(item.id)}
                >
                  Remove
                </Button>
              </div>
              {errors.map((message, i) => (
                <p className="text-white text-lg font-bold " key={i}>
                  error "{message}"
                </p>
              ))}
            </div>
          }
        </div>
      }
      <div className="relative flex py-7 first:pt-0 last:pb-0  ">
        <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/images/${image}`}
            alt={name}
            className="h-full w-full object-contain object-center"
          />
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <h3 className="text-base font-semibold">{name}</h3>
                <div className="hidden flex-1 sm:flex justify-start">
                  <Prices price={price} className="mt-0.5" />
                </div>
                <div
                  className={`mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300`}
                >
                  {variants.map((item, index) => (
                    <Fragment key={index}>
                      <div className="flex items-center space-x-1.5">
                        <span className="">{item}</span>
                      </div>
                      {index != variants.length - 1 && (
                        <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            <div className="hidden sm:block text-center relative">
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500 dark:text-slate-400 flex items-center">
                  <span className="hidden sm:inline-block">Qty</span>
                  <span className="inline-block sm:hidden">x</span>
                  <span className="ml-2">{quantity}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
