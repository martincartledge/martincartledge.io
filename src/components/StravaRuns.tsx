import React from "react";
import "./StravaRuns.css";

interface Run {
  name: string;
  distance: string;
  time: string;
  pace: string;
  date: string;
}

interface Props {
  runs: Run[];
}

const StravaRuns: React.FC<Props> = ({ runs }) => {
  if (runs.length === 0) {
    return null;
  }

  return (
    <div className="runs-container">
      <h2>Recent Runs</h2>
      <div className="runs-list">
        {runs.map((run, index) => (
          <div key={index} className="run-item">
            <div className="run-date">{run.date}</div>
            <div className="run-details">
              <span className="run-name">{run.name}</span>
              <div className="run-stats">
                <span>{run.distance}</span>
                <span>•</span>
                <span>{run.time}</span>
                <span>•</span>
                <span>{run.pace}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StravaRuns;
