// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" yoki "register"
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

  const register = () => {
    if (!email || !password || !confirm) return setError("Barcha maydonlarni to‘ldiring");
    if (password !== confirm) return setError("Parollar mos emas");
    saveUser();
  };

  const login = () => {
    if (!email || !password) return setError("Email va parolni to‘ldiring");
    saveUser();
  };

  useEffect(() => {
    if (welcome) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [welcome, navigate]);

  if (welcome) {
    return (
      <div className="dark:bg-gray-900 min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <h1 className="text-3xl font-semibold dark:text-white">Welcome 🎉</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="w-full max-w-md p-8 bg-gray-100 dark:bg-gray-900 rounded-xl">
        <h1 className="text-2xl mb-6 text-center dark:text-white">
          {mode === "login" ? "Kirish" : "Ro'yxatdan o'tish"}
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
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {mode === "register" && (
          <input
            type="password"
            className="w-full mb-3 p-3 rounded bg-white dark:bg-gray-800 dark:text-white"
            placeholder="Parolni tasdiqlang"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        )}

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={mode === "login" ? login : register}
          className="w-full py-3 bg-black text-white dark:bg-white dark:text-black rounded"
        >
          {mode === "login" ? "Kirish" : "Ro'yxatdan o'tish"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-500">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setMode("register")}
                className="text-blue-500 cursor-pointer"
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Do you have an account?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-blue-500 cursor-pointer"
              >
                Log in
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
