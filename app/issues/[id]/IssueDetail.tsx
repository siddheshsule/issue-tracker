import IssueStatusBadge from "@/components/IssueStatusBadge";
import { Card } from "@/components/ui/card";
import { Issue } from "@prisma/client";
import { Heading, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const IssueDetail = ({issue}:{issue:Issue}) => {
  return (
    <div>
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
    </div>
  );
};

export default IssueDetail;
