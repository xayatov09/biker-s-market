import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    // agar quantity bo‘lmasa, 1 qilib qo‘yamiz
    const withQty = storedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCart(withQty);
  }, []);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index].quantity += 1;
    updateCart(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cart];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      updateCart(updated);
    }
  };

  const removeFromCart = (id, color) => {
    const updated = cart.filter(
      item => !(item.id === id && item.selectedColor === color)
    );
    updateCart(updated);
  };

  const handleCheckout = () => {
    navigate("/checkout", {
      state: { cart },
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Basket
      </h1>

      {cart.length === 0 ? (
        <p className="dark:text-white">Cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border rounded p-4 dark:bg-gray-900"
              >
                <div className="dark:text-white">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>${item.price}</p>
                  
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded mt-2"
                    />
                  )}
                </div>

                {/* QTY */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(index)}
                    className="px-3 py-1 border rounded"
                  >
                    −
                  </button>

                  <span className="min-w-[20px] text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(index)}
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>
                </div>

                {/* DELETE */}
                <button
                  onClick={() =>
                    removeFromCart(item.id, item.selectedColor)
                  }
                  className="text-red-500 text-xl"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* CHECKOUT */}
          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700"
          >
            Buy Now
          </button>
        </>
      )}
    </div>
  );
}
