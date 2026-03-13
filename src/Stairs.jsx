import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocation } from "react-router-dom";

function Stairs() {
  const stairsRef = useRef(null);
  const currentPath = useLocation().pathname;

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.set(stairsRef.current, { autoAlpha: 1 });
      tl.set(".stair", { yPercent: -100 });

      tl.to(".stair", {
        yPercent: 0,
        duration: 0.6,   
        stagger: {
          each: 0.08,    
          from: "end",
        },
        ease: "power3.inOut",
      });

      tl.to(".stair", {
        yPercent: 100,
        duration: 0.6,
        stagger: {
          each: 0.08,
          from: "end",
        },
        ease: "power3.inOut",
      });

      tl.set(stairsRef.current, { autoAlpha: 0 });
    },
    { scope: stairsRef, dependencies: [currentPath] }
  );

  return (
    <div
      ref={stairsRef}
      className="fixed top-0 left-0 w-screen h-screen flex z-[9999] pointer-events-none"
    >
      <div className="stair flex-1 bg-black"></div>
      <div className="stair flex-1 bg-black"></div>
      <div className="stair flex-1 bg-black"></div>
      <div className="stair flex-1 bg-black"></div>
      <div className="stair flex-1 bg-black"></div>
    </div>
  );
}

export default Stairs;
    
