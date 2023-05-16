// imports
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Section, QuestionSection, CustomFormData } from "../types/types";
import { useTranslation } from "react-i18next";

import {
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Button,
  Stack,
  Box,
} from "@mui/material";

interface CustomFormProps {
  data: QuestionSection[];
  onSubmit: (data: CustomFormData) => void;
}

const FeedbackForm: React.FC<CustomFormProps> = ({ data, onSubmit }) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<CustomFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {data.map((section) => (
         <Grid key={section._id} container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h6">{section.sectionName}</Typography>
          </Grid>
          {section.questions.map((question) => (
            <Grid item key={question._id}>
              <Typography variant="body1">{question.question}</Typography>
              {question.isFreeForm ? (
                <Controller
                  name={`answers.${section._id}.${question._id}`}
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => <TextField {...field} variant="outlined" fullWidth />}
                />
              ) : (
        <Stack
          key={section._id}
          direction="row"
          spacing={5}
          sx={{
            backgroundColor: "#ffdbeb",
            border: "1px solid black",
            marginBottom: "50px",
            padding: "20px",
          }}
        >
          <Stack
            justifyContent={"center"}
            textAlign={"left"}
            maxWidth={"190px"}
          >
            <Typography variant="h4">
              {section.sectionName.toUpperCase()}
            </Typography>
          </Stack>
          <Stack direction={"column"} sx={{ width: "100%" }}>
            {section.questions.map((question) => (
              <Box key={question._id}>
                <Typography
                  variant="body1"
                  fontWeight={"bold"}
                  padding={"10px 0"}
                  textAlign={"justify"}
                >
                  {question.question}:
                </Typography>
                {question.isFreeForm ? (
                  <Controller
                    name={`answers.${section._id}.${question._id}`}
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} variant="outlined" fullWidth />
                    )}
                  />
                ) : (
                  <Controller
                    name={`answers.${section._id}.${question._id}`}
                    rules={{ required: true }}
                    control={control}
                    defaultValue={"3"}
                    render={({ field }) => (
                      <Stack
                        direction={"row"}
                        spacing={2}
                        sx={{ alignItems: "center", justifyContent: "center" }}
                      >
                        <Typography color={"red"} fontWeight={"bold"}>
                      {t("FeedbackForm.bad")}
                        </Typography>
                        <RadioGroup {...field} row>
                          {[1, 2, 3, 4, 5].map((value) => (
                            <FormControlLabel
                              key={value}
                              value={value.toString()} // React Hook Form requires string values
                              control={<Radio />}
                              label={value}
                            />
                          ))}
                        </RadioGroup>
                        <Typography color={"green"} fontWeight={"bold"}>
                           {t("FeedbackForm.good")}
                        </Typography>
                      </Stack>
                    )}
                  />
                )}
              </Box>
            ))}
          </Stack>
        </Stack>
                     )}
                />
              )}
            </Grid>
          ))}
        </Grid>
      ))}
      <Grid item>
      ))}
      <Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
            {t("FeedbackForm.submit")}
          Submit Feedback

        </Button>
      </Box>
    </form>
  );
};

export default FeedbackForm;
