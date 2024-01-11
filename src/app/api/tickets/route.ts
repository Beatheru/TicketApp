import { Ticket } from "@/models/Ticket";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get("username") ?? "";
    if (username.length > 0) {
      const tickets = await Ticket.find<Ticket>({
        assignTo: username
      });
      return NextResponse.json({ tickets });
    } else {
      const tickets = await Ticket.find<Ticket>();
      return NextResponse.json({ tickets });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await Ticket.create(body.form);
    return new NextResponse("Success!", {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
