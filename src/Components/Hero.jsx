import React from "react";
import jabalpurImg from "../images/jabalpurimg1.webp";
import logo from "/JabalpurGo.png";   
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="w-screen h-screen relative overflow-hidden text-black">

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={jabalpurImg}
          alt="jabalpur"
          className="w-full h-full object-cover"
        />
      </div>

      {/* LOGO TOP RIGHT */}
      <div className="absolute top-6 right-6 z-20">
        <img
          src={logo}
          alt="JabalpurGo Logo"
          className="w-20 sm:w-24 md:w-30"
        />
      </div>

      {/* Content */}
      <div className="h-full flex flex-col justify-center 
      items-center md:items-start 
      text-center md:text-left
      px-6 sm:px-10 md:px-20 max-w-3xl">

        <p className="font-bold 
        text-xl sm:text-2xl md:text-4xl 
        leading-relaxed">

          Explore the heart of Madhya Pradesh. <br />

          <span className="text-pink-300 
          text-2xl sm:text-3xl md:text-4xl">
            JabalpurGo
          </span>{" "}
          brings you all the must-visit destinations and breathtaking
          places of Jabalpur.
        </p>

        <Link
          to="/places"
          className="mt-6 rounded-full border-2 border-white 
          px-6 py-3 
          text-base sm:text-lg 
          font-bold bg-pink-300 
          hover:bg-pink-400 transition"
        >
          View Places →
        </Link>

      </div>

    </div>
  );
}

export default Hero;

