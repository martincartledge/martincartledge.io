import React from "react";
import "./RunningStats.css";

interface Props {
  stats: {
    totalMiles: number;
    totalHours: number;
  } | null;
}

const RunningStats: React.FC<Props> = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="running-stats">
      <span className="run-icon">👟</span>
      <span>
        {stats.totalMiles} miles • {stats.totalHours} hours
      </span>
    </div>
  );
};

export default RunningStats;
