"use client";

import { useState } from "react";

export default function ManagerAssign({ managerId }: { managerId: number }) {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchUser = async () => {
    if (!name.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/users/search?name=${name}`);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Search error:", error);
    }
    setLoading(false);
  };

  const assignProject = async (userId: number) => {
    try {
      await fetch("/api/team-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: 1,
          senderId: managerId,
          receiverId: userId,
          type: "ASSIGN",
          status: "PENDING",
          description: "Assigned to project",
        }),
      });

      alert("Assignment sent successfully!");
    } catch (error) {
      console.error("Assignment error:", error);
    }
  };

  return (
    <div className="mt-6 bg-white shadow-md rounded-lg p-6 max-w-xl">
      
      {/* Search Section */}
      <h2 className="text-xl font-semibold mb-4">Assign Project to Member</h2>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search user by name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={searchUser}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-500">Searching...</p>}

      {/* Users List */}
      <ul className="space-y-3">
        {users.length === 0 && !loading && (
          <p className="text-gray-500">No users found</p>
        )}

        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center bg-gray-50 border p-3 rounded-md"
          >
            <span className="font-medium">{user.name}</span>
            <button
              onClick={() => assignProject(user.id)}
              className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
            >
              Assign Project
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}