import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>

      <hr />

      <h2>Welcome {user?.firstName}</h2>

      <p>
        <strong>Name:</strong> {user?.firstName} {user?.lastName}
      </p>

      <p>
        <strong>Email:</strong> {user?.email}
      </p>

      <p>
        <strong>Role:</strong> {user?.role}
      </p>
    </div>
  );
}

export default Dashboard;