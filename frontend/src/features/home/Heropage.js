// import HeroImage from "../../assets/HomeImage.png";
// import "./Heropage.css";
// import { useNavigate } from "react-router-dom";
// const Heropage = () => {
//   const navigate = useNavigate();
//   function handleClick() {
//     navigate("/filters");
//   }

//   return (
//     <div className="hero-image">
//       <div className=" relative flex flex-col-reverse mt-10 lg:pt-0 lg:flex-col lg:pb-0">
//         <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
//           <svg
//             className="absolute left-0 hidden h-full text-yellow-50 transform -translate-x-1/2 lg:block"
//             viewBox="0 0 100 100"
//             fill="currentColor"
//             preserveAspectRatio="none slice"
//           >
//             <path d="M50 0H100L50 100H0L50 0Z" />
//           </svg>
//           <img
//             className="object-cover w-full h-64 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
//             src={HeroImage}
//             alt=""
//           />
//         </div>
//         <div className="relative flex p-2 flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
//           <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
//             <p className="inline-block px-4 py-1 mb-4 text-xs bg-black text-white  font-semibold tracking-wider  uppercase rounded-full bg-teal-accent-400">
//               All Naturals
//             </p>
//             <h2 className="mb-5 font-sans text-3xl font-bold  font-Poppins text-gray-900 sm:text-5xl ">
//               Unveil Nature's Essence: Explore Exquisite Natural Oils and
//               Perfumes.
//             </h2>
//             <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
//               Indulge in Nature's Luxury: Captivating Aromas and Pure Oils Await
//               You. Elevate Your Senses with our Exquisite Collection of Natural
//               Oils and Perfumes. Discover True Elegance, Crafted from Earth's
//               Finest Ingredients.
//             </p>
//             <div className="flex items-center">
//               <button
//                 onClick={handleClick}
//                 className="inline-flex  font-Poppins bg-black text-white hover:opacity-80  items-center justify-center h-12 px-8  mr-6 font-medium tracking-wide  transition duration-200 rounded-full  focus:shadow-outline focus:outline-none"
//               >
//                 Shop With Us
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Heropage;
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import one from "../../assets/one.png";
import two from "../../assets/two.png";
import three from "../../assets/three.png";
import four from "../../assets/four.png";
const HeroLmsSystem = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/filters");
  }
  return (
    <div className="bg-gradient-to-b mt-8 ">
      <section className=" sm:py-16 ">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h1 className="sm:text-6xl text-3xl font-bold text-black">
                Unveil Nature's Essence: Explore Exquisite Natural Oils and
                <div className="relative inline-flex">
                  <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-black/20"></span>
                  <h1 className="relative sm:text-6xl text-3xl font-bold text-black  ">
                    Perfumes.
                  </h1>
                </div>
              </h1>
              <p className="mt-5 text-sm sm:text-lg text-black ">
                Your Gateway to Knowledge and Growth. Discover a world of
                comprehensive learning resources, expert guidance, and
                innovative tools designed to empower students and professionals
                alike on their educational journey.
              </p>
              <div className="mt-5 flex items-center gap-5 md:gap-0 sm:flex sm:items-center sm:space-x-20">
                <button
                  onClick={handleClick}
                  className="inline-flex items-center rounded-lg justify-center px-10 py-4 text-base  font-semibold text-white transition-all duration-200 bg-black hover:bg-black focus:bg-black"
                >
                  Shop Now
                </button>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <Carousel
                infiniteLoop={true}
                showArrows={false}
                autoPlay={true}
                showStatus={false}
                showThumbs={false}
                showIndicators={false}
              >
                <img src={one} className="rounded-lg" alt="ProductImage" />
                <img src={two} className="rounded-lg" alt="ProductImage" />
                <img src={three} className="rounded-lg" alt="ProductImage" />
                <img src={four} className="rounded-lg" alt="ProductImage" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HeroLmsSystem;
