"use client";
import React, { useEffect, useState } from "react";
import Typewriter from "./Typewriter";

type Props = {};

function BannerContent({}: Props) {
  const BannerData = "CrackTheTest.ai - Automatisierte Testgenerierung mit KI";
  const [displayBannerData, setDisplayBannerData] = useState(true);
  const timeOutforBanner = () => {
    setTimeout(() => {
      setDisplayBannerData(false);
    }, 5000);
  };
  useEffect(() => {
    timeOutforBanner();
  }, []);

  return (
    <div className="flex items-center">
      <h1 className="flex text-center text-5xl">
        <Typewriter />
      </h1>
    </div>
  );
}

export default BannerContent;
