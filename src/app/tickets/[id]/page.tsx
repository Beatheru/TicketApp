import Nav from "@/components/Nav";
import TicketForm from "@/components/TicketForm";
import { Ticket } from "@/models/Ticket";
import axios from "axios";

interface ApiResponse {
  ticket: Ticket;
}

const getTicketById = async (id: string) => {
  const { data } = await axios.get<ApiResponse>(
    `${process.env.NEXTAUTH_URL}/api/tickets/${id}`
  );

  return data;
};

const TicketPage = async ({ params }: { params: { id: string } }) => {
  const { ticket } = await getTicketById(params.id);

  return (
    <>
      <Nav />
      <TicketForm ticket={ticket} />
    </>
  );
};

export default TicketPage;
