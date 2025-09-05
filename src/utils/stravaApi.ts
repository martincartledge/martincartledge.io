import axios from "axios";

interface StravaTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

interface StravaActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  start_date: string;
  type: string;
  average_speed: number;
  max_speed: number;
  total_elevation_gain: number;
}

interface StravaStats {
  recent_ride_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elevation_gain: number;
  };
  recent_run_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elevation_gain: number;
  };
  ytd_ride_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elevation_gain: number;
  };
  ytd_run_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elevation_gain: number;
  };
}

// Note: Token refresh is now handled server-side in /api/strava.ts

export async function getStravaStats(): Promise<StravaStats | null> {
  try {
    const response = await axios.get<StravaStats>("/api/strava?endpoint=stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching Strava stats:", error);
    return null;
  }
}

export async function getRecentActivities(
  limit: number = 10
): Promise<StravaActivity[]> {
  try {
    const response = await axios.get<StravaActivity[]>(
      `/api/strava?endpoint=activities&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Strava activities:", error);
    return [];
  }
}

export function formatDistance(meters: number): string {
  const miles = meters * 0.000621371;
  return `${miles.toFixed(1)} mi`;
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export function formatPace(meters: number, seconds: number): string {
  const miles = meters * 0.000621371;
  const minutes = seconds / 60;
  const pacePerMile = minutes / miles;

  const paceMinutes = Math.floor(pacePerMile);
  const paceSeconds = Math.round((pacePerMile - paceMinutes) * 60);

  return `${paceMinutes}:${paceSeconds.toString().padStart(2, "0")}/mi`;
}
