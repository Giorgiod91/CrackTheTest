"use client";
import React, { useState } from "react";
import { supabase } from "../../../utils/supabase/client";

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

    // Check if user is logged in

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must log in first.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("Test")
        .insert([{ title, content, authorId: user.id }])
        .select(); // will give back an object

      if (error) throw error;

      setTitle("");
      setContent("");
    } catch (err: any) {
      console.error("Insert error:", err.message);
    }
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
