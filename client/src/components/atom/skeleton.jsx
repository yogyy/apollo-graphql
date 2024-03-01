import { cn } from "../../lib/utils";
// eslint-disable-next-line react/prop-types
function Skeleton({ className }) {
  return (
    <div className={cn("animate-pulse rounded-md bg-primary/10", className)} />
  );
}

export { Skeleton };
