import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import FeedbackForm from '../components/FeedbackForm'
import { Section, CustomFormData} from '../types/types'
import Loading from '../components/Loading'
import FormIntro from '../assets/FormIntro'
import UserContext from '../context/UserContext'
import { UserContextProps } from '../types/types'
import { Container, Box, CssBaseline } from '@mui/material'
import { useParams } from 'react-router-dom'

function App() {
  const params = useParams()
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

  const handleSubmit = async (formData: CustomFormData) => {
    const sections = Object.entries(formData.answers).map(([sectionId, sectionData]) => {
      const sectionName = data.find((section) => section._id === sectionId)?.sectionName;
      const questions = Object.entries(sectionData).map(([questionId, answer]) => {
        const question = data
          .flatMap((section) => section.questions)
          .find((question) => question._id === questionId);
  
        return question?.isFreeForm
          ? { openFeedback: answer }
          : { score: Number(answer) };
      });
  
      return { sectionName, questions };
    });
  
    const requestData = {
      requestid: params.requestId, 
      employeeid: user?._id, 
      sections,
    };
    console.log(requestData);
  
    try {
      await axios.post('http://localhost:4500/api/feedback-data/insert-feedback', requestData);
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

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
