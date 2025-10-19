import { FunctionComponent } from "react";

export const SmallSubtitle: FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <h3 className={`font-sans text-lg md:text-xl mt-4 ${className}`}>{children}</h3>
  );
};