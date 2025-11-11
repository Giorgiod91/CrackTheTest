import React, { useState } from "react";

type Props = {};

function Get_ML_Model_Result({}: Props) {
  const [user_input, setUser_input] = useState("");
  const [results, setResults] = useState<{
    label: string;
    probability: number;
  }>();
  const [error, setError] = useState(null);
  // function to send the input to the backend so POST method
  const send_data = async (user_input: string) => {
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: user_input,
      }),
    });
    if (!response) {
      throw new Error("Error retrieving data");
    }
    const data = await response.json();
    setResults(data);
  };

  return <div>Get_ML_Model_Result</div>;
}

export default Get_ML_Model_Result;
