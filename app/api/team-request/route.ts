import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Create a new team/project request
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const projectId = parseInt(body.projectId);
    const senderId = parseInt(body.senderId);
    const receiverId = parseInt(body.receiverId);
    const managerId = 2;

    const newRequest = await prisma.projectRequest.create({
      data: {
        projectId,
        senderId,
        receiverId,
        type: body.type,
        status: body.status,
        description: body.description,
      },
    });

    return NextResponse.json(newRequest);
  } catch (error) {
    console.error("POST /api/team_request error:", error);
    return NextResponse.json(
      { error: "Failed to create request", details: error },
      { status: 500 }
    );
  }
}


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const managerId = searchParams.get("managerId");

    if (!managerId) {
      return NextResponse.json(
        { error: "managerId is required" },
        { status: 400 }
      );
    }

    const requests = await prisma.projectRequest.findMany({
      where: {
        receiverId: parseInt(managerId),
        status: "PENDING",
      },
      include: {
        project: true,
        sender: true,
      },
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error("GET /api/team_request error:", error);
    return NextResponse.json(
      { error: "Failed to fetch requests", details: error },
      { status: 500 }
    );
  }
}

// Update request status (Approve / Reject)
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { requestId, status } = body;

    const updated = await prisma.projectRequest.update({
      where: { id: parseInt(requestId) },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/team_request error:", error);
    return NextResponse.json(
      { error: "Failed to update request", details: error },
      { status: 500 }
    );
  }
}
