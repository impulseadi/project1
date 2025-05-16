import { useEffect, useState } from "react";
import { Link } from "react-router";
import { assets } from "../assets/assets";

const MainBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const desktopBanners = assets.desktop_banners;
  const mobileBanners = assets.mobile_banners;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + 1) % desktopBanners.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [desktopBanners.length]);

  return (
    <div className="relative">
      {/* Desktop View with fixed height container */}
      <div className="hidden md:block w-full h-[500px] relative overflow-hidden">
        <img
          src={desktopBanners[currentIndex]}
          alt="Desktop Banner"
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />
      </div>

      {/* Mobile View with fixed height container */}
      <div className="md:hidden w-full h-[300px] relative overflow-hidden">
        <img
          src={mobileBanners[currentIndex]}
          alt="Mobile Banner"
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15 text-white md:text-black">
          Fresh Picks, Smart Savings — All in One Place!
        </h1>

        <div className="flex items-center mt-6 font-medium">
          <Link
            to="/products"
            className="group flex items-center gap-2 py-3 px-7 md:px-9 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer"
          >
            Shop now
            <img
              className="md:hidden transition group-focus:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>
          <Link
            to="/products"
            className="group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer"
          >
            Explore deals
            <img
              className="transition group-focus:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow black"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
