import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE;

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Important: send cookies
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        // optional: fetch user info from /me route
        const meRes = await fetch(`${API_BASE}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });
        if (meRes.ok) {
          const user = await meRes.json();
          login(); // update context
          alert(`Welcome ${user.email}!`);
          navigate("/todo");
        } else {
          alert("Could not verify user.");
        }
      } else {
        alert(data.msg || "Sign Up Failed");
      }
    } catch (error) {
      console.error("Sign Up Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-dark1 flex items-center justify-center px-4 font-sans">
      <div className="bg-dark3 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl text-white font-bold mb-6 text-center">Create an Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 rounded-md bg-dark4 text-white border border-dark5 focus:outline-none focus:ring-2 focus:ring-accent"
          />
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
            className="w-full bg-accent hover:bg-accent2 text-white py-3 rounded-md font-medium transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
