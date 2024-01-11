import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import TicketCard from "@/components/TicketCard";
import { Ticket } from "@/models/Ticket";
import axios from "axios";
import { getServerSession } from "next-auth";

interface ApiResponse {
  tickets: Ticket[];
}

const getTickets = async () => {
  const session = await getServerSession(authOptions);
  const { data } = await axios.get<ApiResponse>(
    `${process.env.NEXTAUTH_URL}/api/tickets?username=${session?.user.username}`
  );

  return data;
};

const Dashboard = async () => {
  const { tickets } = await getTickets();

  return (
    <div className="p-5">
      <div>
        {tickets && (
          <div className="lg:grid grid-cols-2 xl:grid-cols-4">
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
