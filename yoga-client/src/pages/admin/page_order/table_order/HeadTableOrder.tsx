export default function HeadTableOrder() {
  return (
    <>
      <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="py-3 px-6">
            ID
          </th>
          <th scope="col" className="py-3 px-6">
            Phone
          </th>
          <th scope="col" className="py-3 px-6">
            Name
          </th>
          <th scope="col" className="py-3 px-6">
            Total price
          </th>
          <th scope="col" className="py-3 px-6">
            Time
          </th>
          <th scope="col" className="py-3 px-6">
            Action
          </th>
        </tr>
      </thead>
    </>
  );
}
