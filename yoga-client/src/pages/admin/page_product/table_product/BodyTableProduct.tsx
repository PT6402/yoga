import { Button, Chip, Switch } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../context/store";
import { useProductAdmin } from "../../../../hooks/admin";
import ImageItem from "../../common/ImageItem";
import { formatPriceMinMax } from "../../../../utils/productUtil";
import Swal from "sweetalert2";

export default function BodyTableProduct() {
  const { products_admin } = useSelector((state: RootState) => state.product);
  const navigate = useNavigate();
  const { updateStatus, removeProduct } = useProductAdmin();
  const Image = ({ src }: { src: string }) => ImageItem({ srcImage: src });
  const handleRemove = (id: number) => {
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
        removeProduct(id).then((status) => {
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
    <>
      <tbody>
        {products_admin.length > 0 &&
          products_admin.map((item) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={item.id}
            >
              <td className="py-4 px-6">
                <div className="flex items-center">
                  <div className="relative inline-block shrink-0 rounded-2xl me-3">
                    <Image src={item.image} />
                  </div>
                  <div className="flex flex-col justify-start">
                    <a className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">
                      {item.name}
                    </a>
                  </div>
                </div>
              </td>
              {/* <td className="py-4 px-6">Thảm tập</td> */}
              <td className="py-4 px-6">
                <Chip
                  variant="ghost"
                  value={formatPriceMinMax(item.price)}
                  color="gray"
                  className="text-md w-fit"
                />
              </td>
              <td className="py-4 px-6">{item.brand}</td>
              <td className="py-4 px-6">
                <Switch
                  defaultChecked={item.status}
                  style={{ backgroundImage: "none" }}
                  ripple={true}
                  className="h-full w-full !ring-transparent checked:!bg-red-500 !border-none  "
                  containerProps={{
                    className: "w-11 h-6  ",
                  }}
                  circleProps={{
                    className: " left-0.5 border-none ",
                  }}
                  crossOrigin={undefined}
                  onChange={() => updateStatus(item.id)}
                />
              </td>
              <td className="py-4 px-6">
                <div className="flex gap-2">
                  <Button
                    variant="outlined"
                    className="border-gray-800 text-black"
                    onClick={() => navigate(`/admin/product/info/${item.id}`)}
                  >
                    Info
                  </Button>
                  <Button
                    variant="filled"
                    className="bg-red-500 !shadow-gray-300"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
}
