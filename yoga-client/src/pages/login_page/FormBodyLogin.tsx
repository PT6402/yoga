import * as Yup from "yup";
import { Formik } from "formik";
import { useAuth } from "../../hooks/admin";
import { useNavigate } from "react-router-dom";
export default function FormBodyLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    login({ email, password }).then((status) => {
      if (status) {
        navigate("/admin");
      }
    });
  };
  const SigninSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("password required"),
  });
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
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
                type="password"
                placeholder="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                name={"password"}
                value={values.password}
                autoComplete="off"
              />
              {errors.password && touched.password && (
                <div className="ml-2 relative -bottom-2">
                  <p className="font-medium text-red-600  text-md ">
                    {errors.password}
                  </p>
                </div>
              )}
            </div>

            <button
              className="mt-5 tracking-wide font-semibold bg-gray-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              type="submit"
            >
              <span className="ml-3">{"Sign In"}</span>
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}
