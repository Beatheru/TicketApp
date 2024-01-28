import Link from "next/link";
import DeleteIcon from "./DeleteIcon";
import StatusDisplay from "./StatusDisplay";
import { Ticket } from "@/models/Ticket";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  ticket: Ticket;
}

const TicketCard = ({ ticket }: Props) => {
  const formatTimestamp = (timestamp: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    };

    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", options);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-200";
      case "high":
        return "text-red-400";
    }
  };

  return (
    <Link href={`/tickets/${ticket._id}`} style={{ display: "contents" }}>
      <Card className="mb-4 hover:bg-primary">
        <CardHeader>
          <CardTitle>
            <div className="mb-3 flex">
              <div className={`${getStatusColor(ticket.priority)}`}>
                {ticket.priority}
              </div>
              <div className="ml-auto">
                <DeleteIcon id={ticket._id} />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {ticket.title}
          </h4>
          <p className="whitespace-pre-wrap">{ticket.description}</p>
          <div className="flex-grow"></div>
          <div className="mt-2 flex">
            <div className="my-1 text-xs">
              {formatTimestamp(ticket.createdAt)}
            </div>
            <div className="ml-auto flex items-end">
              <StatusDisplay status={ticket.status} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TicketCard;
