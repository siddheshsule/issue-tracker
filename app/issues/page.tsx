import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IssueStatusBadge from "@/components/IssueStatusBadge";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <div className="mt-5 ml-2">
      <div className="mb-3">
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium">{issue.title}
                <div className="block md:hidden"><IssueStatusBadge status={issue.status}/></div>
                
              </TableCell>
              <TableCell className="hidden md:table-cell"><IssueStatusBadge status={issue.status}/></TableCell>
              <TableCell className="hidden md:table-cell">{issue.createdAt.toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IssuesPage;
