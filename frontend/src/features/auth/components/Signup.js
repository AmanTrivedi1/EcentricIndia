import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import TypewriterComponent from "typewriter-effect";
import { selectLoggedInUser, createUserAsync } from "../authSlice";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="flex h-screen   items-center justify-center">
        <div className=" border  p-10 border-black/10 rounded-xl  sm:mx-auto sm:w-full sm:max-w-sm">
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
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              dispatch(
                createUserAsync({
                  name: data.name,
                  email: data.email,
                  password: data.password,
                  addresses: [],
                  role: "user",
                })
              );
              console.log(data);
            })}
          >
            {/*  */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="">
                <input
                  id="name"
                  {...register("name", {
                    required: "name is required",
                  })}
                  type="name"
                  className=" w-full border-2 border-gray-300 bg-gray-50    py-1.5 pl-1 rounded-lg text-gray-900 focus:ring-black/60 focus:ring-2 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
            </div>
            {/*  */}
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
                  className=" w-full border-2 border-gray-300 bg-gray-50    py-1.5 pl-1 rounded-lg text-gray-900 focus:ring-black/60 focus:ring-2 sm:text-sm sm:leading-6"
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
              </div>
              <div className="">
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
                  className=" w-full border-2 border-gray-300 bg-gray-50    py-1.5 pl-1 rounded-lg text-gray-900 focus:ring-black/60 focus:ring-2 sm:text-sm sm:leading-6"
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
              <div className="">
                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "confirm password is required",
                    validate: (value, formValues) =>
                      value === formValues.password || "password not matching",
                  })}
                  type="password"
                  className=" w-full border-2 border-gray-300 bg-gray-50    py-1.5 pl-1 rounded-lg text-gray-900 focus:ring-black/60 focus:ring-2 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a Member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-black opacity-80  hover:opacity-100"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
