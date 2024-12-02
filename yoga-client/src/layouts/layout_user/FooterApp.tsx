import { DevicePhoneMobileIcon } from "@heroicons/react/24/solid";
import { CustomLink } from "../../data/types";
import Logo from "../../shared/Logo";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

export default function FooterApp() {
  const { infoApp } = useSelector((state: RootState) => state.uiApp);
  return (
    <>
      <footer>
        <div className="w-full flex-col px-6 pt-20 lg:flex lg:px-10 xl:px-24 mx-auto max-w-[90rem] ">
          <div className="text-zinc-600 cursor-default lg:flex lg:flex-row lg:gap-x-16">
            <div>
              {
                <Logo
                  img={
                    (infoApp &&
                      infoApp.logoApp &&
                      `${import.meta.env.VITE_SERVER_URL}/info_app/${
                        infoApp.logoApp
                      }`) ||
                    undefined
                  }
                />
              }
              <p className="w-72">
                {(infoApp && infoApp.sloganApp) ||
                  " Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem at ipsam necessitatibus dolor ratione."}
              </p>
            </div>
            <div className="mt-4 md:mt-0 lg:mt-0 flex flex-row flex-wrap lg:flex-nowrap lg:justify-center gap-4 lg:gap-x-24">
              <div className="flex flex-col">
                <h2 className="font-mono font-bold text-zinc-700 text-lg">
                  Contact
                </h2>
                <ul className="mt-4 grid gap-2 ">
                  <li className="flex items-start text-sm">
                    <span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 1024 1024"
                        className="w-4 h-4 mr-1 mt-1 fill-zinc-600"
                        preserveAspectRatio="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M702.229 505.85l257.369 208.406V297.444zM599.854 588.749c-25.344 20.528-56.423 30.791-87.498 30.791-31.08 0-62.155-10.264-87.513-30.796l-53.778-43.556L65.846 792.386c2.945 22.208 13.831 41.923 29.75 56.193 7.592 6.805 16.341 12.319 25.868 16.329 10.846 4.566 22.712 7.164 35.207 7.164h711.225c15.817 0 30.632-4.139 43.612-11.24 9.122-4.99 17.365-11.399 24.295-19.056 12.221-13.502 20.449-30.628 22.931-49.554l-305.078-247.04-53.802 43.567zM64.969 297.272v417.157l257.529-208.577z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M419.633 505.853l43.688 35.383c28.408 23.005 69.652 23.005 98.061 0l43.699-35.386 48.574-39.333 303.38-245.664c-9.591-40.379-45.87-70.543-89.139-70.543H156.671c-43.219 0-79.46 30.093-89.103 70.4l303.497 245.807 48.568 39.336z"
                        />
                      </svg>
                    </span>
                    <a className="text-left text-zinc-600 break-words hover:underline hover:text-zinc-800">
                      {(infoApp && infoApp.email) || " yoga@gmail.com"}
                    </a>
                  </li>
                  <li className="flex flex-row items-center">
                    <span>
                      <DevicePhoneMobileIcon className="w-5 h-5" />
                    </span>
                    <p className="font-inter">
                      {(infoApp && infoApp.phone) || "0123456789"}
                    </p>
                  </li>
                  <li className="flex flex-row items-center">
                    <span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 1024 1024"
                        className="w-5 h-5 mr-1 mt-1 fill-zinc-600"
                        preserveAspectRatio="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M513.2 898.3c-106.4 0-206.6-9.2-282.3-26.1-88.9-19.9-137.4-47.5-132-83.3 3.7-25 19.5-37.2 58.5-51.6 32.6-12 96.8-27.2 148.5-35.6 12-2 21.4 5.4 23.4 17.3 2 12-6.4 21-18.3 23-44.4 7.2-105.8 20.8-132 31.2-29 11.5-26.2 14.8-26.2 17 0 1.8 0.6 8.9 20.4 18.2 19.2 9 47 17.4 80.4 24.5 71.7 15 165.6 23.3 264.7 23.3 99 0 193-8.3 264.7-23.3 33.5-7 61.3-15.5 80.4-24.5 19.9-9.2 16.2-16.2 17-17.8-1-2-3.7-5.9-32.7-17.3-26.2-10.4-82.4-23.7-126.7-30.9-12-2-20.3-10.3-18.4-22.3 2-12 12.4-20.3 24.4-18.4 51.7 8.3 109 24.3 142 35.5 39.3 13.3 54.8 26.6 58.6 51.8 5.4 35.8-43.2 63.5-132.2 83.2-75.6 16.9-175.8 26.1-282.2 26.1z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M510.8 98.2c-134.1 0-239.5 108.4-239.3 242.4 0 4 0.1 8.2 0.3 12.3 1.4 28.6 10.2 57.2 21.4 83.4v0.1l17.9 34.5c1.5 2.9 148.7 277.2 165.1 303.1 9.2 14.5 24.6 20.7 35.5 20.7 10.6 0 27.6-5.7 35.3-20.7 12.3-24 175.8-303.1 175.8-303.1s15.2-26.2 18.7-34.6c13.4-31.7 18.9-49.2 20.3-83.7 0.1-3.6 0.2-9.4 0.2-12.3C761.9 206 644.9 98.2 510.8 98.2z m2.4 368.9c-74.2 0-134.3-60.1-134.3-134.3 0-74.2 60.1-134.3 134.3-134.3 74.2 0 134.3 60.1 134.3 134.3 0 74.2-60.1 134.3-134.3 134.3z"
                        />
                      </svg>
                    </span>
                    <p className="font-inter">
                      {(infoApp && infoApp.address) ||
                        "Quận 4, TP.HCM, Việt Nam"}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h2 className="font-mono font-bold text-zinc-700 text-lg">
                  Fanpage
                </h2>
                <ul className="mt-4 grid gap-2 grid-cols-2">
                  <li className="flex items-start text-sm">
                    <a
                      className="text-left text-zinc-600 break-words hover:underline hover:text-zinc-800"
                      href={(infoApp && infoApp.linkFanPage[1]) || "#"}
                    >
                      {(infoApp && infoApp.linkFanPage[0]) ||
                        "Fanpage.facebook.com"}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full mt-10 py-10 border-t border-zinc-200 font-inter text-center text-xs text-zinc-400">
            Copyright ©{/* */}2024
            {/* */}. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
