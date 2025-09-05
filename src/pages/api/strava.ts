import type { APIRoute } from "astro";
import axios from "axios";

export const prerender = false;

const STRAVA_CLIENT_ID = import.meta.env.PUBLIC_STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = import.meta.env.STRAVA_CLIENT_SECRET;
const STRAVA_REFRESH_TOKEN = import.meta.env.STRAVA_REFRESH_TOKEN;
const PUBLIC_STRAVA_ATHLETE_ID = import.meta.env.PUBLIC_STRAVA_ATHLETE_ID;

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
    throw error;
  }
}

export const GET: APIRoute = async ({ url }) => {
  const endpoint = url.searchParams.get("endpoint");

  try {
    const accessToken = await getAccessToken();

    if (endpoint === "stats") {
      const response = await axios.get(
        `https://www.strava.com/api/v3/athletes/${PUBLIC_STRAVA_ATHLETE_ID}/stats`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return new Response(JSON.stringify(response.data), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else if (endpoint === "activities") {
      const limit = url.searchParams.get("limit") || "10";
      const response = await axios.get(
        "https://www.strava.com/api/v3/athlete/activities",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            per_page: limit,
          },
        }
      );

      return new Response(JSON.stringify(response.data), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid endpoint" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
