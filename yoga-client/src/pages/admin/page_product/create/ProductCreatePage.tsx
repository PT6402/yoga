import { useEffect } from "react";
import { FormProvider, useForm } from "./context/FormContext";
import {
  StepDescription,
  StepImage,
  StepInfo,
  StepOverview,
  StepVariant,
} from "./steps";
import { FormCreateType } from "./context/FormContants";

function FormCreateProduct() {
  const { state, dispatch } = useForm();
  console.log(state);
  useEffect(() => {
    dispatch({ type: FormCreateType.CLEAR_ALL });
  }, []);
  function renderStep() {
    switch (state.currentStep) {
      case 1:
        return <StepInfo />;
      case 2:
        return <StepVariant />;
      case 3:
        return <StepImage />;
      case 4:
        return <StepDescription />;
      case 5:
        return <StepOverview />;
    }
  }
  return <div>{renderStep()}</div>;
}
export default function ProductCreatePage() {
  return (
    <FormProvider>
      <FormCreateProduct />
    </FormProvider>
  );
}
