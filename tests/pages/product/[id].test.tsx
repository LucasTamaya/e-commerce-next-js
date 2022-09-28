import { fireEvent, screen } from "@testing-library/react";
import { rest } from "msw";
import { act } from "react-dom/test-utils";

import Product from "@/pages/best-foods/[id]";
import { renderWithClient } from "@/config/utils";
import { server } from "@/config/server";
import { mockProductData } from "tests/mockData/productData";

describe("Product Page", () => {
  it("should renders the product details", async () => {
    renderWithClient(<Product productData={mockProductData} />);

    expect(screen.getByText("A white shirt")).toBeInTheDocument();
    expect(screen.getByText("$20")).toBeInTheDocument();
    expect(screen.getByText("A simple white shirt")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should renders two CTA buttons", async () => {
    renderWithClient(<Product productData={mockProductData} />);

    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("should renders a success message if we are authenticated and we add a product to cart", async () => {
    renderWithClient(<Product productData={mockProductData} />);

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
      rest.post("*/cart/add*", (req, res, ctx) => {
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

    renderWithClient(<Product productData={mockProductData} />);

    const addToCartBtn = screen.getByText("Add to cart");

    act(() => {
      fireEvent.click(addToCartBtn);
    });

    expect(await screen.findByText("Please sign-in first")).toBeInTheDocument();
  });

  it("should renders an error message if the fetch request fails", async () => {
    // simulates that we don't have cookies on that request
    server.use(
      rest.post("*/cart/add*", (req, res, ctx) => {
        console.log(req);

        return res(ctx.status(500));
      })
    );

    renderWithClient(<Product productData={mockProductData} />);

    const addToCartBtn = screen.getByText("Add to cart");

    act(() => {
      fireEvent.click(addToCartBtn);
    });

    expect(await screen.findByText("Something went wrong")).toBeInTheDocument();
  });
});
