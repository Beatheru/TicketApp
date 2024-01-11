import Nav from "@/components/Nav";
import Dashboard from "@/components/Dashboard";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Main = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Nav />
      <Dashboard />
    </>
  );
};

export default Main;
