import { render, screen } from "@testing-library/react";

import ProductCard from "../../../src/components/Product/ProductCard";

describe("ProductCard Component", () => {
  it("should renders the component", () => {
    render(
      <ProductCard
        id={1}
        title="A super tee-shirt"
        image="https://tee-shirt.jpg"
        price={10.8}
        rating={{ rate: 8, count: 8 }}
        category="tee-shirt"
        description="A simple and very confortable tee-shirt"
      />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(/A super tee-shirt/i)).toBeInTheDocument();
    expect(screen.getByText("$10.8")).toBeInTheDocument();
  });
});

// should renders the component
// should be able to the product to the cart
// should be able to click on the product to see more details

export {};
