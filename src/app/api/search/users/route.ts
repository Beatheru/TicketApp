import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get("username") ?? "";
    if (username.length > 0) {
      const users = (
        await User.find<User>({
          username
        })
      ).map((user) => user.username);
      return NextResponse.json({ users });
    } else {
      const users = (await User.find<User>()).map((user) => user.username);
      return NextResponse.json({ users });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
