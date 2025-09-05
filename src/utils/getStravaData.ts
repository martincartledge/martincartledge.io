import axios from "axios";

const STRAVA_CLIENT_ID = import.meta.env.PUBLIC_STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = import.meta.env.STRAVA_CLIENT_SECRET;
const STRAVA_REFRESH_TOKEN = import.meta.env.STRAVA_REFRESH_TOKEN;

async function getAccessToken() {
  try {
    const response = await axios.post("https://www.strava.com/oauth/token", {
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      refresh_token: STRAVA_REFRESH_TOKEN,
      grant_type: "refresh_token",
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error refreshing Strava token:", error);
    return null;
  }
}

export async function getRunningTotals() {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) return null;

    const athleteId = import.meta.env.PUBLIC_STRAVA_ATHLETE_ID;

    const statsResponse = await axios.get(
      `https://www.strava.com/api/v3/athletes/${athleteId}/stats`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const stats = statsResponse.data;
    const ytdMiles = Math.round(stats.ytd_run_totals.distance * 0.000621371);
    const ytdHours = Math.round(stats.ytd_run_totals.moving_time / 3600);

    return {
      totalMiles: ytdMiles,
      totalHours: ytdHours,
    };
  } catch (error) {
    console.error("Error fetching Strava data:", error);
    return null;
  }
}

export async function getStravaYearStats() {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) return null;

    const athleteId = import.meta.env.PUBLIC_STRAVA_ATHLETE_ID;

    // Get athlete stats
    const statsResponse = await axios.get(
      `https://www.strava.com/api/v3/athletes/${athleteId}/stats`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const stats = statsResponse.data;

    // Convert meters to miles and seconds to hours
    const ytdMiles = Math.round(stats.ytd_run_totals.distance * 0.000621371);
    const ytdHours = Math.round(stats.ytd_run_totals.moving_time / 3600);

    // Get recent activities for monthly breakdown
    const currentYear = new Date().getFullYear();
    const startOfYear = `${currentYear}-01-01T00:00:00Z`;

    const activitiesResponse = await axios.get(
      "https://www.strava.com/api/v3/athlete/activities",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          after: Math.floor(new Date(startOfYear).getTime() / 1000),
          per_page: 200,
        },
      }
    );

    // Group runs by month
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: i,
      miles: 0,
      hours: 0,
    }));

    activitiesResponse.data
      .filter((activity: any) => activity.type === "Run")
      .forEach((activity: any) => {
        const month = new Date(activity.start_date).getMonth();
        monthlyData[month].miles += activity.distance * 0.000621371;
        monthlyData[month].hours += activity.moving_time / 3600;
      });

    // Only include months with data up to current month
    const currentMonth = new Date().getMonth();
    const activeMonths = monthlyData.slice(0, currentMonth + 1).map(d => ({
      month: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][d.month],
      miles: Math.round(d.miles),
      hours: Math.round(d.hours * 10) / 10,
    }));

    return {
      totalMiles: ytdMiles,
      totalHours: ytdHours,
      monthlyData: activeMonths,
    };
  } catch (error) {
    console.error("Error fetching Strava data:", error);
    return null;
  }
}
