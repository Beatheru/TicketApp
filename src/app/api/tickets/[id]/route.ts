import { Ticket } from "@/models/Ticket";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ticket = await Ticket.findOne({ _id: params.id });
    return NextResponse.json({ ticket });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const ticketData = body.form;
    await Ticket.findByIdAndUpdate(params.id, {
      ...ticketData
    });
    return new NextResponse("Success!", {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await Ticket.findByIdAndDelete(params.id);
    return new NextResponse("Success!", {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
