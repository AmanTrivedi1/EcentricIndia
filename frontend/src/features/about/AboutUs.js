import React from "react";
import Wrapper from "../common/Wrapper";

const AboutUs = () => {
  return (
    <>
      <Wrapper>
        <h1 className="text-2xl font-bold text-center mt-10">About Us</h1>
        <p className="mt-10  text-xs sm:text-sm text-center lg:px-30 md:px-20 sm:px-10 px-2">
          Our history is the story of our journey. And we’ve been through a
          journey of exploration, discovery, and wonderment; a journey that has
          been proud and fruitful, from its humble beginnings to the dizzying
          heights we've scaled along the way. Our background consists of approx
          400 years for cultivation and trading business of Indian Origin
          Natural Herbs , Traditional Indian Attars etc. In 16 th century ,Our
          forefather Mir Sayyid Muhammad Qanauji ( A Sufi Scholar ) and His
          companions started "Attar Industry" .Just because of this vast trading
          experience we expanded our business into the manufacturing and
          exporting of Natural Essential Oil and Traditional Indian Attars.
        </p>
        <div className="   flex   items-center gap-x-10 gap-y-5 mt-10 justify-center flex-wrap">
          <div className="border-l  p-2 sm:p-10 border-l-black/40 inline-flex ">
            <div className=" flex   flex-col items-center px-4 py-4    ">
              <h1 className=" text-2xl md:text-3xl ">300+</h1>
              <p>PRODUCTS AVAILABLE</p>
            </div>
          </div>

          <div className="border-l p-2 sm:p-10 border-l-black/40 inline-flex ">
            <div className="  flex flex-col items-center px-2 py-4    ">
              <h1 className=" text-2xl md:text-3xl ">81+</h1>
              <p>CLIENTS COME BACK</p>
            </div>
          </div>
          <div className="border-l sm:p-10 p-2 border-l-black/40 inline-flex ">
            <div className="   flex flex-col items-center px-2 py-4    ">
              <h1 className=" text-2xl md:text-3xl ">10+</h1>
              <p>SITE MEMBERS</p>
            </div>
          </div>
        </div>
        <div>
          <p className="mt-10  text-xs sm:text-sm text-center lg:px-30 md:px-20 sm:px-10 px-2">
            <span className="font-bold"> Eccentric India </span> is a reckoned
            name in the manufacturing and supply of 100% Pure and Natural
            Essential Oils, Carrier oils, Absolutes, Aromatic Compounds,
            Aromatherapy Oils etc– both in the Indian market as well as several
            foreign markets. We are specialists in 100% pure and natural
            Essential oils, Carrier oils, Absolutes, Aromatic Compounds,
            Aromatherapy Oils etc . And our focus on this line of products has
            brought us to where we are today. Our products are exported to most
            parts of the globe. We offer Essential oils right from small
            consumer packs to bulk packaging. We are versatile in this respect,
            which has made us unique among our customers both in India as well
            as abroad. Continual focus on quality has earned an epitome of trust
            for the company amidst the world market.
          </p>
          <p className="mt-10  text-xs sm:text-sm text-center lg:px-30 md:px-20 sm:px-10 px-2">
            Our well equipped manufacturing unit is situated in Kannauj where we
            distill natural essential oils, spice oils and making Indian Attars.
            Our products are dispatched to the customers only after extreme
            Quality test in laboratory to fulfill their need of Quality product
            because we believe in quality service and our motto is Customer
            Satisfaction.
          </p>
          <p className="mt-10  text-xs sm:text-sm text-center lg:px-30 md:px-20 sm:px-10 px-2">
            Today, iFRAGRANCE INDIA represents and supplies world renowned
            brands of Essential Oils and Traditional Indian Attars. Our quality
            control and choice of brands have earned us a unique recognition for
            quality from all our clients. Our dedication, zest, hard work and
            professionalism are the reasons for numerous completely satisfied
            customers.
          </p>
        </div>
      </Wrapper>
    </>
  );
};

export default AboutUs;
