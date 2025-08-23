"use client";
import React, { useState } from "react";

type Props = {};

export default function Typewriter({}: Props) {
  const [show, setshow] = useState(true);
  const TextToShow = ["Yea its that easy !"];
  const moveText = () => {
    for (var i = 0; i < TextToShow.length; i++) {
      return (
        <div>
          <p>1</p>
        </div>
      );
    }
  };
  return (
    <div>
      <button onClick={moveText}></button>
      Hello
    </div>
  );
}
