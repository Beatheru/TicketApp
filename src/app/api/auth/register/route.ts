import { User } from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.username || !body.password) {
      return new NextResponse("All fields required!", {
        status: 400
      });
    }

    const user = await User.findOne({ username: body.username.toLowerCase() });

    if (!user) {
      body.password = await bcrypt.hash(body.password, 10);
      await User.create(body);
      return new NextResponse("Success!", {
        status: 200
      });
    } else {
      return new NextResponse("User already exists!", {
        status: 400
      });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
