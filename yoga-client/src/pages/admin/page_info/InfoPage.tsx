import FormBank from "./FormBank";
import FormInfo from "./FormInfo";

export default function InfoPage() {
  return (
    <div className="flex flex-col justify-center gap-3 mt-10">
      <FormBank />
      <FormInfo />
    </div>
  );
}
