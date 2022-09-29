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
        id="the-original-burger"
        name="A delicious burger"
        img="https://burgers.jpg"
        price={15}
        category="burgers"
      />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(/A delicious burger/i)).toBeInTheDocument();
    expect(screen.getByText("$15")).toBeInTheDocument();
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("should renders a link button to see the product's details", () => {
    render(
      <ProductCard
        id="the-original-burger"
        name="A delicious burger"
        img="https://burgers.jpg"
        price={15}
        category="burgers"
      />
    );

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/burgers/the-original-burger"
    );
  });
});
