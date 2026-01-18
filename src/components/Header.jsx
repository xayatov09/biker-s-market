// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { LangContext, translations } from "../I18n";
import { CartContext } from "../data/cartContext";
import {
  FaHeart,
  FaEllipsisV,
  FaMoon,
  FaBell,
  FaShieldAlt,
  FaQuestionCircle,
  FaChevronRight,
} from "react-icons/fa";

export default function Header({ search, setSearch }) {
  const navigate = useNavigate();
  const { lang } = useContext(LangContext);
  const { dark, setDark } = useContext(CartContext);
  const t = translations[lang];

  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [openSettings, setOpenSettings] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const updateCounts = () => {
    setFavoritesCount(JSON.parse(localStorage.getItem("favorites") || "[]").length);
    setCartCount(JSON.parse(localStorage.getItem("cart") || "[]").length);
  };

  useEffect(() => {
    updateCounts();
    window.addEventListener("storage", updateCounts);
    return () => window.removeEventListener("storage", updateCounts);
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    setOpenProfile(false);
    navigate("/profile");
  };

  return (
    <>
      <header className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
        <Link to="/" className="text-xl font-bold text-purple-600 dark:text-purple-400">
          BikeShop
        </Link>

        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500"
        />

        <div className="flex items-center gap-3 relative">
          <button onClick={() => setDark(!dark)} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
            {dark ? "☀️" : "🌙"}
          </button>

          <Link to="/favorites" className="relative p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-red-500">
            <FaHeart />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {favoritesCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/orders" className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">📦</Link>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => {
                if (!user) navigate("/profile");
                else setOpenProfile(!openProfile);
              }}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              👤
            </button>

            {user && openProfile && (
              <div className="absolute right-0 mt-3 w-64 bg-[#0d0d0d] rounded-xl shadow-xl p-4 text-white z-50">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
                <button
                  onClick={logout}
                  className="mt-4 w-full text-left text-red-500 hover:bg-[#1f1f1f] px-3 py-2 rounded-lg"
                >
                  ⎋ Exit
                </button>
              </div>
            )}
          </div>

          <button onClick={() => setOpenSettings(true)} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
            <FaEllipsisV />
          </button>
        </div>
      </header>

      {/* SETTINGS MODAL */}
      {openSettings && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center">
          <div className="w-full max-w-lg bg-[#0d0d0d] rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-semibold mb-6">Settings</h2>
            <div className="space-y-2">
              <SettingsItem icon={<FaMoon />} title="Theme" value={dark ? "Dark" : "Light"} onClick={() => setDark(!dark)} />
              <SettingsItem icon={<FaBell />} title="Notifications" value="Enabled" />
              <SettingsItem icon={<FaShieldAlt />} title="Confidentiality" />
              <SettingsItem icon={<FaQuestionCircle />} title="Help" noBorder />
            </div>
            <button onClick={() => setOpenSettings(false)} className="mt-6 w-full py-3 rounded-xl bg-white text-black font-medium">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function SettingsItem({ icon, title, value, onClick, noBorder }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-4 rounded-xl bg-[#151515] cursor-pointer ${!noBorder && "border-b border-gray-800"}`}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#1f1f1f] flex items-center justify-center">{icon}</div>
        <div>
          <p className="font-medium">{title}</p>
          {value && <p className="text-sm text-gray-400">{value}</p>}
        </div>
      </div>
      <FaChevronRight className="text-gray-400" />
    </div>
  );
}
