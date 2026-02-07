import { type HTMLAttributes } from "react";

type SpotlightCardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "feature" | "step" | "fit" | "guarantee" | "faq" | "default";
};

export function SpotlightCard({
  className = "",
  children,
  variant = "default",
  ...props
}: SpotlightCardProps) {
  return (
    <div className={`spotlight-card spotlight-${variant} ${className}`} {...props}>
      {children}
    </div>
  );
}
