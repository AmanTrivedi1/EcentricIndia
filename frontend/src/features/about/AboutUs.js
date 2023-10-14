import React from "react";
import Wrapper from "../common/Wrapper";
import Bannerimage from "../../assets/banner image.jpeg";
const AboutUs = () => {
  return (
    <>
      <Wrapper>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-center mt-10">About Us</h1>
          <p className="mt-10  text-xs sm:text-sm text-center lg:px-30 md:px-20 sm:px-10 px-2">
            <span className="text-xl font-bold">W</span>elcome to the
            mesmerizing realm of "Heritage Scents," an esteemed haven for
            perfumes and essential oils, nestled in the heart of Perfume City,
            Kannauj. With a deep-rooted commitment to upholding traditional
            methods, Heritage Scents is dedicated to delivering the authentic
            fragrances that have graced this city for generations, right to your
            doorstep.n the tapestry of Perfume City's history, where every
            street whispers the tales of aromatic mastery, Heritage Scents
            stands as a radiant beacon. Our brand stands as a testament to
            authenticity, becoming synonymous with the most exquisite aromas
            that nature and craftsmanship have to offer. We are not just a
            business; we are custodians of a fragrant legacy that spans
            centuries.
          </p>
          <div>
            <img
              className="object-fill mt-4 mb-4 rounded-lg"
              src={Bannerimage}
              alt="Banner Image"
            />
          </div>
          <div>
            <p className="mt-10  text-xs sm:text-sm text-center lg:px-30 md:px-20 sm:px-10 px-2">
              Central to our philosophy is an unwavering reverence for
              time-honored techniques. At Heritage Scents, we take immense pride
              in reviving ancient practices passed down through generations of
              skilled artisans. These age-old methods, blended with an
              unwavering pursuit of excellence, result in scents that evoke
              emotions, weave narratives, and connect us to the past. Our online
              platform serves as a portal to this captivating aromatic journey.
              Crafted to bring the allure of Perfume City directly to your
              abode, our website showcases a curated selection of opulent
              perfumes and essential oils. As you explore our digital corridors,
              you'll encounter a symphony of scents, painstakingly crafted to
              resonate with your senses. Each product stands as a labor of
              passion, a testament to the devotion of our artisans who infuse
              expertise into every precious drop.
            </p>
            <p className="mt-10  text-xs sm:text-sm text-center lg:px-30 md:px-20 sm:px-10 px-2">
              From the tender petals of rare blossoms to the enduring earthiness
              of aged woods, our offerings span the entire spectrum of fragrant
              notes. Whether you seek the timeless allure of classical perfumes
              or the holistic well-being that essential oils provide, Heritage
              Scents offers a gateway to an aromatic awakening. Delve into the
              immersive narratives woven by our fragrances. The bittersweet
              nostalgia of a distant memory, the invigorating embrace of a
              sunlit morning, or the cozy warmth of a crackling hearth—each
              scent carries a tale, and you are invited to become a part of it.
            </p>
            <p className="mt-10  text-xs sm:text-sm text-center lg:px-30 md:px-20 sm:px-10 px-2">
              Through Heritage Scents, the very soul of Perfume City embarks on
              a journey to your doorstep, allowing you to experience the
              artistry, history, and culture that render this place an olfactory
              haven. As you engage with our offerings, you are not merely making
              a purchase; you are embracing a tradition, becoming a thread in a
              timeless narrative that transcends boundaries and generations.
              Welcome to Heritage Scents, where tradition seamlessly blends with
              innovation to deliver genuine fragrances to your doorstep,
              enriching your life with the enchantment of Perfume City, Kannauj.
            </p>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default AboutUs;
