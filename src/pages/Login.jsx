import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const checkPasswordStrength = (value) => {
    setPassword(value);

    if (value.length < 6) {
      setPasswordStrength("Weak");
    } else if (
      value.length >= 8 &&
      /[A-Z]/.test(value) &&
      /[0-9]/.test(value)
    ) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Medium");
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    const token = btoa(
      JSON.stringify({
        username,
        loginTime: new Date().toISOString(),
      })
    );

    localStorage.setItem("jwtToken", token);

    if (rememberMe) {
      localStorage.setItem("rememberUser", username);
    } else {
      localStorage.removeItem("rememberUser");
    }

    setError("");
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>🔐 Login</h1>

        <p>Welcome to the Authentication System</p>

        <form onSubmit={handleLogin}>
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            placeholder="Enter username"
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              checkPasswordStrength(event.target.value)
            }
            placeholder="Enter password"
          />

          {password && (
            <p>
              Password strength:{" "}
              <strong>{passwordStrength}</strong>
            </p>
          )}

          <label className="remember">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) =>
                setRememberMe(event.target.checked)
              }
            />
            Remember me
          </label>

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;