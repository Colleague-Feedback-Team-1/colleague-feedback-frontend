import { useForm, Controller } from "react-hook-form";
import { QuestionSection, CustomFormData } from "../types/types";
import {
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Button,
  Stack,
  Box,
  Grid,
} from "@mui/material";

interface CustomFormProps {
  data: QuestionSection[];
  onSubmit: (data: CustomFormData) => void;
}

const FeedbackForm: React.FC<CustomFormProps> = ({ data, onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<CustomFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {data.map((section) => (
        <Grid container direction="column" alignItems="center" key={section._id}>
          <Typography variant="h6" sx={{ marginBottom: "0.6rem" }}>
            {section.sectionName}
          </Typography>
          <Stack
            direction="row"
            spacing={5}
            sx={{
              marginBottom: "50px",
              padding: "20px",
              width: "90%",
              backgroundColor: "hsl(0deg 5.71% 86.27% / 14.9%)",
              boxShadow:"0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
              borderRadius:"4px"
            }}
          >
            <Stack direction={"column"} sx={{ width: "100%" }}>
              {section.questions.map((question) => (
                <Box key={question._id} marginBottom={2}>
                  <Typography
                    variant="body1"
                    padding={"10px 0"}
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
                          sx={{ 
                            alignItems: "center", 
                            justifyContent: "center",
                            margin: '0.8rem 0'
                          }}
                        >
                          <Typography color={"red"}>
                            Strongly <br /> Disagree
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
                          <Typography color={"green"}>
                            Strongly <br /> Agree
                          </Typography>
                        </Stack>
                      )}
                    />
                  )}
                </Box>
              ))}
            </Stack>
          </Stack>
        </Grid>
      ))}
      <Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid}
        >
          Submit Feedback
        </Button>
      </Box>
    </form>
  );
};

export default FeedbackForm;
