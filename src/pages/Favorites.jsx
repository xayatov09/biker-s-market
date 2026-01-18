import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
  }, []);

  // ======================
  // REMOVE FROM FAVORITES
  // ======================
  const removeFavorite = (id) => {
    const updated = favorites.filter(item => item.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // ======================
  // ADD TO CART
  // ======================
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!cart.some(p => p.id === product.id)) {
      cart.push({ ...product, quantity: 1, selectedColor: "Default" });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Cartga qo‘shildi");
    }
  };

  // ======================
  // BUY NOW
  // ======================
  const buyNow = (product) => {
    navigate("/checkout", {
      state: {
        cart: [
          {
            ...product,
            quantity: 1,
            selectedColor: "Default",
          },
        ],
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold dark:text-white">
        Favorite products
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mt-4">
        {favorites.length === 0 ? (
          <p className="dark:text-white">There are no favorite products</p>
        ) : (
          favorites.map(product => (
            <div
              key={product.id}
              className="dark:border-gray-800 border p-4 rounded shadow"
            >
              <h3 className="dark:text-white font-semibold">
                {product.name}
              </h3>

              <p className="dark:text-white">${product.price}</p>

              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover mt-2 rounded"
                />
              )}

              <div className="flex gap-2 mt-4 flex-wrap">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-500 text-white py-1 px-3 rounded"
                >
                  Add to cart
                </button>

                <button
                  onClick={() => buyNow(product)}
                  className="bg-green-500 text-white py-1 px-3 rounded ml-5"
                >
                  Buy now
                </button>

                <button
                  onClick={() => removeFavorite(product.id)}
                  className="ml-30 bg-red-500 text-white py-1 px-3 rounded flex items-center gap-1"
                >
                  <FaTrash />
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
