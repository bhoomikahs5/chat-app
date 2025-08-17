import React, { useEffect, useState } from "react";
import { useSignUpEmailPassword } from "@nhost/react";
import { Link, useNavigate } from "react-router-dom";

import { IoMail } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegSmile } from "react-icons/fa"; // 👋 or 😀 welcome icon

export default function SignUp() {
  const navigate = useNavigate();
  const { signUpEmailPassword, isLoading, isSuccess, isError, error } =
    useSignUpEmailPassword();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUpEmailPassword(email, password);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 px-4">
      {/* 🔥 Heading at top */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-purple-700 flex items-center justify-center gap-2">
          Welcome to Chat App <FaRegSmile className="text-yellow-500" />
        </h1>
        <p className="text-gray-600 mt-1">Create your account to get started 🚀</p>
      </div>

      {/* SignUp form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm border-2 border-amber-400"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>

        {isError && (
          <p className="text-red-600 text-sm mb-2">{error?.message}</p>
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
          className="bg-purple-600 hover:bg-purple-700 text-white w-full py-2 rounded"
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </button>

        <div className="text-center mt-6">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
