import TableVariant from "./table_variant/TableVariant";
import VariantCreateDialog from "./create/VariantCreateDialog";

export default function VariantPage() {
  return (
    <div>
      <div className="flex justify-end">
        <VariantCreateDialog />
      </div>
      <TableVariant />
    </div>
  );
}
