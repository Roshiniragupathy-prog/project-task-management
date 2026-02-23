import MemberRequests from "../components/MemberRequests";

export default function MemberDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Member Dashboard</h1>
      <MemberRequests memberId={2} />
    </div>
  );
}