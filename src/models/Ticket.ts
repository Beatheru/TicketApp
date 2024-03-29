import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGO_URL as string);
mongoose.Promise = global.Promise;

export interface Ticket extends mongoose.Document {
  title: string;
  assignTo: string;
  description: string;
  priority: string;
  status: string;
  active: boolean;
  createdAt: string;
}

const ticketSchema = new Schema<Ticket>(
  {
    title: String,
    assignTo: String,
    description: String,
    priority: String,
    status: String,
    active: Boolean
  },
  { timestamps: true }
);

export const Ticket =
  mongoose.models.Ticket || mongoose.model<Ticket>("Ticket", ticketSchema);
