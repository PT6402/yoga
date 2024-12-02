import { useSelector } from "react-redux";
import { RootState } from "../context/store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const { isSigned } = useSelector((state: RootState) => state.user);
  if (isSigned) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
export default ProtectRoute;
