/*"use client";

import React, { useEffect, useState } from "react";
import Typewriter from "./Typewriter";

//function to create a new user
const SendUserToBackend = async (email: string) => {
  const res = await fetch("http://localhost:8000/create-new-user/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
};

function BannerContent() {
  const [email, setEmail] = useState("");
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
        <div>
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2"
          />
          <button
            onClick={() => SendUserToBackend(email)}
            className="bg-blue-500 px-4 py-2 text-white"
          >
            Add User
          </button>
        </div>
      </h1>
    </div>
  );
}

export default BannerContent;


*/
