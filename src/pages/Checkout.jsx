import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PROMO_CODES = {
  SALE10: 10,
  XUPING20: 20,
};

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cart = state?.cart || [];

  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (cart.length === 0) navigate("/cart");
  }, [cart, navigate]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const applyPromo = () => {
    const code = promo.toUpperCase();
    if (PROMO_CODES[code]) {
      setDiscount(PROMO_CODES[code]);
    } else {
      alert("Promo code noto‘g‘ri");
      setDiscount(0);
    }
  };

  const placeOrder = () => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");

    const newOrder = {
      id: Date.now(),
      items: cart,
      subtotal,
      discount,
      finalTotal: total,
      date: new Date().toLocaleString(),
      status: "Qabul qilindi",
    };

    localStorage.setItem(
      "orders",
      JSON.stringify([...orders, newOrder])
    );

    localStorage.removeItem("cart");

    navigate("/orders");
  };

  if (cart.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* PRODUCTS */}
      <div className="md:col-span-2 space-y-4">
        {cart.map((item, i) => (
          <div key={i} className="flex gap-4 border rounded p-4 dark:text-gray-600">
            <img
              src={item.image}
              className="w-28 h-28 object-cover rounded"
            />
            <div className="dark:text-white">
              <h3 className="font-semibold">{item.name}</h3>
              <p>Rang: {item.selectedColor}</p>
              <p>Soni: {item.quantity}</p>
              <p className="font-medium">
                ${item.price * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="border rounded p-6 h-fit">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Buyurtma xulosasi
        </h2>

        <div className="flex justify-between mb-2 dark:text-white">
          <span>Subtotal:</span>
          <span>${subtotal}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between mb-2 text-green-600 dark:text-white">
            <span>Chegirma ({discount}%):</span>
            <span>- ${discountAmount}</span>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <input
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="Promo code"
            className="border px-3 py-2 rounded w-full dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={applyPromo}
            className="bg-gray-800 text-white px-4 rounded dark:bg-gray-600 hover:bg-gray-700 dark:hover:bg-gray-500"
          >
            OK
          </button>
        </div>

        <hr className="my-4 dark:border-gray-700" />

        <div className="flex justify-between font-bold text-lg mb-6 dark:text-white">
          <span>Jami:</span>
          <span>${total}</span>
        </div>

        <button
          onClick={placeOrder}
          className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700"
        >
          Buyurtma berish
        </button>
      </div>
    </div>
  );
}
