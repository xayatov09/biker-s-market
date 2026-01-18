import React from "react";

const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-wide">
            XUPING <span className="font-light">JEWELRY</span>
          </h1>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold mb-6">
          Kirish
        </h2>

        {/* Phone number */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Raqamingiz
          </label>
          <input
            type="tel"
            placeholder="+998 90 123 45 67"
            className="w-full border border-gray-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Parolni kiriting
          </label>
          <input
            type="password"
            placeholder="****"
            className="w-full border border-gray-300 rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Button */}
        <button
          className="w-full bg-purple-600 hover:bg-purple-700
                     text-white font-semibold py-2 rounded-lg transition"
        >
          Kirish
        </button>

      </div>
    </div>
  );
};

export default Auth;