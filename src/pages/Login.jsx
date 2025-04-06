import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE;

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 👈 send cookies
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        // optional: verify session with /me
        const meRes = await fetch(`${API_BASE}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (meRes.ok) {
          const user = await meRes.json();
          login(); 
          alert(`Welcome back, ${user.email}!`);
          navigate("/"); 
        } else {
          alert("Login success, but could not fetch user info.");
        }
      } else {
        alert(data.msg || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-dark1 flex items-center justify-center px-4 font-sans">
      <div className="bg-dark3 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl text-white font-bold mb-6 text-center">
          Welcome Back
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 rounded-md bg-dark4 text-white border border-dark5 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 rounded-md bg-dark4 text-white border border-dark5 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent3 text-white py-3 rounded-md font-medium transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-accent hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
