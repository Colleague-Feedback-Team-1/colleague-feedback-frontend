// imports
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Section, CustomFormData } from '../types/types'
import { useTranslation } from "react-i18next";
import {
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Grid,
  Button,
  Stack,
} from '@mui/material'

interface CustomFormProps {
  data: Section[]
  onSubmit: (data: CustomFormData) => void
}

const FeedbackForm: React.FC<CustomFormProps> = ({ data, onSubmit }) => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<CustomFormData>()

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
                <Controller
                  name={`answers.${section._id}.${question._id}`}
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Stack
                      direction={'row'}
                      spacing={2}
                      sx={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Typography>{t("FeedbackForm.bad")}</Typography>
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
                      <Typography>
                      {t("FeedbackForm.good")}</Typography>
                    </Stack>
                  )}
                />
              )}
            </Grid>
          ))}
        </Grid>
      ))}
      <Grid item>
        <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
        {t("FeedbackForm.submit")}
        </Button>
      </Grid>
    </form>
  )
}

export default FeedbackForm
