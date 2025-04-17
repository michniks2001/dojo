"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!email || !password || !confirmPassword || !name) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Split full name into first and last
    const [first_name, ...rest] = name.trim().split(" ");
    const last_name = rest.join(" ");
    if (!first_name || !last_name) {
      setError("Please enter both first and last name.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/user/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, first_name, last_name })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data?.email?.[0] || data?.password?.[0] || data?.detail || data?.non_field_errors?.[0] || "Registration failed."
        );
      } else {
        setSuccess(true);
        setEmail(""); setPassword(""); setConfirmPassword(""); setName("");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-extrabold text-[var(--primary)] mb-6 text-center">Create your account</h2>
        {error && <div className="mb-4 text-red-600 text-sm font-medium text-center">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-sm font-medium text-center">Registration successful! You can now log in.</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#333333]">Full Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="bg-[#F5F5F5] border-[var(--primary)] text-[#333333] w-full focus:border-[var(--primary)] focus:ring-[var(--primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333]">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="bg-[#F5F5F5] border-[var(--primary)] text-[#333333] w-full focus:border-[var(--primary)] focus:ring-[var(--primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333]">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              className="bg-[#F5F5F5] border-[var(--primary)] text-[#333333] w-full focus:border-[var(--primary)] focus:ring-[var(--primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333]">Confirm Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className="bg-[#F5F5F5] border-[var(--primary)] text-[#333333] w-full focus:border-[var(--primary)] focus:ring-[var(--primary)]"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg shadow font-bold transition-all duration-150 cursor-pointer active:scale-95 hover:scale-95 hover:translate-y-px focus:outline-none focus:ring-2 focus:ring-[var(--primary)/10] mb-2"
            disabled={loading}
            style={{ minHeight: 44 }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-[#DDDDDD]" />
            <span className="mx-3 text-xs text-[#888888] font-medium">or</span>
            <div className="flex-1 h-px bg-[#DDDDDD]" />
          </div>
          <button
            type="button"
            onClick={() => alert('Google sign up coming soon!')}
            className="w-full flex items-center gap-4 px-4 py-2 bg-[var(--primary)] text-white rounded-lg shadow font-semibold transition-all duration-150 cursor-pointer active:scale-95 hover:scale-95 hover:translate-y-px focus:outline-none focus:ring-2 focus:ring-[var(--primary)/10] mb-2"
            style={{ minHeight: 44 }}
          >
            <span className="bg-white rounded-full p-1 shadow-sm flex items-center justify-center" style={{ minWidth: 32, minHeight: 32 }}>
              <svg className="h-6 w-6" viewBox="0 0 488 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path fill="#4285F4" d="M488 261.8c0-17.8-1.6-35.1-4.6-51.8H249v98h135.6c-5.9 32-23.7 59-50.6 77.1v64h81.9c48-44.3 75.1-109.6 75.1-187.3z"/>
                  <path fill="#34A853" d="M249 492c67.7 0 124.7-22.5 166.3-61.1l-81.9-64c-22.8 15.3-52 24.5-84.4 24.5-64.9 0-119.9-43.8-139.6-102.6h-84.6v64.5C71.6 426.4 154.8 492 249 492z"/>
                  <path fill="#FBBC05" d="M109.4 288.8c-10.2-30.1-10.2-62.6 0-92.7v-64.5h-84.6c-18.3 36.7-28.8 77.8-28.8 121.1s10.5 84.4 28.8 121.1l84.6-64.5z"/>
                  <path fill="#EA4335" d="M249 97.5c35.6 0 67.6 12.3 92.7 36.5l69.6-69.6C373.7 24.5 316.7 2 249 2 154.8 2 71.6 67.6 24.8 167.3l84.6 64.5C129.1 141.3 184.1 97.5 249 97.5z"/>
                </g>
              </svg>
            </span>
            <span className="flex-1 text-center">Sign up with Google</span>
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-[#333333]">
          Already have an account? {" "}
          <Link href="/login" className="text-[var(--primary)] hover:underline font-semibold">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
