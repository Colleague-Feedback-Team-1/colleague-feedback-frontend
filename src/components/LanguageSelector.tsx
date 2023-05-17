import { Button, Stack } from "@mui/material";
import i18next from "i18next";
import { useState } from "react";

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const handleChange = (value: string) => {
    i18next.changeLanguage(value);
    setCurrentLanguage(value);
  };

  return (
    <Stack direction={"row"}>
      <Button
        sx={{
          padding: "0.5rem",
          minWidth: 0,
          color: currentLanguage == "en" ? "white" : "gray",
        }}
        onClick={() => handleChange("en")}
      >
        EN
      </Button>
      <Button
        sx={{
          padding: "0.5rem",
          marginRight: "1.5rem",
          minWidth: 0,
          color: currentLanguage == "fi" ? "white" : "gray",
        }}
        onClick={() => handleChange("fi")}
      >
        FI
      </Button>
    </Stack>
  );
};

export default LanguageSelector;
