"use client";
import { useEffect, useState } from "react";

export default function ManagerRequests({ managerId }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending requests
  useEffect(() => {
    if (!managerId) return;

    async function fetchRequests() {
      try {
        const res = await fetch(`/api/team-request?managerId=${managerId}`); // ✅ FIXED
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, [managerId]);

  // Approve / Reject handler
  const handleUpdateStatus = async (requestId, status) => {
    try {
      const res = await fetch("/api/team-request", { // ✅ FIXED
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, status }),
      });

      const updated = await res.json();

      setRequests((prev) =>
        prev.map((req) => (req.id === updated.id ? updated : req))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (!managerId) return <p>Please login as manager.</p>;
  if (loading) return <p>Loading requests...</p>;

  return (
    <div>
      <h2>Incoming Requests</h2>
      {requests.length === 0 && <p>No pending requests</p>}
      {requests.map((req) => (
        <div
          key={req.id}
          style={{ border: "1px solid gray", padding: "8px", margin: "8px 0" }}
        >
          <p>
            <strong>Project:</strong> {req.project?.name || "Unknown"}
          </p>
          <p>
            <strong>Member:</strong> {req.sender?.name || "Unknown"}
          </p>
          <p>
            <strong>Description:</strong> {req.description}
          </p>
          <button
            onClick={() => handleUpdateStatus(req.id, "ASSIGNED")}
            style={{ marginRight: "8px" }}
          >
            Approve
          </button>
          <button onClick={() => handleUpdateStatus(req.id, "REJECTED")}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}