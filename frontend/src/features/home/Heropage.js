import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./Heropage.css";
import { useNavigate } from "react-router-dom";
import one from "../../assets/image1.jpg";
import two from "../../assets/image2.jpg";
import three from "../../assets/image3.jpg";
import four from "../../assets/image4.jpg";
const HeroLmsSystem = () => {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/filters");
  }
  return (
    <div className="hero-image">
      <div className=" h-full  md:h-screen bg-gradient-to-b mt-6 ">
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
                  innovative tools designed to empower students and
                  professionals alike on their educational journey.
                </p>
                <div className="mt-5 flex items-center gap-5 md:gap-0 sm:flex sm:items-center sm:space-x-20">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({
                        top: document.querySelector("#Products").offsetTop,
                        behavior: "smooth",
                      });
                    }}
                    className="inline-flex items-center rounded-3xl justify-center px-8 py-3 text-base  font-semibold text-white transition-all duration-200 bg-black hover:bg-black focus:bg-black"
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
    </div>
  );
};
export default HeroLmsSystem;
