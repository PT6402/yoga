import { createContext, Dispatch, useContext, useReducer } from "react";
import formReducer, { FormCreateAction } from "./FormReducer";
import { FormCreateState } from "./type_context";
export const initialFormCreateState: FormCreateState = {
  currentStep: 1,
  dataInfo: null,
  dataVariant: [],
  dataImage: [],
  dataDescription: "",
};
const FormContext = createContext<{
  state: FormCreateState;
  dispatch: Dispatch<FormCreateAction>;
}>({ state: initialFormCreateState, dispatch: () => null });
const FormProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(formReducer, initialFormCreateState);
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};
const useForm = () => useContext(FormContext);
export { FormContext, FormProvider, useForm };
