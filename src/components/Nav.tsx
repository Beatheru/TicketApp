"use client";

import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

const Nav = () => {
  const session = useSession();

  return (
    <>
      <nav className="flex items-center justify-between bg-background p-4">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <FontAwesomeIcon icon={faHome} className="icon" />
          </Link>
          <Link href="/new">
            <FontAwesomeIcon icon={faTicket} className="icon" />
          </Link>
        </div>
        <div className="ml-auto mr-4">{session.data?.user.username}</div>
        <Button onClick={() => signOut()}>Logout</Button>
      </nav>
      <Separator />
    </>
  );
};

export default Nav;
