import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import { Card } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown'

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <div className="flex space-x-3 mb-5">
        <IssueStatusBadge status={issue.status}></IssueStatusBadge>
        <Text>{issue.createdAt.toDateString()}</Text>
        <Text>{issue.updatedAt.toDateString()}</Text>
      </div>
      <Card className="prose">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
