import { Formik, FormikProps } from "formik";
import { useRef, useState } from "react";
import { RootState } from "../../../context/store";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Button } from "@material-tailwind/react";
import Label from "../../../shared/Label";
import Input from "../../../shared/Input";
import FormUpload from "./FormUpload";
import useInfoAdmin from "../../../hooks/admin/useInfoAdmin";
import useInfoApp from "../../../hooks/user/useInfoApp";
import toast from "react-hot-toast";
export interface PayloadDataBank {
  bankStk: string;
  bankName: string;
  bankOwnerName: string;
}
export default function FormBank() {
  const { updateBank } = useInfoAdmin();
  const { getInfo } = useInfoApp();
  const formRef = useRef<FormikProps<PayloadDataBank>>(null);
  const { infoApp } = useSelector((state: RootState) => state.uiApp);
  const [fileQRCode, setFileQRCode] = useState<File>();
  const [isEdit, setEdit] = useState(false);
  const handleUpdate = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };
  const SignupSchema = Yup.object().shape({
    bankStk: Yup.string().required("Required"),
    bankName: Yup.string().required("Required"),
    bankOwnerName: Yup.string().required("Required"),
  });
  const handleSubmit = (e: PayloadDataBank) => {
    if (infoApp && !infoApp.bankQRCode && !fileQRCode) {
      toast.error("file QRcode require");
    } else {
      updateBank({
        bankName: e.bankName,
        bankOwnerName: e.bankOwnerName,
        bankStk: e.bankStk,
        bankQRCode: fileQRCode || null,
      }).then(async (status) => {
        if (status) {
          await getInfo();
          toast.success("update bank success");
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
            <span className="uppercase">Bank Information</span>
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
              bankStk: `${infoApp.bankStk}`,
              bankName: `${infoApp.bankName}`,
              bankOwnerName: `${infoApp.bankOwnerName}`,
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
                    <Label className="text-sm">STK</Label>
                    <Input
                      className={`mt-1.5 ${
                        errors.bankStk ? "!border-red-400" : ""
                      } disabled:bg-white disabled:border-transparent`}
                      placeholder=""
                      type={"text"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"bankStk"}
                      value={values.bankStk}
                      autoComplete="off"
                      disabled={!isEdit}
                    />
                    {errors.bankStk && touched.bankStk && (
                      <div className="ml-2 relative -bottom-4">
                        <p className="font-medium text-red-600  text-md ">
                          {errors.bankStk}
                        </p>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm">Tên ngân hàng</Label>
                    <Input
                      className={`mt-1.5 ${
                        errors.bankName ? "!border-red-400" : ""
                      } disabled:bg-white disabled:border-transparent`}
                      placeholder=""
                      type={"text"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"bankName"}
                      value={values.bankName}
                      autoComplete="off"
                      disabled={!isEdit}
                    />
                    {errors.bankName && touched.bankName && (
                      <div className="ml-2 relative -bottom-4">
                        <p className="font-medium text-red-600  text-md ">
                          {errors.bankName}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* ============ */}
                <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
                  <div className="flex-1">
                    <Label className="text-sm">Tên chủ tài khoản</Label>
                    <Input
                      className={`mt-1.5 ${
                        errors.bankOwnerName ? "!border-red-400" : ""
                      } disabled:bg-white disabled:border-transparent`}
                      placeholder=""
                      type={"text"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name={"bankOwnerName"}
                      value={values.bankOwnerName}
                      autoComplete="off"
                      disabled={!isEdit}
                    />
                    {errors.bankOwnerName && touched.bankOwnerName && (
                      <div className="ml-2 relative -bottom-4">
                        <p className="font-medium text-red-600  text-md ">
                          {errors.bankOwnerName}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <input type="submit" className="hidden" />
              </form>
            )}
          </Formik>
          <div className="grid grid-cols-1 gap-4 sm:gap-3 relative">
            <FormUpload
              title="QRCode"
              handleGetValue={(file) => setFileQRCode(file)}
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
