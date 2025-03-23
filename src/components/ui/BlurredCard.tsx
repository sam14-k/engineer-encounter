
import { cn } from "@/lib/utils";
import React from "react";

interface BlurredCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const BlurredCard = ({ 
  children, 
  className, 
  hoverEffect = false,
  ...props 
}: BlurredCardProps) => {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-6 transition-all duration-300",
        hoverEffect && "hover:shadow-lg hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default BlurredCard;
