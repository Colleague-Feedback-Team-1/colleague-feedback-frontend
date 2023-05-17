import React from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

interface ChartData {
  sectionName: string
  average: number
}

interface RadarChartProps {
  data: ChartData[]
}

const RadarChartComponent: React.FC<RadarChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={750}>
      <RadarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }} cx="50%" cy="50%" outerRadius="80%">
        <PolarGrid />
        <PolarAngleAxis dataKey="sectionName" />
        <PolarRadiusAxis angle={30} domain={[0, 5]} tickCount={6} />
        <Radar
          name="Score"
          dataKey="average"
          stroke="#8884d8"
          strokeWidth={3}
          fill="none"
          fillOpacity={0.6}
          dot={{ fill: '#8884d8', strokeWidth: 0, r: 4 }}
        />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default RadarChartComponent
