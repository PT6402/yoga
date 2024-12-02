import * as Yup from "yup";
import { Formik } from "formik";
import { useAuth } from "../../hooks/admin";
import { useNavigate } from "react-router-dom";
export default function FormBodyChange() {
  const navigate = useNavigate();
  const { changePassword, logout } = useAuth();
  const handleSubmit = ({
    email,
    oldPassword,
    newPassword,
  }: {
    email: string;
    oldPassword: string;
    newPassword: string;
  }) => {
    changePassword({ email, oldPassword, newPassword }).then(async (status) => {
      if (status) {
        await logout();
        navigate("/login");
      }
    });
  };
  const SigninSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    oldPassword: Yup.string().required("password required"),
    newPassword: Yup.string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "not match")
      .required("Required"),
  });
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        onSubmit={(e) => handleSubmit(e)}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={SigninSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                name={"email"}
                value={values.email}
                autoComplete="off"
                placeholder="email"
              />
              {errors.email && touched.email && (
                <div className="ml-2 relative -bottom-2">
                  <p className="font-medium text-red-600  text-md ">
                    {errors.email}
                  </p>
                </div>
              )}
            </div>
            <div>
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                placeholder="Old password"
                onBlur={handleBlur}
                onChange={handleChange}
                name={"oldPassword"}
                value={values.oldPassword}
                autoComplete="off"
                type="password"
              />
              {errors.oldPassword && touched.oldPassword && (
                <div className="ml-2 relative -bottom-2">
                  <p className="font-medium text-red-600  text-md ">
                    {errors.oldPassword}
                  </p>
                </div>
              )}
            </div>
            <div>
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                placeholder="New password"
                onBlur={handleBlur}
                onChange={handleChange}
                name={"newPassword"}
                value={values.newPassword}
                autoComplete="off"
                type="password"
              />
              {errors.newPassword && touched.newPassword && (
                <div className="ml-2 relative -bottom-2">
                  <p className="font-medium text-red-600  text-md ">
                    {errors.newPassword}
                  </p>
                </div>
              )}
            </div>
            <div>
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                placeholder="Confirm password"
                onBlur={handleBlur}
                onChange={handleChange}
                name={"confirmPassword"}
                value={values.confirmPassword}
                autoComplete="off"
                type="password"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="ml-2 relative -bottom-2">
                  <p className="font-medium text-red-600  text-md ">
                    {errors.confirmPassword}
                  </p>
                </div>
              )}
            </div>

            <button
              className="mt-5 tracking-wide font-semibold bg-gray-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              type="submit"
            >
              <span className="ml-3">{"Submit to change password"}</span>
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}
