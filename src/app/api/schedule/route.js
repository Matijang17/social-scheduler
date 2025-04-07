import { NextResponse } from "next/server";
import { getAdminFirestore } from "@/firebase/admin";
import { verifyIdToken } from "@/firebase/admin";

export async function POST(request) {
  try {
    const { platform, content, scheduledTime } = await request.json();
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { error: "Unauthorized - No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await verifyIdToken(token);
    
    const db = getAdminFirestore();
    const postRef = await db.collection('scheduled_posts').add({
      platform,
      content,
      scheduledTime: new Date(scheduledTime),
      userId: decodedToken.uid,
      status: 'scheduled',
      createdAt: new Date()
    });

    return NextResponse.json({
      success: true,
      message: `Post scheduled for ${platform} at ${scheduledTime}`,
      data: {
        id: postRef.id,
        platform,
        content,
        scheduledTime,
        userId: decodedToken.uid
      }
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to schedule post" },
      { status: 500 }
    );
  }
}