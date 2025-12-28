import React, { useState } from "react";

type CreateUserResponse = {
  message?: string;
  error?: string;
};

export default function CreateDbUser() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/create-new-user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username }),
      });

      const rawData = (await response.json()) as unknown;

      const data: CreateUserResponse =
        typeof rawData === "object" && rawData !== null
          ? (rawData as CreateUserResponse)
          : {};

      if (response.ok) {
        setStatus(data.message ?? "User successfully created!");
      } else {
        setStatus(data.error ?? "Error: couldn't create user!");
      }
    } catch {
      setStatus("Connection error with backend!");
    }
  };

  return (
    <form onSubmit={handleCreateUser}>
      <input
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        required
      />
      <input
        type="text"
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
        required
      />
      <button type="submit">User anlegen</button>
      <p>{status}</p>
    </form>
  );
}
