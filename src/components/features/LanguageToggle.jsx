import { useTranslation } from "react-i18next";
import DIconButton from "../DIconButton";
import { FaLanguage } from "react-icons/fa";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === "zh-TW" ? "en-US" : "zh-TW";
    i18n.changeLanguage(newLang);
  };
  return (
    <DIconButton
      onClick={toggleLanguage}
      icon={<FaLanguage style={{ color: "#1976d2" }} />}
      size="medium"
    />
  );
};

export default LanguageToggle;
