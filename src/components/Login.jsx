"use client";

import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { auth, googleProvider, facebookProvider } from "@/firebase/config";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAppleLogin = () => {
    setError("Apple login not supported");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-violet-800 p-4">
    <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        

        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Log in</h2>
        <p className="text-gray-500 mb-6 text-sm">Continue to your app</p>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition mt-4"
          >
            Continue with email
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-4">or</div>

        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={handleAppleLogin}
            className="border p-2 rounded-md hover:bg-gray-100"
          >
            <FaApple className="text-2xl" />
          </button>
          <button
            onClick={handleFacebookLogin}
            className="border p-2 rounded-md hover:bg-gray-100"
          >
            <FaFacebook className="text-2xl text-blue-600" />
          </button>
          <button
            onClick={handleGoogleLogin}
            className="border p-2 rounded-md hover:bg-gray-100"
          >
            <FaGoogle className="text-2xl text-red-500" />
          </button>
        </div>

        <div className="mt-6 text-center text-sm">
          New here? <a className="text-blue-600 hover:underline" href="#">Get started</a>
        </div>

        <div className="mt-4 flex justify-center space-x-4 text-xs text-gray-400">
          <a href="#" className="hover:underline">Help</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
        </div>
      </div>
    </div>
  );
}
