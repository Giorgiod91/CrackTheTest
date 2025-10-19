"use client";
import React, { useState } from "react";
import { set } from "zod";

function Forfun() {
  const [counter, setCounter] = useState(0);

  const increCount = (counter: number) => {
    setCounter(counter + 1);
  };

  const decremeant = (counter: number) => {
    if (counter >= 1) {
      setCounter(counter - 1);
    }
    return null;
  };
  return (
    <div className="flex items-center p-15">
      <h1>zoooo</h1>
      <button
        className="cursor-pointer border-4 bg-red-400"
        onClick={(e) => {
          increCount(counter);
        }}
      >
        +
      </button>
      <button
        onClick={(e) => {
          decremeant(counter);
        }}
        className="cursor-pointer border-4 bg-green-400"
      >
        -
      </button>
      <p>Current Count: {counter}</p>
      <button
        onClick={(e) => {
          setCounter(0);
        }}
        className="cursor-pointer border-4 bg-yellow-400"
      >
        Clear
      </button>
    </div>
  );
}

export default Forfun;
