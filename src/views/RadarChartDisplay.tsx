import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RadarChartComponent from '../components/RadarChart';


const RadarChartDisplay = () => {
  const [chartData, setChartData] = useState([]);
  const { requestId } = useParams<{ requestId: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/api/feedback-data/${requestId}`);
        const data = response.data;

        const formattedChartData = data.answersBySection
          .filter((section: any) => section.sectionName !== 'General evaluation')
          .map((section: any) => ({
            sectionName: section.sectionName,
            average:
              section.score.reduce((sum: number, score: any) => sum + score.average, 0) /
              section.score.length,
          }));

        setChartData(formattedChartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [requestId]);

  return <RadarChartComponent data={chartData} />;
};

export default RadarChartDisplay;
