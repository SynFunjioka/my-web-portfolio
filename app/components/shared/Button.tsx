import React from "react";
import { cn } from "~/utils/tailwind.util";

type Variant =
  | "primary"
  | "secondary"
  | "tertiary"
  // | "success"
  | "danger"
  // | "warning"
  // | "info"
  // | "light"
  // | "dark"
  | "link";

interface VariantStyles {
  filled: string;
  outline?: string; // Para "link" solo se utiliza un estilo, por ejemplo
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  outline?: boolean;
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  outline = false,
  size = "medium",
  type = "button",
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStylesMap: Record<Variant, VariantStyles> = {
    primary: {
      filled:
        "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500",
      outline:
        "border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
    },
    secondary: {
      filled:
        "bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500",
      outline:
        "border border-secondary-600 text-secondary-600 hover:bg-secondary-100 focus:ring-secondary-500",
    },
    tertiary: {
      filled:
        "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
      outline:
        "border border-gray-600 text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
    },
    /* success: {
      filled: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      outline:
        "border border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500",
    }, */
    danger: {
      filled:
        "bg-destructive-600 text-white hover:bg-destructive-700 focus:ring-destructive-500",
      outline:
        "border border-destructive-600 text-destructive-600 hover:bg-destructive-50 focus:ring-destructive-500",
    },
    /* warning: {
      filled:
        "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500",
      outline:
        "border border-yellow-600 text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500",
    }, */
    /* info: {
      filled: "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500",
      outline:
        "border border-sky-600 text-sky-600 hover:bg-sky-50 focus:ring-sky-500",
    }, */
    /* light: {
      filled: "bg-gray-100 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
      outline:
        "border border-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500",
    }, */
    /* dark: {
      filled: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-500",
      outline:
        "border border-gray-800 text-gray-800 hover:bg-gray-900 hover:text-white focus:ring-gray-500",
    }, */
    link: {
      filled: "text-blue-600 hover:underline focus:ring-blue-500",
    },
  };

  const sizeStyles = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  function getVariantStyle(variant: Variant, outline: boolean = false): string {
    const styles = variantStylesMap[variant];
    // Si se pide el modo outline y éste existe, se retorna; sino, se retorna el estilo filled
    return outline && styles.outline ? styles.outline : styles.filled;
  }

  return (
    <button
      type={type}
      disabled={isLoading || disabled}
      className={cn(
        baseStyles,
        getVariantStyle(variant, outline),
        sizeStyles[size],
        (isLoading || disabled) && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 mr-2"></span>
      ) : leftIcon ? (
        <span className="mr-2">{leftIcon}</span>
      ) : null}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
