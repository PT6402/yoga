import TableCategory from "./table_category/TableCategory";
import CategoryCreateDialog from "./create/CategoryCreateDialog";
export default function CategoryPage() {
  return (
    <div className="my-5 flex flex-col">
      <div className="self-end mb-5 flex gap-3">
        <CategoryCreateDialog />
      </div>

      <TableCategory />
    </div>
  );
}
