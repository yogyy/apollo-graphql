import { describe, expect, it } from "vitest";
import { render, screen } from "@/lib/test-utils";
import Root from "@/routes/root";

describe("should render app", () => {
  it("should render two links", () => {
    render(<Root />);

    const usersLink = screen.getByText(/users/i);
    const moviesLink = screen.getByText(/movies/i);

    expect(usersLink).toBeInTheDocument();
    expect(moviesLink).toBeInTheDocument();
  });
});
