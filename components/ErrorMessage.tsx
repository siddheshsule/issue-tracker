import React, { PropsWithChildren } from "react";
import { Label } from "./ui/label";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <p>
      <Label className="text-red-700">{children}</Label>
    </p>
  );
};

export default ErrorMessage;
