import React from "react";

interface SearchMovieProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  disabled: boolean;
}
export const SearchMovieForm = ({
  onChange,
  onSubmit,
  disabled,
}: SearchMovieProps) => {
  return (
    <form
      data-testid="movie-form"
      onSubmit={onSubmit}
      className="flex gap-3">
      <input
        type="text"
        aria-label="input"
        placeholder="Search Movie"
        className=":uno: flex h-9 w-full rounded-md border text-accent border-primary focus:ring focus:ring-accent focus:border-accent bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text/50 disabled:cursor-not-allowed disabled:opacity-50"
        onChange={onChange}
      />
      <button
        type="submit"
        disabled={disabled}
        className=":uno: inline-flex text-text hover:cursor-pointer bg-secondary focus-visible:ring-2 focus-visible:ring-accent text-background shadow hover:bg-secondary/50 focus-within:bg-secondary/75 active:bg-secondary/50 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 disabled:pointer-events-none disabled:opacity-50">
        Search
      </button>
    </form>
  );
};
