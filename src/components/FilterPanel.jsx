import { useState } from "react";

export default function FilterPanel({ colors, onChange }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (color) => {
    setSelected(color);
    onChange(color);
  };

  return (
    <div className="my-4">
      <p className="font-semibold mb-2">Rang tanlang:</p>

      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => handleSelect(color)}
            className={`px-3 py-1 border rounded
              ${selected === color ? "bg-black text-white" : "bg-white"}`}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  );
}
