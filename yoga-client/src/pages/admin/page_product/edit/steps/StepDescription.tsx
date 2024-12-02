import { useState } from "react";
import ButtonSecondary from "../../../../../shared/Button/ButtonSecondary";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../context/store";
import { useParams } from "react-router-dom";
import { useProductAdmin } from "../../../../../hooks/admin";
import { TextEditor } from "../../common/TextEditor";

export default function StepDescription() {
  const { id: productId } = useParams();
  const { product } = useSelector((state: RootState) => state.product);
  const [description, setDescription] = useState<string>("");
  const { updateDescriton, getOneProduct } = useProductAdmin();
  const handleUpdateDescription = () => {
    updateDescriton({ productId: Number(productId), value: description }).then(
      async (res) => {
        if (res) {
          await getOneProduct(Number(productId));
        }
      }
    );
  };
  return (
    <>
      <div className="mt-5 flex justify-end">
        <div className="flex gap-2 ">
          <ButtonSecondary
            sizeClass="py-2 px-7 "
            fontSize="text-sm font-medium"
            className="!bg-slate-800 mt-5 sm:mt-0 sm:ml-auto !rounded-lg text-white !ring-transparent"
            onClick={handleUpdateDescription}
          >
            Update description
          </ButtonSecondary>
        </div>
      </div>
      <TextEditor
        handleOnChange={(value) => setDescription(value)}
        initText={product?.description}
      />
    </>
  );
}
