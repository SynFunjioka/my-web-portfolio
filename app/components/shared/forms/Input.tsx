import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "~/utils/tailwind.util";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return type === "textarea" ? (
      <textarea
        className={cn(
          "border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition",
          className
        )}
        rows={5}
        ref={ref as React.Ref<HTMLTextAreaElement> | null}
        {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      ></textarea>
    ) : (
      <input
        type={type}
        className={cn(
          "border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
