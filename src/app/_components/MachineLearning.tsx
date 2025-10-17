"use client";

import React from "react";

type Props = {};

function MachineLearning({}: Props) {
  const [analysieren, setAnalysieren] = React.useState(false);

  const Schwierigkeit = "Mittel";
  return (
    <div>
      <h1 className="text-4xl">Was macht Machine Learning hier genau?</h1>
      <p>
        Es kategorisiert im Hintergrund die Fragen oder Tests nach
        Schwierigkeiten, sodass man weiß, wo man steht.
      </p>

      <div>
        {!analysieren ? (
          <div className="inline-grid *:[grid-area:1/1]">
            <div className="status status-error animate-ping"></div>
            <div className="status status-error"></div>
          </div>
        ) : (
          <div className="status status-success">
            Schwierigkeit analysiert!
            <h2>{Schwierigkeit}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default MachineLearning;
