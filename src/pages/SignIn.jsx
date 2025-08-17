import React, { useState, useEffect } from "react";
import { useSignInEmailPassword } from "@nhost/react";
import { Link, useNavigate } from "react-router-dom";
import { IoMail } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegSmileWink } from "react-icons/fa";

export default function SignIn() {
  const navigate = useNavigate();
  const { signInEmailPassword, isLoading, isSuccess, isError, error } =
    useSignInEmailPassword();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInEmailPassword(email, password);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200 px-4">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center justify-center gap-2">
          👋 Welcome to Chat App
        </h1>
        <p className="text-gray-600 text-sm mt-2 flex items-center justify-center gap-1">
          <FaRegSmileWink className="text-yellow-500" /> Let’s sign you in!
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm border-2 border-amber-400"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>

        {isError && (
          <p className="text-red-600 text-sm mb-2">
            {error?.message === "invalid-email-password"
              ? "Invalid email or password."
              : error?.message === "unverified"
              ? "Please verify your email before signing in."
              : error?.message}
          </p>
        )}

        <div className="flex items-center border rounded w-full p-2 mb-3">
          <IoMail className="text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full outline-none"
            required
          />
        </div>

        <div className="flex items-center border rounded w-full p-2 mb-3">
          <RiLockPasswordLine className="text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700 text-white w-full py-2 rounded mt-2"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        <div className="text-center mt-6">
          <p className="text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
