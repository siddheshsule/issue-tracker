import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const EditIssueButton = ({issueId}:{issueId:number}) => {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button>
        <FaEdit className="mr-2" />
        Edit Issue
      </Button>
    </Link>
  );
};

export default EditIssueButton;
