// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [welcome, setWelcome] = useState(false);

  const saveUser = () => {
    const user = { name: email.split("@")[0], email };
    localStorage.setItem("user", JSON.stringify(user));
    window.dispatchEvent(new Event("user-changed"));
    setWelcome(true);
  };

  const login = () => {
    if (!email || !password) return setError("Fill in all fields");
    setError("");
    saveUser();
  };

  const register = () => {
    if (!email || !password || !confirm)
      return setError("Fill in all fields");
    if (password !== confirm)
      return setError("Passwords do not match");
    setError("");
    saveUser();
  };

  useEffect(() => {
    if (welcome) {
      const timer = setTimeout(() => navigate("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [welcome, navigate]);

  if (welcome) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <h1 className="text-3xl font-semibold dark:text-white">
          Welcome to BikeShop
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-900 px-4">
      
      {/* GRADIENT BORDER WRAPPER */}
      <div className="
        p-[2px] sm:p-[3px] rounded-2xl
        bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
        hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500
        transition-all duration-500
      ">
        {/* CARD */}
        <div className="
          relative w-full max-w-md p-8
          bg-gray-300 dark:bg-gray-900
          rounded-2xl
          shadow-xl
        ">
          {/* CLOSE BUTTON */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 text-2xl font-bold 
            text-gray-600 dark:text-white
            hover:text-red-500 transition"
          >
            ×
          </button>

          <h1 className="text-3xl mb-6 text-center dark:text-white">
            {mode === "login" ? "Access" : "Registration"}
          </h1>

          <input
            className="w-full mb-3 p-3 rounded bg-white dark:bg-gray-800 dark:text-white"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full mb-3 p-3 rounded bg-white dark:bg-gray-800 dark:text-white"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {mode === "register" && (
            <input
              type="password"
              className="w-full mb-3 p-3 rounded bg-white dark:bg-gray-800 dark:text-white"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          )}

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <button
            onClick={mode === "login" ? login : register}
            className="w-full py-3 bg-gray-800 text-white dark:bg-blue-700 dark:text-white rounded font-semibold cursor-pointer"
          >
            {mode === "login" ? "Enter" : "Register"}
          </button>

          <p className="text-center mt-4 text-sm text-gray-500">
            {mode === "login" ? (
              <span
                onClick={() => setMode("register")}
                className="text-blue-500 cursor-pointer"
              >
                Sign up
              </span>
            ) : (
              <span
                onClick={() => setMode("login")}
                className="text-blue-500 cursor-pointer"
              >
                Log in
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
