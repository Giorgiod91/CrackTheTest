"use client";

import React, { useState } from "react";
import type { input } from "zod";

interface MLResult {
  label: string;
  probability: number;
}

function Get_ML_Model_Result() {
  const [user_input, setUser_input] = useState("");
  const beispiel = [
    "Erstelle mir einen Ausbildungs Eignungstest von VW fuer Fachinformatiker Anwendugsentwicklung",
  ];
  const [results, setResults] = useState<MLResult>();
  const [error, setError] = useState<string | null>(null);
  // function to send the input to the backend so POST method
  const send_data = async (user_input: string) => {
    try {
      setError(null);
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: user_input,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as MLResult;
      setResults(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error fetching ML prediction:", err);
    }
  };

  return (
    <div>
      <form action="">
        <h3>Was für einen Test möchten Sie erstellen ?</h3>

        <p>so koennte es aussehen</p>
        <p className="text-red-400">{beispiel.join(", ")}</p>

        <input
          type="text"
          value={user_input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUser_input(e.target.value)
          }
        />
      </form>
      <button onClick={() => send_data(user_input)}>Senden</button>

      {results && (
        <div>
          <h4>Ergebnis:</h4>
          <p>
            Label: {results.label} - Wahrscheinlichkeit: {results.probability}
          </p>
        </div>
      )}

      <div>
        {error && (
          <p className="text-red-500">Fehler beim Abrufen der Daten: {error}</p>
        )}
      </div>
    </div>
  );
}

export default Get_ML_Model_Result;
