import ButtonSecondary from "../../../../../shared/Button/ButtonSecondary";
import { FormCreateType } from "../context/FormContants";
import { useForm } from "../context/FormContext";
import { TextEditor } from "../../common/TextEditor";
import { useState } from "react";

export default function StepDescription() {
  const { dispatch, state } = useForm();
  const [description, setDescription] = useState<string>();

  return (
    <>
      <div className="mt-5 flex justify-end">
        <div className="flex gap-2 ">
          <ButtonSecondary
            sizeClass="py-2 px-7 "
            fontSize="text-sm font-medium"
            className="!bg-transparent mt-5 sm:mt-0 sm:ml-auto !rounded-lg text-slate-800 !ring-transparent border-2 border-slate-800 "
            onClick={() => {
              dispatch({
                type: FormCreateType.SET_DATA_DESCRIPTION,
                payload: description,
              });
              dispatch({ type: FormCreateType.PREV_STEP });
            }}
          >
            Back
          </ButtonSecondary>
          <ButtonSecondary
            sizeClass="py-2 px-7 "
            fontSize="text-sm font-medium"
            className="!bg-slate-800 mt-5 sm:mt-0 sm:ml-auto !rounded-lg text-white !ring-transparent"
            onClick={() => {
              dispatch({
                type: FormCreateType.SET_DATA_DESCRIPTION,
                payload: description,
              });
              dispatch({ type: FormCreateType.NEXT_STEP });
            }}
          >
            Next
          </ButtonSecondary>
        </div>
      </div>
      <TextEditor
        handleOnChange={(value) => setDescription(value)}
        initText={state.dataDescription}
      />
    </>
  );
}
