import { render, screen } from "@testing-library/react";
import Cart from "@/pages/cart";
import { mockCartProducts } from "tests/mockData/cartProducts";
// import { doc, getDoc, setDoc } from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
}));

jest.mock("../../src/firebase/firebase-config.ts", () => {
  return () => ({
    auth: jest.fn(),
  });
});

describe("Cart Component", () => {
  it("should renders the component if a cookie is available", () => {
    render(<Cart cookie={true} products={[]} />);

    expect(screen.getByText("My Cart")).toBeInTheDocument();
  });

  it("should renders the component if there is no cookie", () => {
    render(<Cart cookie={false} products={[]} />);

    expect(screen.getByText("Please sign-in first")).toBeInTheDocument();
  });

  it("should renders some products if the user has added any", () => {
    render(<Cart cookie={true} products={mockCartProducts} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should renders a text if there are no products in the cart", () => {
    render(<Cart cookie={true} products={[]} />);

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  // it("should renders an error message if the fetch request fails in the getServerSideProps", () => {});
});
