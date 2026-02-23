"use client";

import { useEffect, useState } from "react";

export default function MemberRequests({ memberId }: { memberId: number }) {
  const [requests, setRequests] = useState<any[]>([]);

  const fetchRequests = async () => {
    const res = await fetch("/api/team-request");
    const data = await res.json();

    // Filter only requests for this member
  const filtered = data;

    setRequests(filtered);
  };

  const updateStatus = async (requestId: number, status: string) => {
    await fetch("/api/team-request", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId, status }),
    });

    fetchRequests(); // refresh
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="mt-6 bg-white shadow p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Project Requests</h2>

      {requests.length === 0 && (
        <p className="text-gray-500">No pending requests</p>
      )}

      {requests.map((req) => (
        <div
          key={req.id}
          className="flex justify-between items-center border p-3 rounded mb-3"
        >
          <span>{req.description}</span>
          <div className="space-x-2">
            <button
              onClick={() => updateStatus(req.id, "APPROVED")}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Accept
            </button>
            <button
              onClick={() => updateStatus(req.id, "REJECTED")}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}