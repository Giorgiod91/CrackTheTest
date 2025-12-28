/*"use client";
import React, { useEffect, useState } from "react";

function CreateTest() {
  const [title, setTitle] = useState("");
  // for later user
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  async function pushTests(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // check if inputs are empty

    if (!title.trim() || !content.trim()) {
      alert("title and content are not allowed to be empty");
      return;
    }

    const pushTest = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/create_test", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: 1,
            title: title,
            subject: subject,
            content: content,
          }),
        });
        if (!response.ok) {
          throw new Error("Error creating Test!");
        }
        const data = await response.json();
      } catch (error) {
        console.log("Error ", error);
      }
    };

    pushTest();
  }

  return (
    <div>
      <h1>Lass deinen Text erstellen</h1>
      <p>Das ML Model wird die Schwierigkeit einschätzen und anpassen.</p>
      <form onSubmit={pushTests}>
        <input
          type="text"
          placeholder="Test Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="">-- choose subject --</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
        </select>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Create Test</button>
      </form>
    </div>
  );
}

export default CreateTest;


*/ // will use this route maybe later  isntead of build in nextjs api routes
