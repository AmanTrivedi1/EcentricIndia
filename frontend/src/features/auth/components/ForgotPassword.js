import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordRequestAsync, selectMailSent } from "../authSlice";

import TypewriterComponent from "typewriter-effect";
export default function ForgotPassword() {
  const mailSent = useSelector(selectMailSent);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  return (
    <>
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
              console.log(data);
              dispatch(resetPasswordRequestAsync(data.email));
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
              <div className="mt-2">
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
                  className=" w-full border-2 border-gray-300 bg-gray-50    py-1.5 pl-1 rounded-lg text-gray-900 focus:ring-black/60 focus:ring-2 sm:text-sm sm:leading-6 "
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
                {mailSent && <p className="text-green-500">Mail Sent</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Send Email
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Send me back to{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-black opacity-100 hover:opacity-80"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
