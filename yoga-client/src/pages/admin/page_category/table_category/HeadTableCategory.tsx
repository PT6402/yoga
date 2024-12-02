export default function HeadTableCategory() {
  return (
    <>
      <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="py-3 px-6">
            Name category
          </th>
          {/* <th scope="col" className="py-3 px-6">
            Product References
          </th> */}
          <th scope="col" className="py-3 px-6">
            Action
          </th>
        </tr>
      </thead>
    </>
  );
}
