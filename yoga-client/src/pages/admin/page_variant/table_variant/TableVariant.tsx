import BodyTableVariant from "./BodyTableVariant";
import HeadTableVariant from "./HeadTableVariant";

export default function TableVariant() {
  return (
    <div className=" relative shadow-md sm:rounded-lg border overflow-hidden mt-5">
      <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
        <HeadTableVariant />
        <BodyTableVariant />
      </table>
    </div>
  );
}
