import React from "react";

// Type for the fetched test shopuld come back as an array with strings

type Test = Array<string>;

export default function page() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col justify-center p-5">
        <h1 className="text-2xl md:text-6xl">Practice Test</h1>
        <p> Uebe und ...........</p>
      </div>
      <div className="flex h-[450px] w-[300px] rounded-3xl border border-black md:h-[900px] md:w-[950px]">
        <div className="flex">
          <p>Test</p>
        </div>
      </div>
    </div>
  );
}
