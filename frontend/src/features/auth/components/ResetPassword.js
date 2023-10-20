import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordAsync,
  selectError,
  selectPasswordReset,
} from "../authSlice";

export default function ResetPassword() {
  const passwordReset = useSelector(selectPasswordReset);
  const error = useSelector(selectError);
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);
  console.log(email, token);

  return (
    <>
      {email && token ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Enter New Password
            </h2>
          </div>

          <div className="mt-10  border border-black/40 rounded-lg p-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                dispatch(
                  resetPasswordAsync({ email, token, password: data.password })
                );
              })}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: "password is required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                      },
                    })}
                    type="password"
                    className="w-full border-2 border-gray-300 bg-[#F2F2F2]   py-1.5 pl-1 rounded-lg text-gray-900 focus:ring-black/20 focus:ring-2 sm:text-sm sm:leading-6 "
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    {...register("confirmPassword", {
                      required: "confirm password is required",
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "password not matching",
                    })}
                    type="password"
                    className="w-full border-2 border-gray-300 bg-[#F2F2F2]   py-1.5 pl-1 rounded-lg text-gray-900 focus:ring-black/20 focus:ring-2 sm:text-sm sm:leading-6 "
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  {passwordReset && (
                    <p className="text-green-500">Password Reset</p>
                  )}
                  {error && <p className="text-red-500">{error}</p>}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm opacity-90 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset Password
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Send me back to{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-black opacity-90 hover:opacity-100"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <p>Incorrect Link</p>
      )}
    </>
  );
}
