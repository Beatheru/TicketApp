import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import TicketCard from "@/components/TicketCard";
import { Ticket } from "@/models/Ticket";
import { getServerSession } from "next-auth";

const getTickets = async () => {
  const session = await getServerSession(authOptions);
  const res = await Ticket.find<Ticket>({
    assignTo: session?.user.username
  });

  const tickets = res.map((ticket) => JSON.parse(JSON.stringify(ticket)));

  return tickets;
};

const Dashboard = async () => {
  const tickets = await getTickets();

  return (
    <div className="p-5">
      <div>
        {tickets && (
          <div className="lg:grid grid-cols-2 xl:grid-cols-4 gap-4">
            {tickets.map((ticket, index) => (
              <TicketCard key={index} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
