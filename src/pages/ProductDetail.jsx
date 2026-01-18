import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { products } from "../data/product";
import { CartContext } from "../data/cartContext";
import FilterPanel from "../components/FilterPanel";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { cart, setCart } = useContext(CartContext);

  const [selectedColor, setSelectedColor] = useState("");

  if (!product) {
    return <p className="p-6 text-red-600">Mahsulot topilmadi</p>;
  }

  const handleAddToCart = () => {
    if (!selectedColor) {
      alert("Iltimos, rang tanlang!");
      return;
    }

    const exists = cart.some(
      (item) =>
        item.id === product.id &&
        item.selectedColor === selectedColor
    );

    if (exists) {
      alert("Bu mahsulot bu rang bilan savatda bor");
      return;
    }

    const updatedCart = [
      ...cart,
      { ...product, selectedColor },
    ];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Mahsulot savatga qo‘shildi!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-md rounded mb-4"
        />
      )}

      {/* Rang tanlash */}
      <FilterPanel
        colors={product.color}
        onSelectColor={setSelectedColor}
      />

      <p className="text-xl text-purple-600 font-semibold mb-2">
        Narxi: ${product.price}
      </p>

      {product.description && (
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          {product.description}
        </p>
      )}

      <button
        onClick={handleAddToCart}
        className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition"
      >
        Savatga qo‘shish
      </button>
    </div>
  );
}
