import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  icon?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "icon";
}
const Button = ({
  name,
  icon,
  variant = "default",
  className,
  ...props
}: ButtonProps) => {
  const buttonVariants = cva(
    "box-border flex max-h-10 items-center justify-center gap-1.5 rounded-lg px-4 py-3 text-sm font-semibold leading-none transition-colors focus-visible:outline-none [&_svg]:h-5 [&_svg]:w-5 [&_svg]:transition-colors",
    {
      variants: {
        variant: {
          default:
            "border border-secondary-5 bg-white text-secondary-7 shadow-default hover:bg-secondary-2 hover:text-secondary-10 focus-visible:shadow-secondary disabled:text-secondary-6 disabled:hover:bg-white",
          secondary:
            "border border-primary-3 bg-white text-primary-6 hover:bg-primary-1 hover:text-primary-7 focus-visible:shadow-primary disabled:border-secondary-5 disabled:text-secondary-6 disabled:hover:bg-white",
          primary:
            "border border-primary-5 bg-primary-5 text-white hover:bg-primary-6 hover:text-white focus-visible:shadow-primary disabled:border-secondary-4 disabled:bg-secondary-1 disabled:text-secondary-6 [&_svg]:text-white [&_svg]:disabled:text-secondary-6",
          icon: "p-2.5 hover:bg-secondary-2 hover:text-secondary-9 disabled:hover:bg-transparent [&_svg]:text-secondary-8 hover:[&_svg]:text-secondary-9 [&_svg]:disabled:text-secondary-6",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
  );

  return (
    <button className={cn(buttonVariants({ variant, className }))} {...props}>
      {icon && icon}
      {variant !== "icon" && name && name}
    </button>
  );
};

export default Button;
