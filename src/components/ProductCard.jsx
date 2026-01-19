import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingCart, FaTrash, FaTimes } from "react-icons/fa";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const getFavorites = () =>
    JSON.parse(localStorage.getItem("favorites") || "[]");

  const getCart = () =>
    JSON.parse(localStorage.getItem("cart") || "[]");

  const saveFavorites = (data) =>
    localStorage.setItem("favorites", JSON.stringify(data));

  const saveCart = (data) =>
    localStorage.setItem("cart", JSON.stringify(data));

  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsFavorite(getFavorites().some(p => p.id === product.id));
    setIsInCart(getCart().some(p => p.id === product.id));
  }, [product.id]);


  const toggleFavorite = () => {
    let favorites = getFavorites();

    if (favorites.some(p => p.id === product.id)) {
      favorites = favorites.filter(p => p.id !== product.id);
      setIsFavorite(false);
    } else {
      favorites.push(product);
      setIsFavorite(true);
    }

    saveFavorites(favorites);
    window.dispatchEvent(new Event("storage"));
  };

  const addToCart = () => {
    let cart = getCart();
    if (!cart.some(p => p.id === product.id)) {
      cart.push({ ...product, quantity: 1 });
      saveCart(cart);
      setIsInCart(true);
      window.dispatchEvent(new Event("storage"));
    }
  };

  const removeFromCart = () => {
    const cart = getCart().filter(p => p.id !== product.id);
    saveCart(cart);
    setIsInCart(false);
    window.dispatchEvent(new Event("storage"));
  };

  const buyNow = () => {
    navigate("/checkout", {
      state: {
        cart: [{ ...product, quantity: 1 }],
      },
    });
  };



  return (
    <div className="relative rounded-2xl ">

      <div
        onClick={() => setShowModal(true)}
        className="dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-black dark:text-white rounded-2xl overflow-hidden transition hover:shadow-lg cursor-pointer"
      >

        <div className="w-full h-48 bg-gray-100 dark:bg-gray-800">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform hover:scale-95"
            onError={(e) => (e.target.src = "/no-image.png")}
          />
        </div>


        <div className="p-4 bg-white dark:text-white dark:bg-gray-900">
          <h3 className="font-semibold dark:text-white text-lg line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
            {product.description}
          </p>
          <p className="mt-2 font-bold text-purple-600 dark:text-purple-400">
            ${product.price}
          </p>


          <div className="flex items-center gap-2 mt-4">
            {!isInCart ? (
              <button
                onClick={(e) => { e.stopPropagation(); addToCart(); }}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
              >
                <FaShoppingCart />
                Add to Cart
              </button>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); removeFromCart(); }}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                <FaTrash />
                Remove
              </button>
            )}

            <button
              onClick={(e) => { e.stopPropagation(); toggleFavorite(); }}
              className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-700 dark:text-gray-200" />}
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); buyNow(); }}
              className="flex bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

   
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md relative"
          >

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <FaTimes />
            </button>


            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-xl mb-4"
            />

     
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{product.description}</p>
            <p className="mt-2 font-bold text-purple-600 dark:text-purple-400">${product.price}</p>


            <div className="mt-4 text-sm text-gray-500 dark:text-gray-300">
              Color: {product.color || "Default"} <br />
              Size: {product.size || "N/A"} <br />
              Stock: {product.stock || "Available"}
            </div>

            <div className="flex items-center gap-2 mt-4">
              {!isInCart ? (
                <button
                  onClick={addToCart}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              ) : (
                <button
                  onClick={removeFromCart}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  <FaTrash /> Remove
                </button>
              )}

              <button
                onClick={toggleFavorite}
                className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-700 dark:text-gray-200" />}
              </button>

              <button
                onClick={buyNow}
                className="flex bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
