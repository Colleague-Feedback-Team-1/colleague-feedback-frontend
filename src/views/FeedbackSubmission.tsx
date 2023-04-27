import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import FeedbackForm from '../components/FeedbackForm'
import { Section, CustomFormData } from '../types/types'
import Loading from '../components/Loading'
import FormIntro from '../assets/FormIntro'
import UserContext from '../context/UserContext'
import { UserContextProps } from '../types/types'
import { Container, Box, CssBaseline } from '@mui/material'
import { useParams } from 'react-router-dom'

type RouteParams = {
  requestId: string;
};

function App() {
  const params = useParams<RouteParams>();
  const [data, setData] = useState<Section[]>([])
  const { user } = useContext<UserContextProps>(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4500/api/questions/')
        setData(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const fetchRequestByRequestId = async (requestId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:4500/api/review-requests/by-requestid/${requestId}`
      )
      return response.data
    } catch (error) {
      console.error('Error fetching request data:', error)
      return null
    }
  }

  const submitFeedback = async (requestData: any) => {
    try {
      await axios.post('http://localhost:4500/api/feedback-data/insert-feedback', requestData)
      console.log('Form submitted successfully')
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const updateReviewerFeedbackStatus = async (requestId: string, reviewerObjectId: string) => {
    try {
      await axios.patch(
        `http://localhost:4500/api/review-requests/update-status/${requestId}/${reviewerObjectId}`,
        { feedbackSubmitted: true }
      )
    } catch (error) {
      console.error('Error updating reviewer feedback status:', error)
    }
  }

  const handleSubmit = async (formData: CustomFormData) => {
    if (params.requestId) {
      const request = await fetchRequestByRequestId(params.requestId)
      const employeeId = request?.employeeid
      const reviewerData = request?.reviewers.find(
        (reviewer: any) => reviewer.reviewerid === user?._id
      )

      const sections = Object.entries(formData.answers).map(([sectionId, sectionData]) => {
        const sectionName = data.find((section) => section._id === sectionId)?.sectionName
        const questions = Object.entries(sectionData).map(([questionId, answer]) => {
          const question = data
            .flatMap((section) => section.questions)
            .find((question) => question._id === questionId)

          return question?.isFreeForm ? { openFeedback: answer } : { score: Number(answer) }
        })

        return { sectionName, questions }
      })

      const requestData = {
        requestid: params.requestId,
        employeeid: employeeId,
        sections,
      }

      try {
        await submitFeedback(requestData)
        console.log('Form submitted successfully')

        if (reviewerData && reviewerData._id) {
          await updateReviewerFeedbackStatus(params.requestId, reviewerData._id)
        }
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    } else {
      console.error('Request ID is undefined')
    }
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Box my={4}>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <FormIntro />
              <FeedbackForm data={data} onSubmit={handleSubmit} />
            </>
          )}
        </Box>
      </Container>
    </>
  )
}

export default App
