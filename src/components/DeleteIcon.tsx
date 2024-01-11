"use client";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

const DeleteBlock = ({ id }: Props) => {
  const router = useRouter();

  const deleteTicket = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const { status } = await axios.delete(
      `${window.location.origin}/api/tickets/${id}`
    );
    if (status === 200) {
      router.refresh();
    }
  };

  return (
    <FontAwesomeIcon
      icon={faX}
      className=" text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick={deleteTicket}
    />
  );
};

export default DeleteBlock;
