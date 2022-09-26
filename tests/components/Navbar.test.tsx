import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Navbar from "@/components/Common/Navbar";
import { act } from "react-dom/test-utils";

describe("Navbar Component", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  it("should renders a single navigation element if the user is not sign-in and there is no cookie available", () => {
    render(<Navbar />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });

  it("should renders a 7 navigation elements if the user is sign-in and if there is cookie available", () => {
    // mock a random cookie
    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: "userId=ogkpae67aeAFE6876FZga",
    });

    render(<Navbar />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(7);
  });

  it("should deletes the cookie if we click on Sign-out", async () => {
    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: "userId=ogkpae67aeAFE6876FZga",
    });

    render(<Navbar />);

    act(() => {
      fireEvent.click(screen.getByText("Sign-out"));
    });

    expect(await screen.findAllByRole("listitem")).toHaveLength(1);
  });
});
