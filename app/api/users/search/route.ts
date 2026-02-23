import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json([]);
  }

  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });

  return NextResponse.json(users);
}