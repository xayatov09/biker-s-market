import { useContext } from "react";
import { LangContext } from "../I18n";

export default function LanguageSwitcher() {
  const { lang, setLang } = useContext(LangContext);

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      className="border rounded px-2"
    >
      <option value="uz">UZ</option>
      <option value="ru">RU</option>
      <option value="en">EN</option>
    </select>
  );
}
