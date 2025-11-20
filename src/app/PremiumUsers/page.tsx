import React from "react";
import Get_ML_Model_Result from "../_components/Get_ML_Model_Result";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-10 py-10">
      <h1 className="text-7xl">Premium </h1>
      <Get_ML_Model_Result />
    </div>
  );
}
