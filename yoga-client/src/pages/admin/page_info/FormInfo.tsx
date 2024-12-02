import { Button } from "@material-tailwind/react";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { Formik, FormikProps } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../../context/store";
import Label from "../../../shared/Label";
import Input from "../../../shared/Input";
import Textarea from "../../../shared/Textare";
import FormUpload from "./FormUpload";
import toast from "react-hot-toast";
import useInfoAdmin from "../../../hooks/admin/useInfoAdmin";
import useInfoApp from "../../../hooks/user/useInfoApp";
export interface PayloadDataInfo {
  phone: string;
  email: string;
  address: string;
  linkFanPage: string;
  titleLinkFanPage: string;
  sloganApp: string;
}
export default function FormInfo() {
  const { updateInfo } = useInfoAdmin();
  const { getInfo } = useInfoApp();
  const formRef = useRef<FormikProps<PayloadDataInfo>>(null);
  const { infoApp } = useSelector((state: RootState) => state.uiApp);
  const [isEdit, setEdit] = useState(false);
  const [fileLogo, setFileLogo] = useState<File>();
  const handleUpdate = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string()
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, {
        message: "phone not match",
      })
      .required("Required"),
    address: Yup.string().required("Required"),
    titleLinkFanPage: Yup.string(),
    linkFanPage: Yup.string(),
    sloganApp: Yup.string(),
  });
  const handleSubmit = (e: PayloadDataInfo) => {
    console.log(fileLogo);
    if (infoApp && !infoApp.logoApp && !fileLogo) {
      toast.error("file logo require");
    } else {
      updateInfo({
        phone: e.phone,
        email: e.email,
        address: e.address,
        linkFanPage: [e.titleLinkFanPage, e.linkFanPage],
        logoApp: fileLogo || null,
        sloganApp: e.sloganApp,
      }).then(async (status) => {
        if (status) {
          await getInfo();
          toast.success("update info success");
          setEdit(false);
        }
      });
    }
  };
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-2xl bg-white">
      <div className="p-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="sm:ml-8">
          <h3 className=" text-slate-700 dark:text-slate-300 flex ">
            <span className="uppercase">App Information</span>
          </h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant={isEdit ? "filled" : "outlined"}
            onClick={isEdit ? handleUpdate : () => setEdit(true)}
            ripple={false}
          >
            {isEdit ? "Update" : "Edit"}
          </Button>
        </div>
      </div>

      {infoApp && (
        <div
          className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${"block"} flex gap-3`}
        >
          <Formik
            initialValues={{
              email: `${infoApp.email}`,
              phone: `${infoApp.phone}`,
              address: `${infoApp.address}`,
              titleLinkFanPage: `${infoApp.linkFanPage[0]}`,
              linkFanPage: `${infoApp.linkFanPage[1]}`,
              sloganApp: `${infoApp.sloganApp}`,
            }}
            innerRef={formRef}
            onSubmit={(e) => handleSubmit(e)}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={SignupSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6 flex-1"
                autoComplete="off"
              >
                {/* ============ */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                  <div>
                    <Label className="text-sm">Email</Label>
                    <Input
                      className={`mt-1.5 ${
                        errors.email ? "!border-red-400" : ""
                      } disabled:bg-white disabled:border-transparent`}
                      placeholder=""
                      type={"text"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"email"}
                      value={values.email}
                      autoComplete="off"
                      disabled={!isEdit}
                    />
                    {errors.email && touched.email && (
                      <div className="ml-2 relative -bottom-4">
                        <p className="font-medium text-red-600  text-md ">
                          {errors.email}
                        </p>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm">Phone</Label>
                    <Input
                      className={`mt-1.5 ${
                        errors.phone ? "!border-red-400" : ""
                      } disabled:bg-white disabled:border-transparent`}
                      placeholder=""
                      type={"text"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"phone"}
                      value={values.phone}
                      autoComplete="off"
                      disabled={!isEdit}
                    />
                    {errors.phone && touched.phone && (
                      <div className="ml-2 relative -bottom-4">
                        <p className="font-medium text-red-600  text-md ">
                          {errors.phone}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* ============ */}
                <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
                  <div className="flex-1">
                    <Label className="text-sm">Address</Label>
                    <Input
                      className={`mt-1.5 ${
                        errors.address ? "!border-red-400" : ""
                      } disabled:bg-white disabled:border-transparent`}
                      placeholder=""
                      type={"text"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"address"}
                      value={values.address}
                      autoComplete="off"
                      disabled={!isEdit}
                    />
                    {errors.address && touched.address && (
                      <div className="ml-2 relative -bottom-4">
                        <p className="font-medium text-red-600  text-md ">
                          {errors.address}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                  <div className="">
                    <Label
                      className="text-sm"
                      children={"title link fanpage"}
                    />
                    <Input
                      className={`mt-1.5 ${
                        errors.titleLinkFanPage ? "!border-red-400" : ""
                      } disabled:bg-white disabled:border-transparent`}
                      placeholder=""
                      type={"text"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"titleLinkFanPage"}
                      value={values.titleLinkFanPage}
                      autoComplete="off"
                      disabled={!isEdit}
                    />
                    {errors.titleLinkFanPage && touched.titleLinkFanPage && (
                      <div className="ml-2 relative -bottom-2">
                        <p className="font-medium text-red-600  text-md ">
                          {errors.titleLinkFanPage}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="">
                    <Label className="text-sm" children={"link fanpage "} />
                    <Input
                      className={`mt-1.5 ${
                        errors.linkFanPage ? "!border-red-400" : ""
                      } disabled:bg-white disabled:border-transparent`}
                      placeholder=""
                      type={"text"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"linkFanPage"}
                      value={values.linkFanPage}
                      autoComplete="off"
                      disabled={!isEdit}
                    />
                    {errors.linkFanPage && touched.linkFanPage && (
                      <div className="ml-2 relative -bottom-2">
                        <p className="font-medium text-red-600  text-md ">
                          {errors.linkFanPage}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-3">
                  <label className="block">
                    <Label>Slogan app</Label>
                    <Textarea
                      className="mt-1 disabled:bg-white disabled:border-transparent"
                      rows={6}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"sloganApp"}
                      value={values.sloganApp}
                      disabled={!isEdit}
                    />
                  </label>
                </div>

                <input type="submit" className="hidden" />
              </form>
            )}
          </Formik>
          <div className="grid grid-cols-1 gap-4 sm:gap-3 relative">
            <FormUpload
              title="Logo"
              handleGetValue={(file) => {
                setFileLogo(file);
              }}
            />
            {!isEdit && (
              <div className="absolute w-full h-full z-40 bg-gray-200 bg-opacity-35"></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
