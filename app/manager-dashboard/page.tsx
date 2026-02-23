import ManagerAssign from "../components/ManagerAssign";

export default function ManagerDashboard() {
  return (
    <div>
      <h1>Manager Dashboard</h1>
      <ManagerAssign managerId={1} />
    </div>
  );
}