import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(stored);
  }, []);

  const cancelOrder = (id) => {
    if (!window.confirm("Buyurtmani bekor qilmoqchimisiz?")) return;

    const updated = orders.filter(order => order.id !== id);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  if (orders.length === 0) {
    return (
      <p className="p-6 text-center dark:text-white">
        No orders yet.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold dark:text-white">My Orders</h1>

      {orders.map(order => (
        <div
          key={order.id}
          className="border rounded p-4 space-y-2 dark:bg-gray-900"
        >
          <div className="flex justify-between dark:text-white">
            <span>ID: #{order.id}</span>
            <span>{order.date}</span>
          </div>

          <div className="dark:text-gray-400">
            <p>Status: {order.status}</p>
            <p>Subtotal: ${order.subtotal}</p>
            <p>Chegirma: {order.discount}%</p>
            <p className="font-bold">
              Jami: ${order.finalTotal}
            </p>
          </div>

          <div className="mt-2 text-sm text-gray-600">
            {order.items.map((item, i) => (
              <p key={i}>
                • {item.name} × {item.quantity}
              </p>
            ))}
          </div>

          {/* Cancel button */}
          <button
            onClick={() => cancelOrder(order.id)}
            className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Bekor qilish
          </button>
        </div>
      ))}
    </div>
  );
}
