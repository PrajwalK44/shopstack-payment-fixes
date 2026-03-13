import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../services/userService";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    const user = getUser(id || "");
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
