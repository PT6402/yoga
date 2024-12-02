import * as Yup from "yup";
import { Formik, FormikProps } from "formik";
import { useRef, useState } from "react";
import { InforUser, OrderAdmin } from "../../../../context/type_stores";
import Label from "../../../../shared/Label";
import Input from "../../../../shared/Input";
import Textarea from "../../../../shared/Textare";
import { Button } from "@material-tailwind/react";
import { useOrderAdmin } from "../../../../hooks/admin";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

interface Props {
  dataDetail: OrderAdmin;
  handleSubmitOutSide?: (func: () => void) => void;
  reloadPage: () => void;
}
export default function FormInfo({
  handleSubmitOutSide,
  dataDetail,
  reloadPage,
}: Props) {
  const { id: orderId } = useParams();
  const { info: infoUser } = dataDetail;
  const navigate = useNavigate();
  const formRef = useRef<FormikProps<InforUser>>(null);
  const [isEdit, setEdit] = useState(false);
  const { updateInfoOrder, confirmOrder } = useOrderAdmin();
  const SignupSchema = Yup.object().shape({
    fullname: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string()
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, {
        message: "phone not match",
      })
      .required("Required"),
    address: Yup.string().required("Required"),
    message: Yup.string(),
  });
  const handleSubmit = (e: InforUser) => {
    if (orderId) {
      updateInfoOrder(Number(orderId), e).then((status) => {
        if (status) {
          reloadPage();
          setEdit(false);
        }
      });
    }
  };
  const handleClickSubmit = () => {
    if (formRef.current != null) {
      formRef.current.submitForm();
    }
  };
  if (handleSubmitOutSide) {
    handleSubmitOutSide(handleClickSubmit);
  }
  const handleConfirmOrder = () => {
    if (orderId) {
      Swal.fire({
        title: "Are you sure?",
        text: "You will send email for user and confirm this order",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm it!",
      }).then((result) => {
        if (result.isConfirmed) {
          confirmOrder(Number(orderId)).then((status) => {
            if (status) {
              Swal.fire({
                title: "Confirm success!",
                text: "Order had confirmed",
                icon: "success",
              }).then(() => {
                navigate("/admin/order");
              });
            }
          });
        }
      });
    }
  };
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-2xl bg-white">
      <div className="p-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="sm:ml-8">
          <h3 className=" text-slate-700 dark:text-slate-300 flex ">
            <span className="uppercase">Information Order</span>
          </h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant={isEdit ? "filled" : "outlined"}
            onClick={isEdit ? handleClickSubmit : () => setEdit(true)}
            ripple={false}
          >
            {isEdit ? "Update" : "Edit"}
          </Button>
          <Button
            variant="filled"
            className=" !shadow-gray-300 font-bold"
            color={"green"}
            onClick={handleConfirmOrder}
            disabled={isEdit}
          >
            Confirm order
          </Button>
        </div>
      </div>
      <div
        className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${"block"}`}
      >
        <Formik
          initialValues={{
            fullname: `${infoUser.fullname}`,
            email: `${infoUser.email}`,
            address: `${infoUser.address}`,
            phone: `${infoUser.phone}`,
            message: `${infoUser.message}`,
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
              className="space-y-4 md:space-y-6"
              autoComplete="off"
            >
              {/* ============ */}
              <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
                <div className="flex-1">
                  <Label className="text-sm" children={"Fullname"} />
                  <Input
                    className={`mt-1.5 ${
                      errors.fullname ? "!border-red-400" : ""
                    } disabled:bg-white disabled:border-transparent`}
                    placeholder=""
                    type={"text"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name={"fullname"}
                    value={values.fullname}
                    autoComplete="off"
                    disabled={!isEdit}
                  />
                  {errors.fullname && touched.fullname && (
                    <div className="ml-2 relative -bottom-2">
                      <p className="font-medium text-red-600  text-md ">
                        {errors.fullname}
                      </p>
                    </div>
                  )}
                </div>
              </div>
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
              <div className="grid grid-cols-1 gap-4 sm:gap-3">
                <label className="block">
                  <Label>Message</Label>
                  <Textarea
                    className="mt-1 disabled:bg-white disabled:border-transparent"
                    rows={6}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name={"message"}
                    value={values.message}
                    disabled={!isEdit}
                  />
                </label>
              </div>
              <input type="submit" className="hidden" />
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
