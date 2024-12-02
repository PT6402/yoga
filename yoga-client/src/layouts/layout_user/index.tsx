import { Outlet } from "react-router-dom";
import HeaderApp from "./HeaderApp";
import FooterApp from "./FooterApp";
import { useEffect, useState } from "react";
import { useLoadFirst } from "../../hooks/useLoadFirst";
import "sweetalert2/src/sweetalert2.scss";
export default function LayoutUser() {
  const { load } = useLoadFirst();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    load().then((status) => {
      if (status) {
        setLoading(false);
      }
    });
  }, []);
  if (loading) return <>loading</>;
  return (
    <>
      <HeaderApp />
      <Outlet />
      <FooterApp />
    </>
  );
}
