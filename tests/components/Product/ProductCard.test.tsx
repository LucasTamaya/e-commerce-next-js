import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ProductCard from "@/components/Product/ProductCard";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe("ProductCard Component", () => {
  it("should renders the component with a product", () => {
    render(
      <ProductCard
        id={1}
        title="A super tee-shirt"
        image="https://tee-shirt.jpg"
        price={10.8}
      />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(/A super tee-shirt/i)).toBeInTheDocument();
    expect(screen.getByText("$10.8")).toBeInTheDocument();
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("should renders a link button to see the product's details", () => {
    render(
      <ProductCard
        id={1}
        title="A super tee-shirt"
        image="https://tee-shirt.jpg"
        price={10.8}
      />
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/product/1");
  });
});

// should be able to add the product to the cart
