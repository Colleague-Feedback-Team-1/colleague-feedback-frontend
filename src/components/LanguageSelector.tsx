import { Button } from "@mui/material";
import i18next from "i18next";

const LanguageSelector = () => {
  const handleChange = (value: string) => {
    i18next.changeLanguage(value);
  };

  return (
    <div>
      <Button sx={{ marginLeft: "0.5em" }} onClick={() => handleChange("en")}>
        English
      </Button>
      <Button onClick={() => handleChange("fi")}>Suomi</Button>
    </div>
  );
};

export default LanguageSelector;
