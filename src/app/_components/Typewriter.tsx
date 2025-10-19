"use client";
import React, { useEffect, useState } from "react";

export default function Typewriter() {
  const [index, setIndex] = useState(0);
  const TextToShow = "Yea its that easy !";
  const moveText = () => {
    if (index < TextToShow.length) {
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    moveText();
  }, [index]);
  return (
    <div>
      <h1 className="text-5xl">{TextToShow.slice(0, index)}</h1>
    </div>
  );
}
