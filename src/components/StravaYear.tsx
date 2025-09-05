import React from "react";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import "./StravaYear.css";

interface MonthData {
  month: string;
  miles: number;
  hours: number;
}

interface Props {
  stats: {
    totalMiles: number;
    totalHours: number;
    monthlyData: MonthData[];
  } | null;
}

const StravaYear: React.FC<Props> = ({ stats }) => {
  if (!stats) return null;

  const width = 600;
  const height = 120;
  const margin = { top: 10, right: 0, bottom: 30, left: 0 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleBand<string>({
    range: [0, innerWidth],
    domain: stats.monthlyData.map(d => d.month),
    padding: 0.3,
  });

  const yScale = scaleLinear<number>({
    range: [innerHeight, 0],
    domain: [0, Math.max(...stats.monthlyData.map(d => d.miles))],
    nice: true,
  });

  return (
    <div className="strava-year">
      <div className="stats-header">
        <h2>Running {new Date().getFullYear()}</h2>
        <div className="stats-totals">
          <span>{stats.totalMiles} miles</span>
          <span>•</span>
          <span>{stats.totalHours} hours</span>
        </div>
      </div>

      <div className="chart-wrapper">
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
          <Group left={margin.left} top={margin.top}>
            {stats.monthlyData.map(d => {
              const barHeight = innerHeight - (yScale(d.miles) ?? 0);
              const barX = xScale(d.month);
              const barWidth = xScale.bandwidth();

              return (
                <Group key={`bar-${d.month}`}>
                  <rect
                    x={barX}
                    y={innerHeight - barHeight}
                    height={barHeight}
                    width={barWidth}
                    fill="rgb(205, 108, 160)"
                    opacity={0.8}
                  />
                  <text
                    x={(barX ?? 0) + barWidth / 2}
                    y={height - 10}
                    fontSize={10}
                    fill="rgb(234, 237, 243)"
                    textAnchor="middle"
                  >
                    {d.month}
                  </text>
                </Group>
              );
            })}
          </Group>
        </svg>
      </div>
    </div>
  );
};

export default StravaYear;
