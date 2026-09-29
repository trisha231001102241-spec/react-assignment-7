import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("rememberUser") || "User";

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("rememberUser");

    navigate("/");
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {username}! 🎉</h1>

      <p>You are successfully logged in.</p>

      <div className="dashboard-box">
        <h2>🔐 Authentication Dashboard</h2>

        <p>
          Your login session is protected using a simulated
          JWT token.
        </p>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;