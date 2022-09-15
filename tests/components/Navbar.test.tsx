import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Navbar from "@/components/Common/Navbar";

describe("Navbar Component", () => {
  it("should render the component", () => {
    render(<Navbar />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });
});
