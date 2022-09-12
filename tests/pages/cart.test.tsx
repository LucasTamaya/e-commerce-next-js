import { render, screen } from "@testing-library/react";
import Cart from "@/pages/cart";

describe("Cart Component", () => {
  it("should renders the component", () => {
    render(<Cart />);

    expect(screen.getByText("My Cart")).toBeInTheDocument();
  });

  it("should renders some products if the user has added any", () => {
    render(<Cart />);

    expect(screen.getAllByRole("listitem")).toHaveLength(10);
  });

  // it("should renders a text if there are no products in the cart", () => {});
  // it("should renders an error message if the fetch request fails", () => {});
});
