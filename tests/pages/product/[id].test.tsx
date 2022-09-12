import { findByText, fireEvent, screen } from "@testing-library/react";
import Product from "@/pages/product/[id]";
import { renderWithClient } from "@/config/utils";
import { act } from "react-dom/test-utils";
import { server } from "@/config/server";
import { rest } from "msw";

describe("Product Page", () => {
  it("should renders the product details", async () => {
    renderWithClient(
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
    renderWithClient(
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

  it("should renders a success message if we are authenticated and we add a product to cart", async () => {
    renderWithClient(
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

    const addToCartBtn = screen.getByText("Add to cart");

    act(() => {
      fireEvent.click(addToCartBtn);
    });

    expect(
      await screen.findByText("Product correctly added to cart")
    ).toBeInTheDocument();
  });

  it("should renders a warning message if we are not authenticated and we add a product to cart", async () => {
    // simulates that we don't have cookies on that request
    server.use(
      rest.post("*/add-to-cart", (req, res, ctx) => {
        console.log(req);

        return res(
          ctx.status(200),
          ctx.json({
            error: true,
            message: "Please sign-in first",
          })
        );
      })
    );

    renderWithClient(
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

    const addToCartBtn = screen.getByText("Add to cart");

    act(() => {
      fireEvent.click(addToCartBtn);
    });

    expect(await screen.findByText("Please sign-in first")).toBeInTheDocument();
  });
});
