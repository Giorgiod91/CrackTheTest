"use client";
import React, { useState } from "react";
// defining
type Prompt = string;
type Subject = string;

function CreateTest() {
  const [subject, setSubject] = useState<Subject>("");
  const [prompt, setPrompt] = useState<Prompt>("");

  return (
    <div>
      <h1>Lass deinen Text erstellen</h1>
      <p>
        das ML Model wird Schwierigkeit einschaetzen und die Schwierigkeit
        anpassen nach bedarf
      </p>
      <form action="" method="get">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <select
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
          name=""
          id=""
        >
          <option value="">-- choose subject --</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
        </select>
      </form>
    </div>
  );
}

export default CreateTest;
