import { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackForm from '../components/FeedbackForm';
import Loading from '../components/Loading';
import FormIntro from '../assets/FormIntro';
import { Container, Box, CssBaseline } from '@mui/material';

interface Section {
  _id: string;
  sectionName: string;
  questions: Question[];
  __v: number;
}

interface Question {
  question: string;
  isFreeForm: boolean;
  _id: string;
}

function App() {
  const [data, setData] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4500/api/questions/');
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (formData: any) => {
    console.log(formData);
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
  );
}

export default App;