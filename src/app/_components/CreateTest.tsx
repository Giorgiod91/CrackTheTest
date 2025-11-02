"use client";
import React, { useState } from "react";
// defining
type Prompt = string;
type Subject = string;

function CreateTest() {
  const [subject, setSubject] = useState<Prompt>("");
  const [prompt, setPrompt] = useState<Subject>("");

  return (
    <div>
      <h1>Lass deinen Text erstellen</h1>
      <p>
        das ML Model wird Schwierigkeit einschaetzen und die Schwierigkeit
        anpassen nach bedarf
      </p>
    </div>
  );
}

export default CreateTest;
