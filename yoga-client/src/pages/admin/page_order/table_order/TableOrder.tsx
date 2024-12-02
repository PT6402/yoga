import BodyTableOrder from "./BodyTableOrder";
import HeadTableOrder from "./HeadTableOrder";

export default function TableOrder() {
  return (
    <div className=" relative shadow-md sm:rounded-lg border overflow-hidden mt-5">
      <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
        <HeadTableOrder />
        <BodyTableOrder />
      </table>
    </div>
  );
}
