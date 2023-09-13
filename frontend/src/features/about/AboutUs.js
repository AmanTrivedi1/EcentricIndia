import React from "react";
import BannerImage from "../../assets/Banner.jpg";
import Imageone from "../../assets/image1.jpg";
const AboutUs = () => {
  return (
    <div className=" 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      <div className="lg:w-10/12 w-full">
        <p className="font-normal text-sm leading-3 text-black/90 hover:text-black cursor-pointer">
          About
        </p>
        <h2 className="xl:w-8/12 lg:w-10/12 w-full font-bold text-black lg:text-4xl text-3xl lg:leading-10 leading-9 mt-2">
          Your confidence in our commitment to quality is our greatest
          achievement
        </h2>
        <p className="font-normal text-base leading-6 text-gray-600 mt-6">
          Cultivating trust through quality is our ultimate goal. We tirelessly
          source the finest natural ingredients, maintain strict quality
          standards, and prioritize sustainability. Transparency is our mantra;
          we share every detail about our products and processes. When you
          choose us, you choose authenticity, a brand dedicated to your
          well-being and our planet. We're honored by your trust and committed
          to delivering excellence.
        </p>
      </div>

      <div className="lg:mt-14 sm:mt-10 mt-12">
        <img
          className=" w-full rounded-lg"
          src={BannerImage}
          alt="Group of people Chilling"
        />
      </div>

      <div className="lg:mt-16 sm:mt-12 mt-16 flex lg:flex-row justify-between items-start flex-col lg:gap-8 gap-12">
        <div className="w-full xl:w-5/12 lg:w-6/12">
          <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-black">
            Our Story
          </h2>
          <p className="font-normal text-base leading-6 text-gray-600 mt-4">
            Welcome to the mesmerizing realm of "Heritage Scents," an esteemed
            haven for perfumes and essential oils, nestled in the heart of
            Perfume City, Kannauj. With a deep-rooted commitment to upholding
            traditional methods, Heritage Scents is dedicated to delivering the
            authentic fragrances that have graced this city for generations,
            right to your doorstep. In the tapestry of Perfume City's history,
            where every street whispers the tales of aromatic mastery, Heritage
            Scents stands as a radiant beacon. Our brand stands as a testament
            to authenticity, becoming synonymous with the most exquisite aromas
            that nature and craftsmanship have to offer. We are not just a
            business; we are custodians of a fragrant legacy that spans
            centuries. Central to our philosophy is an unwavering reverence for
            time-honored techniques. At Heritage Scents, we take immense pride
            in reviving ancient practices passed down through generations of
            skilled artisans. These age-old methods, blended with an unwavering
            pursuit of excellence, result in scents that evoke emotions, weave
            narratives, and connect us to the past. Our online platform serves
            as a portal to this captivating aromatic journey. Crafted to bring
            the allure of Perfume City directly to your abode, our website
            showcases a curated selection of opulent perfumes and essential
            oils. As you explore our digital corridors, you'll encounter a
            symphony of scents, painstakingly crafted to resonate with your
            senses. Each product stands as a labor of passion, a testament to
            the devotion of our artisans who infuse expertise into every
            precious drop. From the tender petals of rare blossoms to the
            enduring earthiness of aged woods, our offerings span the entire
            spectrum of fragrant notes. Whether you seek the timeless allure of
            classical perfumes or the holistic well-being that essential oils
            provide, Heritage Scents offers a gateway to an aromatic awakening.
            Delve into the immersive narratives woven by our fragrances.
          </p>
          <p className="font-normal text-base leading-6 text-gray-600 mt-6">
            The bittersweet nostalgia of a distant memory, the invigorating
            embrace of a sunlit morning, or the cozy warmth of a crackling
            hearth—each scent carries a tale, and you are invited to become a
            part of it. Through Heritage Scents, the very soul of Perfume City
            embarks on a journey to your doorstep, allowing you to experience
            the artistry, history, and culture that render this place an
            olfactory haven. As you engage with our offerings, you are not
            merely making a purchase; you are embracing a tradition, becoming a
            thread in a timeless narrative that transcends boundaries and
            generations. Welcome to Heritage Scents, where tradition seamlessly
            blends with innovation to deliver genuine fragrances to your
            doorstep, enriching your life with the enchantment of
            Perfume City, Kannauj.
          </p>
        </div>
        <div className="lg:flex items-center w-full lg:w-1/2 ">
          <img
            className=" rounded-lg w-full"
            src={Imageone}
            alt="people discussing on board"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
