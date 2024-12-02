import { useDispatch, useSelector } from "react-redux";
import { Page } from "../../routes/types";
import { RootState } from "../../context/store";
import { Link } from "react-router-dom";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { setOpenSideNav } from "../../context/slice.ui";
import { NavLink } from "react-router-dom";

interface Props {
  routes: Page[];
}
export default function SideNav({ routes }: Props) {
  const dispatch = useDispatch();
  const { openSidenav } = useSelector((state: RootState) => state.uiApp);
  return (
    <aside
      className={`bg-white shadow-sm ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative`}>
        <Link to="/" className="py-6 px-8 text-center">
          <Typography variant="h6" color={"black"}>
            Yoga
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => dispatch(setOpenSideNav(false))}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-black" />
        </IconButton>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          {routes.map(({ icon, name, path_admin }, i) => (
            <li key={i}>
              <NavLink
                to={`/admin${path_admin == undefined ? "" : "/" + path_admin}`}
              >
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "filled" : "text"}
                    color={isActive ? "blue-gray" : "blue-gray"}
                    className="flex items-center gap-4 px-4 capitalize "
                    onClick={() => dispatch(setOpenSideNav(false))}
                    fullWidth
                  >
                    {icon}
                    <Typography
                      color="inherit"
                      className="font-medium capitalize"
                    >
                      {name}
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
