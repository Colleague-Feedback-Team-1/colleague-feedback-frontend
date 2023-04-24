// imports
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Grid,
  Button,
} from '@mui/material'

interface Question {
  question: string
  isFreeForm: boolean
  _id: string
}

interface Section {
  _id: string
  sectionName: string
  questions: Question[]
  __v: number
}

interface FormData {
  answers: {
    [sectionId: string]: {
      [questionId: string]: string | number
    }
  }
}

interface CustomFormProps {
  data: Section[]
  onSubmit: (data: FormData) => void
}

const FeedbackForm: React.FC<CustomFormProps> = ({ data, onSubmit }) => {
  const { handleSubmit, control } = useForm<FormData>()

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
                  control={control}
                  render={({ field }) => <TextField {...field} variant="outlined" fullWidth />}
                />
              ) : (
                <Controller
                  name={`answers.${section._id}.${question._id}`}
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <FormControlLabel
                          key={value}
                          value={value.toString()} // Convert the value to a string, as the answer could be a string or number
                          control={<Radio />}
                          label={value}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
              )}
            </Grid>
          ))}
        </Grid>
      ))}
      <Grid item>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Grid>
    </form>
  )
}

export default FeedbackForm
