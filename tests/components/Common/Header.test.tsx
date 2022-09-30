import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from "@/components/Common/Header";

describe("Header Component", () => {
  it("should renders basic navigation links + sign-in link if the user is not sign-in", () => {
    render(<Header />);

    expect(screen.getAllByRole("link")).toHaveLength(5);
    expect(screen.getByRole("link", { name: "Sign-in" })).toBeInTheDocument();
  });

  it("should renders basic navigation links + sign-out button if the user is sign-in", () => {
    // mock a random cookie
    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: "userId=ogkpae67aeAFE6876FZga",
    });

    render(<Header />);

    expect(screen.getAllByRole("link")).toHaveLength(5);
    expect(
      screen.getByRole("button", { name: "Sign-out" })
    ).toBeInTheDocument();
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
