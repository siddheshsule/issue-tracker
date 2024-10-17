'use client';
import BugSuggestionForm from "@/components/BugSuggestionForm";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import { Card } from "@/components/ui/card";
import { Issue } from "@prisma/client";
import { Heading, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const IssueDetail = ({ issue }: { issue: Issue }) => {
  return (
    <div>
      <Heading className="text-3xl font-bold mb-3">{issue.title}</Heading>
      <div className="flex space-x-3 mb-5">
        <IssueStatusBadge status={issue.status} />
        <Text>
          <Text className="text-xs">Created on: </Text>
          {new Date(issue.createdAt).toDateString()}
        </Text>
        <Text>
          <Text className="text-xs">Last updated on: </Text>
          {new Date(issue.updatedAt).toDateString()}
        </Text>
      </div>
      <Card className="prose w-[550px] h-[400px] mb-4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
      <Card className="p-4">
        {/* Pass the full issue object */}
        <BugSuggestionForm issue={issue} />
      </Card>
    </div>
  );
};

export default IssueDetail;
