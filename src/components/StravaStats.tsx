import React, { useEffect, useState } from "react";
import {
  getStravaStats,
  getRecentActivities,
  formatDistance,
  formatTime,
} from "../utils/stravaApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import "./StravaStats.css";

interface ActivityData {
  date: string;
  distance: number;
  time: number;
  type: string;
}

const StravaStats: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"overview" | "detailed">("overview");

  console.log("StravaStats component rendered");

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching Strava data...");
      try {
        const [stravaStats, recentActivities] = await Promise.all([
          getStravaStats(),
          getRecentActivities(20),
        ]);

        console.log("Strava stats:", stravaStats);
        console.log("Recent activities:", recentActivities);

        if (stravaStats) {
          setStats(stravaStats);
        }

        if (recentActivities.length > 0) {
          const activityData = recentActivities.map(activity => ({
            date: new Date(activity.start_date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            distance: Math.round(activity.distance * 0.000621371 * 10) / 10,
            time: Math.round(activity.moving_time / 60),
            type: activity.type,
          }));
          setActivities(activityData.reverse());
        }
      } catch (error) {
        console.error("Error fetching Strava data:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="strava-container">
        <div className="loading">Loading Strava data...</div>
      </div>
    );
  }

  if (!stats && activities.length === 0) {
    return null;
  }

  const ytdTotals = {
    rides: stats?.ytd_ride_totals || { count: 0, distance: 0, moving_time: 0 },
    runs: stats?.ytd_run_totals || { count: 0, distance: 0, moving_time: 0 },
  };

  const recentTotals = {
    rides: stats?.recent_ride_totals || {
      count: 0,
      distance: 0,
      moving_time: 0,
    },
    runs: stats?.recent_run_totals || { count: 0, distance: 0, moving_time: 0 },
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      return (
        <div className="custom-tooltip">
          <p>{payload[0].payload.date}</p>
          <p>{`${payload[0].value} mi`}</p>
          <p>{`${payload[0].payload.time} min`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="strava-container">
      <div className="strava-header">
        <h2>Activity Stats</h2>
        <div className="view-toggle">
          <button
            className={view === "overview" ? "active" : ""}
            onClick={() => setView("overview")}
          >
            Overview
          </button>
          <button
            className={view === "detailed" ? "active" : ""}
            onClick={() => setView("detailed")}
          >
            Detailed
          </button>
        </div>
      </div>

      {view === "overview" ? (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Year to Date</h3>
            <div className="stat-row">
              <span className="stat-label">Rides:</span>
              <span className="stat-value">
                {ytdTotals.rides.count} /{" "}
                {formatDistance(ytdTotals.rides.distance)}
              </span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Runs:</span>
              <span className="stat-value">
                {ytdTotals.runs.count} /{" "}
                {formatDistance(ytdTotals.runs.distance)}
              </span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Total Time:</span>
              <span className="stat-value">
                {formatTime(
                  ytdTotals.rides.moving_time + ytdTotals.runs.moving_time
                )}
              </span>
            </div>
          </div>

          <div className="stat-card">
            <h3>Last 4 Weeks</h3>
            <div className="stat-row">
              <span className="stat-label">Rides:</span>
              <span className="stat-value">
                {recentTotals.rides.count} /{" "}
                {formatDistance(recentTotals.rides.distance)}
              </span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Runs:</span>
              <span className="stat-value">
                {recentTotals.runs.count} /{" "}
                {formatDistance(recentTotals.runs.distance)}
              </span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Total Time:</span>
              <span className="stat-value">
                {formatTime(
                  recentTotals.rides.moving_time + recentTotals.runs.moving_time
                )}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="chart-container">
          <h3>Recent Activities</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={activities}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="rgb(205, 108, 160)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="rgb(205, 108, 160)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                stroke="rgb(234, 237, 243)"
                fontSize={12}
                tick={{ fill: "rgb(234, 237, 243)" }}
              />
              <YAxis
                stroke="rgb(234, 237, 243)"
                fontSize={12}
                tick={{ fill: "rgb(234, 237, 243)" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="distance"
                stroke="rgb(205, 108, 160)"
                fillOpacity={1}
                fill="url(#colorDistance)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default StravaStats;
