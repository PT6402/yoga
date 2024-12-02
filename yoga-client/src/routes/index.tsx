import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./scroll_to_top";
import { page_route_admin_app, page_route_app } from "./page_route_app";
import { AdminLayout, UserLayout } from "../layouts";
import { Fragment, useEffect, useState } from "react";
import LoginPage from "../pages/login_page/LoginPage";
import ProtectRoute from "./protect_route";
import ChangePassPage from "../pages/change_pass_page/ChangePassPage";
import { useHttpAuth } from "../utils/http";

export default function RouteApp() {
  const { handleRefreshToken } = useHttpAuth();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    handleRefreshToken().then(() => setLoad(false));
  }, []);
  if (load) return <>loading</>;
  return (
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1000,
        }}
      />
      <ScrollToTop />
      <Routes>
        <Route path="/" Component={UserLayout}>
          {page_route_app.map(({ component: Component, path }, index) => (
            <Route key={index} path={path} Component={Component} />
          ))}
        </Route>
        <Route path="/login" Component={LoginPage} />
        <Route path="/change-password" Component={ChangePassPage} />
        <Route Component={ProtectRoute}>
          <Route path="/admin/*" element={<AdminLayout />}>
            {page_route_admin_app.map(
              ({ path_admin, component, index, childs }, i) => {
                if (childs && childs.length > 0) {
                  return (
                    <Fragment key={i}>
                      <Route
                        path={path_admin}
                        Component={component}
                        index={index}
                      />
                      {childs.map(({ path, component }, ik) => (
                        <Route
                          path={`${path_admin}/${path}`}
                          Component={component}
                          key={ik}
                        />
                      ))}
                    </Fragment>
                  );
                } else {
                  return (
                    <Route
                      path={path_admin}
                      Component={component}
                      key={i}
                      index={index}
                    />
                  );
                }
              }
            )}
            <Route path="*" element={<Navigate to={"order"} replace />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
