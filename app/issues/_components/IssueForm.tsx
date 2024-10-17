"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/ValidationSchemas";
import { z } from "zod";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/ui/Spinner";
import { useState } from "react";
import { Issue } from "@prisma/client";
import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
}) as typeof import("react-simplemde-editor").default;
type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({issue}: {issue?:Issue}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if(issue) 
        await axios.patch("/api/issues" + (issue.id).toString, data);
      else
        await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message ||
          "Hmmm...something does'nt seem right! Please try after sometime."
        : "An unexpected error occured.";
      toast({
        title: "Error!",
        description: errorMessage,
      });
    }
  });

  return (
    <form className="max-w-xl p-5 space-y-3" onSubmit={onSubmit}>
      <h2 className="text-xl font-semibold">Create New Issue</h2>
      <Input defaultValue={issue?.title} placeholder="Title" {...register("title")} />
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller
        name="description"
        control={control}
        defaultValue={issue?.description}
        render={({ field }) => (
          <SimpleMDE {...field} placeholder="Description" />
        )}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Button disabled={isSubmitting} type="submit">
        {issue ? "Update Issue" : "Submit Issue"} {" "} {isSubmitting && <Spinner />}
      </Button>
      <Toaster />
    </form>
  );
};

export default IssueForm;
