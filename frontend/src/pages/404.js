import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center ">
      <h1 className="text-9xl font-extrabold  tracking-widest">404</h1>
      <div className=" px-2 text-sm rounded rotate-12 bg-black text-white absolute">
        Page Not Found
      </div>
      <button className="mt-5 bg-black  hover:opacity-80 text-white px-5 py-3 rounded-md  ">
        <Link to="/"> Go Home </Link>
      </button>
    </main>
  );
}

export default PageNotFound;
