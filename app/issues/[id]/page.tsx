import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { Box, Grid, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";

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
    <Grid columns={{ initial: "1", md: "2" }} className="space-y-5 mt-5">
      <Box>
        <Heading className="text-3xl font-bold mb-3">{issue.title}</Heading>
        <div className="flex space-x-3 mb-5">
          <IssueStatusBadge status={issue.status}></IssueStatusBadge>
          <Text>
            <Text className="text-xs">Created on: </Text>
            {issue.createdAt.toDateString()}
          </Text>
          <Text>
            <Text className="text-xs">Last updated on: </Text>
            {issue.updatedAt.toDateString()}
          </Text>
        </div>
        <Card className="prose w-[550px] h-[400px]">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Link href={`/issues/${issue.id}/edit`}>
          <Button>
            <FaEdit className="mr-2" />
            Edit Issue
          </Button>
        </Link>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
