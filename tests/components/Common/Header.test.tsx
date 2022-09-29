import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from "@/components/Common/Header";

describe("Header Component", () => {
  it("should renders a single navigation link if the user is not sign-in", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "Sign-in" })).toBeInTheDocument();
  });

  it("should renders 4 navigation links if the user is sign-in", () => {
    // mock a random cookie
    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: "userId=ogkpae67aeAFE6876FZga",
    });

    render(<Header />);

    expect(screen.getAllByRole("link")).toHaveLength(4);
  });

  // it("should deletes the cookie if we click on Sign-out", async () => {
  //   Object.defineProperty(window.document, "cookie", {
  //     writable: true,
  //     value: "userId=ogkpae67aeAFE6876FZga",
  //   });

  //   render(<Navbar />);

  //   act(() => {
  //     fireEvent.click(screen.getByText("Sign-out"));
  //   });

  //   Object.defineProperty(window.document, "cookie", {
  //     writable: false,
  //     value: "",
  //   });

  //   expect(await screen.findAllByRole("listitem")).toHaveLength(1);
  // });
});
