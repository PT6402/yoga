import { useSelector } from "react-redux";
import { RootState } from "../../../../context/store";
import { Button, Chip } from "@material-tailwind/react";
import { formatPrice } from "../../../../utils/productUtil";
import { useNavigate } from "react-router-dom";
import useOrderAdmin from "../../../../hooks/admin/useOrderAdmin";
import Swal from "sweetalert2";
export default function BodyTableOrder() {
  const { dataAdmin } = useSelector((state: RootState) => state.order);
  const navigate = useNavigate();
  const { removeOrder } = useOrderAdmin();
  const handleRemoveOrder = (id: number) => {
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
        removeOrder(id).then((status) => {
          if (status) {
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success",
            }).then(() => {
              navigate("/admin/order");
            });
          }
        });
      }
    });
  };

  return (
    <tbody>
      {dataAdmin.length > 0 &&
        dataAdmin.map((item) => (
          <tr className="bg-white border-b " key={item.id}>
            <td className="w-fit">
              <div
                className={`border-l-8 ${
                  item.readStatus ? "border-gray-500" : "border-red-500"
                }  flex items-center justify-center h-20`}
              >
                {item.id}
              </div>
            </td>
            <td className="py- px-6 w-fit]">{item.phone}</td>

            <td className="py-4 px-6">{item.fullname}</td>

            <td className="py-4 px-6 ">
              <Chip
                variant="ghost"
                className="w-fit"
                value={`${formatPrice(item.totalPrice)}
                  vnd `}
              />
            </td>
            <td className="py-4 px-6 w-fit">
              <p>{item.time}</p>
            </td>
            <td className="py-4 px-6 w-fit">
              <div className="flex items-center gap-2">
                <Button
                  variant="outlined"
                  className=" !shadow-gray-300"
                  onClick={() => navigate(`/admin/order/detail/${item.id}`)}
                >
                  Detail
                </Button>
                <Button
                  variant="filled"
                  className="bg-red-500 !shadow-gray-300"
                  onClick={() => handleRemoveOrder(item.id)}
                >
                  Remove
                </Button>
              </div>
            </td>
          </tr>
        ))}
    </tbody>
  );
}
