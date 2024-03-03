import { Skeleton } from "./atom/skeleton";

const MoviesLoading = () => {
  return (
    <div className=":uno: flex gap-1 border-secondary/50 py.6 b-b first-b-t">
      <Skeleton className="h-7 w-8%" />
      <Skeleton className="h-7 w-32%" />
      <Skeleton className="h-7 w-28%" />
      <Skeleton className="h-7 w-20%" />
      <Skeleton className="h-7 w-12%" />
    </div>
  );
};

const UsersLoading = () => {
  return (
    <div className=":uno: flex gap-1 border-secondary/50 py.6 b-b first-b-t">
      <Skeleton className="h-7 w-7%" />
      <Skeleton className="h-7 w-30%" />
      <Skeleton className="h-7 w-23%" />
      <Skeleton className="h-7 w-13%" />
      <Skeleton className="h-7 w-29%" />
    </div>
  );
};

export { MoviesLoading, UsersLoading };
