import BodyTableCategory from "./BodyTableCategory";
import HeadTableCategory from "./HeadTableCategory";

export default function TableCategory() {
  return (
    <>
      <div className="overflow-x-auto relative shadow-md rounded-xl border w-fit mx-auto">
        <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
          <HeadTableCategory />
          <BodyTableCategory />
        </table>
      </div>
    </>
  );
}
