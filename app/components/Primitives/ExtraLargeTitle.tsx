import { FunctionComponent } from "react";

export const ExtraLargeTitle: FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <h1 className={`font-sans font-bold text-5xl md:text-6xl ${className}`}>{children}</h1>
  );
};