import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

interface ChartData {
  sectionName: string;
  average: number;
}

interface RadarChartProps {
  data: ChartData[];
}

const RadarChartComponent: React.FC<RadarChartProps> = ({ data }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={750}>
        <RadarChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          cx="50%"
          cy="50%"
          outerRadius="80%"
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="sectionName" />
          <PolarRadiusAxis angle={30} domain={[0, 5]} tickCount={6} />
          <Radar
            name="Average"
            dataKey="average"
            stroke="#8884d8"
            strokeWidth={3}
            fill="none"
            fillOpacity={0.6}
            dot={{ fill: "#8884d8", strokeWidth: 0, r: 4 }}
          />
          <Radar
            name="Manager"
            dataKey="manager"
            stroke="red"
            strokeWidth={3}
            fill="none"
            fillOpacity={0.6}
            dot={{ fill: "red", strokeWidth: 0, r: 4 }}
          />
          <Radar
            name="Reviewer"
            dataKey="reviewer"
            stroke="blue"
            strokeWidth={3}
            fill="none"
            fillOpacity={0.6}
            dot={{ fill: "blue", strokeWidth: 0, r: 4 }}
          />
          <Radar
            name="Self Review"
            dataKey="reviewee"
            stroke="green"
            strokeWidth={3}
            fill="none"
            fillOpacity={0.6}
            dot={{ fill: "green", strokeWidth: 0, r: 4 }}
          />
          <Tooltip />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
      {/* <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid />
          <XAxis dataKey="sectionName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="manager" fill="red" />
          <Bar dataKey="reviewer" fill="blue" />
          <Bar dataKey="reviewee" fill="green" />
        </BarChart>
      </ResponsiveContainer> */}
    </>
  );
};

export default RadarChartComponent;
