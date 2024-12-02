import { HttpStatusCode } from "axios";
import http, { handleError, ResultUtil } from "../../utils/http";
import { useDispatch } from "react-redux";
import { setInfoAppStore } from "../../context/slice.ui";
import { InfoApp } from "../../context/type_stores";

export default function useInfoApp() {
  const dispatch = useDispatch();
  const urlInfoApp = "/infoApp";
  const getInfo = async () => {
    try {
      const res = await http.get<ResultUtil<InfoApp>>(urlInfoApp);
      if (res.status == HttpStatusCode.Ok && res.data.model) {
        dispatch(setInfoAppStore(res.data.model));
      }
    } catch (error) {
      handleError(error);
      console.log(error);
    }
  };
  return { getInfo };
}
