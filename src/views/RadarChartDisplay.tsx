import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RadarChartComponent from "../components/RadarChart";
import { FeedbackSection } from "../types/types";
import Loading from "../components/Loading";

type FeedbackCustomType = {
  sectionName: string;
  average: number;
};

const RadarChartDisplay = () => {
  const [totalData, setTotalData] = useState<FeedbackCustomType[]>([]);
  const [chartData, setChartData] = useState<any>([]);
  const [revieweeData, setRevieweeData] = useState<FeedbackCustomType[]>([]);
  const [reviewerData, setReviewerData] = useState<FeedbackCustomType[]>([]);
  const [managerData, setManagerData] = useState<FeedbackCustomType[]>([]);
  const { requestId } = useParams<{ requestId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const baseChartData = [
    {
      sectionName: "Quality focus",
    },
    {
      sectionName: "People skills",
    },
    {
      sectionName: "Self guidance",
    },
    {
      sectionName: "Leadership",
    },
    {
      sectionName: "Readiness for change",
    },
    {
      sectionName: "Creativity",
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4500/api/feedback-data/${requestId}`
        );
        const data = response.data;

        const formattedChartData = data.answersBySection
          .filter(
            (section: any) => section.sectionName !== "General evaluation"
          )
          .map((section: any) => ({
            sectionName: section.sectionName,
            average: (
              section.score.reduce(
                (sum: number, score: any) => sum + score.average,
                0
              ) / section.score.length
            ).toFixed(2),
          }));

        setTotalData(formattedChartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchDataByRole = async () => {
      await axios
        .get(`http://localhost:4500/api/feedback-data/${requestId}/reviewee`)
        .then((res) => {
          const data = res.data.answersBySection.map(
            (item: FeedbackSection) => ({
              sectionName: item.sectionName,
              average: item.score[0].average,
            })
          );
          setRevieweeData(data);
        });
      await axios
        .get(`http://localhost:4500/api/feedback-data/${requestId}/manager`)
        .then((res) => {
          const data = res.data.answersBySection.map(
            (item: FeedbackSection) => ({
              sectionName: item.sectionName,
              average: item.score[0].average,
            })
          );
          setManagerData(data);
        });
      await axios
        .get(`http://localhost:4500/api/feedback-data/${requestId}/reviewer`)
        .then((res) => {
          const data = res.data.answersBySection.map(
            (item: FeedbackSection) => ({
              sectionName: item.sectionName,
              average: (
                item.score.reduce(
                  (sum: number, score: any) => sum + score.average,
                  0
                ) / item.score.length
              ).toFixed(2),
            })
          );
          setReviewerData(data);
        });
    };

    fetchData();
    fetchDataByRole();
  }, [requestId]);

  useEffect(() => {
    setTimeout(() => {
      function createChartData() {
        const chartData1 = baseChartData.map((item) => {
          const matchingReviewer = reviewerData.find(
            (section: any) => section.sectionName === item.sectionName
          );
          const matchingManager = managerData.find(
            (section: any) => section.sectionName === item.sectionName
          );
          const matchingReviewee = revieweeData.find(
            (section: any) => section.sectionName === item.sectionName
          );
          const matchingTotal = totalData.find(
            (section: any) => section.sectionName === item.sectionName
          );

          return {
            ...item,
            reviewer: matchingReviewer ? matchingReviewer.average : null,
            manager: matchingManager ? matchingManager.average : null,
            reviewee: matchingReviewee ? matchingReviewee.average : null,
            average: matchingTotal ? matchingTotal.average : null,
          };
        });
        console.log("Done creating chart data: ", chartData1);
        setChartData(chartData1);
      }
      createChartData();
      setIsLoading(false);
    }, 3000);
  }, [reviewerData]);

  return (
    <>{isLoading ? <Loading /> : <RadarChartComponent data={chartData} />}</>
  );
};

export default RadarChartDisplay;
