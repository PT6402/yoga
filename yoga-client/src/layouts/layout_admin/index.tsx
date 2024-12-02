import { ThemeProvider } from "@material-tailwind/react";
import SideNav from "./side_nav";
import { page_route_admin_app } from "../../routes/page_route_app";
import DashBoardNavbar from "./dashboard_navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoadFirst } from "../../hooks/useLoadFirst";
import SockJS from "sockjs-client";
import Stomp, { Frame } from "stompjs";
import { useOrderAdmin } from "../../hooks/admin";
export default function LayoutAdmin() {
  const { loadAdmin } = useLoadFirst();
  const { getAllOrder } = useOrderAdmin();
  const [showLoading, setLoading] = useState<boolean>(true);
  const [stompClient, setStompClient] = useState<Stomp.Client>();
  useEffect(() => {
    loadAdmin().then((status) => {
      if (status) setLoading(false);
    });
  }, []);
  const onConnected = () => {
    if (stompClient !== undefined && stompClient !== null) {
      stompClient.subscribe("/queue", async (payload: Stomp.Message) => {
        if (payload.body == "update") {
          await getAllOrder();
        }
        // console.log(payload.body);
      });
    }
  };

  const onError = (error: Frame | string) => {
    console.log(error);
  };
  useEffect(() => {
    const sock = new SockJS(`${import.meta.env.VITE_SERVER_URL}/orderListener`);
    const client = Stomp.over(sock);
    setStompClient(client);
  }, []);
  useEffect(() => {
    if (stompClient !== undefined && stompClient !== null) {
      stompClient.connect({}, onConnected, onError);
    }
  }, [stompClient]);
  if (showLoading) return <>loadding</>;
  return (
    <>
      <ThemeProvider>
        <div className="min-h-screen bg-blue-gray-50/50">
          <SideNav routes={page_route_admin_app} />
          <div className="p-4 xl:ml-80">
            <DashBoardNavbar />
            <Outlet />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
