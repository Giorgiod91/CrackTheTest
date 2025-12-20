import React, { useState } from "react";

type Props = {};

export default function CreateDbUser({}: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/create-new-user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });
      const data = await response.json();

      if (response.ok) {
        setStatus("User succecsfull created!");
      } else {
        setStatus("error couldnt create user!");
      }
    } catch (err) {
      setStatus("connection error with backend!");
    }
  };
  return (
    <div>
      <form onSubmit={handleCreateUser}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Deine E-Mail"
          required
        />
        <button type="submit">User anlegen</button>
        <p>{status}</p>
      </form>
    </div>
  );
}
