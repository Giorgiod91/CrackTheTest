import React, { useState } from "react";

type CreateUserResponse = {
  message?: string;
  error?: string;
};

export default function CreateDbUser() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/create-new-user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username }),
      });

      const data: CreateUserResponse = await response.json();

      if (response.ok) {
        setStatus(data.message ?? "User successfully created!");
      } else {
        setStatus(data.error ?? "Error: couldn't create user!");
      }
    } catch (err) {
      setStatus("Connection error with backend!");
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
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Welcher Username?"
          required
        />
        <button type="submit">User anlegen</button>
        <p>{status}</p>
      </form>
    </div>
  );
}
