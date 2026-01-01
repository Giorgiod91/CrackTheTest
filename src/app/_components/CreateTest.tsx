/*"use client";
import React, { useEffect, useState } from "react";

function CreateTest() {
  const [title, setTitle] = useState("");
  // for later user
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  

  // normalize input to see if some users having same input so I dont have to recall openai API and can just
  // give out the same Test and reduce the api token cost
  //::TODO: add hashing , 

  async function pushTests(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // check if inputs are empty

    if (!title.trim() || !content.trim()) {
      alert("title and content are not allowed to be empty");
      return;
    }

    // API call to OpenAI
const response = await openai.responses.create({
    model: "gpt-5-nano",
    input: `Create a realistic company-style test for:
    Title: ${input.title}
    Subject: ${input.subject}
    Content: ${input.content}`,
  });

     // saving the test here
    let test = resonse.output_text;
    console.log(test)

  

  

 
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
