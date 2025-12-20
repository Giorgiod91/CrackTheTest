import React, { useState } from "react";

type Props = {};

export default function CreateDbUser({}: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {const response = await fetch(""), {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
    }
    const data = await response.json();

    if(response.ok){
        setStatus('User succecsfull created!')
     }else{
        setStatus('error couldnt create user!')
     }
    } catch (err) {
      setStatus("connection error with backend!");
    }
  };

  return <div> <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Deine E-Mail"
        required
      />
      <button type="submit">User anlegen</button>
      <p>{status}</p>
    </form></div>;
}
