import { useState } from "react";
import api from "../services/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await api.post("/auth/password-reset/", { email });
      setSent(true);
    } catch (err) {
      alert("Error sending reset email");
    }
  }

  return (
    <div className="container my-5">
      <h2>Forgot Password</h2>
      {sent ? (
        <p>✅ Reset link sent to your email.</p>
      ) : (
        <form onSubmit={submitHandler}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-primary">
            Send Reset Link
          </button>
        </form>
      )}
    </div>
  );
}
