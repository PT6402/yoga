import FormBodyChange from "./FormBodyChange";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid";

export default function ChangePassPage() {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen  text-gray-900 flex justify-center"
      style={{ background: "linear-gradient(135deg, #f5af19, #f12711)" }}
    >
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 relative items-center">
        <div
          className="absolute left-5 top-5 shadow-md p-2 rounded-xl border w-fit h-fit cursor-pointer hover:shadow-lg hover:border-gray-300 duration-100"
          onClick={() => navigate(-1)}
        >
          <HomeIcon className=" w-8 h-8" />
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Change password
            </h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <FormBodyChange />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
