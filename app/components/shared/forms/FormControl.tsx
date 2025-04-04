import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Input } from "./Input";
import { cn } from "~/utils/tailwind.util";

interface FormControlProps {
  label       : string;
  placeholder?: string;
  register    : UseFormRegisterReturn;
  error      ?: FieldError;
  type       ?: string;
  className  ?: string;
}

export const FormControl = ({
  label,
  placeholder,
  register,
  error,
  type = "text",
  className,
}: FormControlProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium">{label}</label>

      <Input
        placeholder={placeholder}
        {...register}
        type={type}
        className={cn(
          "px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-secondary-500",
          error ? "border-destructive" : "border-secondary-400",
          className
        )}
      />

      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
};
