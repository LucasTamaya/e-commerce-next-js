import { render, screen } from "@testing-library/react";
import Product from "@/pages/product/[id]";

describe("Product Page", () => {
  it("should renders the product details", async () => {
    render(
      <Product
        id={1}
        category="shirt"
        description="A simple white shirt"
        image="https://product.jpg"
        price={20}
        rating={{ count: 8, rate: 8 }}
        title="A white shirt"
      />
    );

    expect(screen.getByText("A white shirt")).toBeInTheDocument();
    expect(screen.getByText("$20")).toBeInTheDocument();
    expect(screen.getByText("A simple white shirt")).toBeInTheDocument();
    expect(screen.getByText("Rating: 8/10")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should renders two CTA buttons", async () => {
    render(
      <Product
        id={1}
        category="shirt"
        description="A simple white shirt"
        image="https://product.jpg"
        price={20}
        rating={{ count: 8, rate: 8 }}
        title="A white shirt"
      />
    );

    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
});
