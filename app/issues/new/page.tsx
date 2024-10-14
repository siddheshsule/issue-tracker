"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/ValidationSchemas";
import { z } from "zod";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/ui/Spinner";
import { useState } from "react";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
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
      <Input placeholder="Title" {...register("title")} />
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE {...field} placeholder="Description" />
        )}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Button disabled={isSubmitting} type="submit">
        Submit Issue {isSubmitting && <Spinner />}
      </Button>
      <Toaster />
    </form>
  );
};

export default NewIssuePage;
