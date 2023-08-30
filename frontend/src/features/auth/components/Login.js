import { useSelector, useDispatch } from "react-redux";
import { selectError, selectLoggedInUser } from "../authSlice";
import { Link, Navigate } from "react-router-dom";
import { loginUserAsync } from "../authSlice";
import TypewriterComponent from "typewriter-effect";
import { useForm } from "react-hook-form";

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="flex h-screen items-center justify-center">
        <div className=" border p-10 rounded-xl border-black/10  sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-2xl font-bold font-Poppins sm:block  text-black  leading-normal text-center mb-6 ">
            <TypewriterComponent
              options={{
                strings: ["Ecentric India", "Fragrences", "Natural Oils"],
                autoStart: true,
                loop: true,
              }}
            />
          </h2>
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(
                loginUserAsync({ email: data.email, password: data.password })
              );
            })}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="">
                <input
                  id="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "email not valid",
                    },
                  })}
                  type="email"
                  className=" w-full border-2 border-gray-300 bg-[#F2F2F2]   py-1.5 pl-1 rounded-lg text-gray-900 focus:ring-black/20 focus:ring-2 sm:text-sm sm:leading-6 "
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-xs text-black opacity-80 hover:opacity-100"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="">
                <input
                  id="password"
                  {...register("password", {
                    required: "password is required",
                  })}
                  type="password"
                  className=" w-full border-2 border-gray-300 bg-[#F2F2F2]     py-1.5 pl-1 rounded-lg text-gray-900 focus:ring-black/40 focus:ring-2 sm:text-sm sm:leading-6 "
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              {error && (
                <p className="text-red-500">{error || error.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-black opacity-100 hover:opacity-80"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
