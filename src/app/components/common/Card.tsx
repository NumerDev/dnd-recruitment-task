import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface CardWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  header?: string;
}

const cardVariants = cva(
  "bg-white flex flex-col gap-5 border border-secondary-5 px-6 py-5 rounded-lg"
);

const Card = ({ children, header, className }: CardWrapperProps) => {
  return (
    <div className={cn(cardVariants({ className }))}>
      {header && (
        <h2 className="text-xl font-bold text-secondary-11">{header}</h2>
      )}
      {children}
    </div>
  );
};

export default Card;
