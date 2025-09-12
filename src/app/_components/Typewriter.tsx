"use client";
import React, { useEffect, useState } from "react";

type Props = {};

export default function Typewriter({}: Props) {
  const [index, setIndex] = useState(0);
  const TextToShow: string = "Yea its that easy !";
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
