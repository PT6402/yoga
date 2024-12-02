/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormCreateType } from "./FormContants";
import { initialFormCreateState } from "./FormContext";
import {
  DataImage,
  DataInfo,
  DataVariant,
  FormCreateState,
} from "./type_context";

export interface FormCreateAction {
  type: FormCreateType;
  payload?: FormCreateState | DataInfo | DataVariant[] | DataImage[] | string;
}
export default function formReducer(
  state: FormCreateState,
  action: FormCreateAction
) {
  const { type, payload } = action;
  switch (type) {
    case FormCreateType.NEXT_STEP: {
      return {
        ...state,
        currentStep: (state.currentStep += 1),
      };
    }
    case FormCreateType.PREV_STEP: {
      return {
        ...state,
        currentStep: (state.currentStep -= 1),
      };
    }
    case FormCreateType.CLEAR_ALL: {
      // console.log("clear");
      return { ...initialFormCreateState };
    }

    //DATA INFOR
    case FormCreateType.SET_DATA_INFO: {
      return {
        ...state,
        dataInfo: payload,
      } as FormCreateState;
    }

    case FormCreateType.SET_DATA_VARIANT: {
      return {
        ...state,
        dataVariant: payload,
      } as FormCreateState;
    }
    case FormCreateType.SET_DATA_IMAGE: {
      return {
        ...state,
        dataImage: payload,
      } as FormCreateState;
    }
    case FormCreateType.SET_DATA_DESCRIPTION: {
      return {
        ...state,
        dataDescription: payload,
      } as FormCreateState;
    }
    default:
      return state;
  }
}
