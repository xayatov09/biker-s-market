import { useEffect, useState } from "react";
import { LangContext } from "../I18n";
import { CartContext } from "../data/cartContext";

export default function Providers({ children }) {
  const [lang, setLang] = useState("uz");
  const [cart, setCart] = useState([]);
  const [dark, setDark] = useState(false);

  // 🔥 DARK MODE GLOBAL
  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <CartContext.Provider
        value={{
          cart,
          setCart,
          dark,
          setDark,
        }}
      >
        {children}
      </CartContext.Provider>
    </LangContext.Provider>
  );
}
