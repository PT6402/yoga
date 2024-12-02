import BodyTableProduct from "./BodyTableProduct";
import HeadTableProduct from "./HeadTableProduct";

export default function ProductTable() {
  return (
    <div className=" relative shadow-md sm:rounded-lg border overflow-hidden mt-5">
      <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
        <HeadTableProduct />
        <BodyTableProduct />
      </table>
    </div>
  );
}
