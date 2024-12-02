import { Button } from "@material-tailwind/react";
import ProductTable from "./table_product/ProductTable";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <Button
        variant="filled"
        className="py-3.5 w-fit mt-5 self-end "
        color="light-green"
        onClick={() => navigate("/admin/product/create")}
      >
        Create
      </Button>

      <ProductTable />
    </div>
  );
}
