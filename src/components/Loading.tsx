import { CircularProgress, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Loading = () => {
  const { t } = useTranslation();

  return (
    <Stack alignItems={"center"}>
      <CircularProgress size={50} color="success" />
      <Typography p={3} variant="h5">
        {t("loading.title")}
      </Typography>
    </Stack>
  );
};

export default Loading;
