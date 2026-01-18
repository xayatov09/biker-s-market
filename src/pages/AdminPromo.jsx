import { useEffect, useState } from "react";

export default function AdminPromo() {
  const [codes, setCodes] = useState([]);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("promoCodes") || "[]"
    );
    setCodes(stored);
  }, []);

  const saveCodes = (updated) => {
    setCodes(updated);
    localStorage.setItem("promoCodes", JSON.stringify(updated));
  };

  const addCode = () => {
    if (!code || !discount) {
      alert("Maʼlumotlarni to‘ldiring");
      return;
    }

    const exists = codes.some(
      (c) => c.code === code.toUpperCase()
    );

    if (exists) {
      alert("Bu promo code mavjud");
      return;
    }

    const updated = [
      ...codes,
      {
        code: code.toUpperCase(),
        discount: Number(discount),
      },
    ];

    saveCodes(updated);
    setCode("");
    setDiscount("");
  };

  const removeCode = (code) => {
    const updated = codes.filter(c => c.code !== code);
    saveCodes(updated);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Promo Code Admin
      </h1>

      {/* ADD */}
      <div className="border p-4 rounded mb-6 space-y-3">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Promo code"
          className="border px-3 py-2 rounded w-full"
        />

        <input
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Chegirma (%)"
          type="number"
          className="border px-3 py-2 rounded w-full"
        />

        <button
          onClick={addCode}
          className="w-full bg-purple-600 text-white py-2 rounded"
        >
          Qo‘shish
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {codes.length === 0 && (
          <p className="text-gray-500">
            Promo code yo‘q
          </p>
        )}

        {codes.map((c) => (
          <div
            key={c.code}
            className="flex justify-between items-center border p-3 rounded"
          >
            <span>
              <b>{c.code}</b> — {c.discount}%
            </span>

            <button
              onClick={() => removeCode(c.code)}
              className="text-red-500"
            >
              O‘chirish
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
