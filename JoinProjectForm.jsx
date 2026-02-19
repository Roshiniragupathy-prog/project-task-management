// JoinProjectForm.jsx
import { useState } from "react";

export default function JoinProjectForm({ memberId, managerId, projectId }) {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      projectId,       // the project the member wants to join
      senderId: memberId,   // the current user (member)
      receiverId: managerId, // the manager of the project
      type: "JOIN",
      status: "PENDING",
      description,
    };

    const res = await fetch("/api/team-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      alert("Request sent successfully!");
    } else {
      alert("Failed to send request.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Reason for joining"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Send Join Request</button>
    </form>
  );
}
