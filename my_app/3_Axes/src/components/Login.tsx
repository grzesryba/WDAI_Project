import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
        .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
        .value;

    try {
      await login(username, password); // Logowanie z backendu
      navigate("/admin-page");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
      <div className="login-container">
        <div className="login-card">
          <h2 className="text-primary text-center mb-4">Admin Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  required
              />
            </div>
            <div className="mb-3">
              <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
  );
}
