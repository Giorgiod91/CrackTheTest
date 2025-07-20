"use client";
import React, { useEffect, useState } from "react";

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
    <div>
      <h1>{BannerData}</h1>
    </div>
  );
}

export default BannerContent;
