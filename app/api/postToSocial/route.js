import { NextResponse } from "next/server";

export async function POST(req) {
  const { postContent } = await req.json();

  const fbPageId = "61572960761665"; // Replace with your actual Facebook Page ID
  const instaUserId = "your_instagram_user_id"; // Replace with your Instagram Business Account ID
  const accessToken = process.env.FB_ACCESS_TOKEN;

  try {
    // Post to Facebook Page
    const fbResponse = await fetch(
      `https://graph.facebook.com/v19.0/${fbPageId}/feed`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: postContent,
          access_token: accessToken,
        }),
      }
    );

    const fbData = await fbResponse.json();

    // Post to Instagram (if an image URL is provided)
    const instaResponse = await fetch(
      `https://graph.facebook.com/v19.0/${instaUserId}/media`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caption: postContent,
          access_token: accessToken,
        }),
      }
    );

    const instaData = await instaResponse.json();

    return NextResponse.json({
      success: true,
      facebook: fbData,
      instagram: instaData,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}