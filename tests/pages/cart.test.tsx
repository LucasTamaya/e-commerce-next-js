import { fireEvent, screen } from "@testing-library/react";
import Cart from "@/pages/cart";
import { mockCartProducts } from "tests/mockData/cartProducts";
import { act } from "react-dom/test-utils";
// import { doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { renderWithClient } from "@/config/utils";

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
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should renders the component if a cookie is available", () => {
    renderWithClient(<Cart cookie={true} products={[]} totalAmount={0} />);

    expect(screen.getByText("My Cart")).toBeInTheDocument();
  });

  it("should renders the component if there is no cookie", () => {
    renderWithClient(<Cart cookie={false} products={[]} totalAmount={0} />);

    expect(screen.getByText("Please sign-in first")).toBeInTheDocument();
  });

  it("should renders a checkout button if there are some products", () => {
    renderWithClient(
      <Cart cookie={true} products={mockCartProducts} totalAmount={75.28} />
    );

    expect(screen.getByText("Proceed to checkout")).toBeInTheDocument();
  });

  it("should renders some products if the user has added any", () => {
    renderWithClient(
      <Cart cookie={true} products={mockCartProducts} totalAmount={75.28} />
    );

    expect(screen.getAllByRole("img")).toHaveLength(3);
    expect(screen.getAllByText("See more")).toHaveLength(3);
    expect(screen.getAllByText("Delete from cart")).toHaveLength(3);
    expect(screen.getByText("Total amount: $75.28")).toBeInTheDocument();
  });

  it("should renders a text if there are no products in the cart", () => {
    renderWithClient(<Cart cookie={true} products={[]} totalAmount={0} />);

    expect(screen.getByText("Your cart is empty :(")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should delete the product if we click on Delete from cart", async () => {
    renderWithClient(
      <Cart cookie={true} products={mockCartProducts} totalAmount={75.28} />
    );

    expect(screen.getAllByRole("img")).toHaveLength(3);

    act(() => {
      fireEvent.click(screen.getAllByText("Delete from cart")[0]);
    });

    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  // it("should ");

  // it("should update the total amount when we delete a product", () => {});

  // it("should renders an error message if the fetch request fails in the getServerSideProps", () => {});
});
