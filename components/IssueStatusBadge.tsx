import { Status } from "@prisma/client";
import React from "react";
import { Badge } from "./ui/badge";

interface Props {
  status: Status;
}

const IssueStatusBadge = ({ status }: Props) => {
  switch (status) {
    case "OPEN":
      return <Badge className="bg-green-500">{status}</Badge>;
    case "CLOSED":
      return <Badge className="bg-gray-500">{status}</Badge>;
    case "IN_PROGRESS":
      return <Badge className="bg-orange-500">{status}</Badge>;
    default:
      return <Badge className="bg-red-500">{status}</Badge>;
  }
};

export default IssueStatusBadge;
