import { fireEvent, screen } from "@testing-library/react";
import { rest } from "msw";
import { act } from "react-dom/test-utils";

import { renderWithClient } from "@/config/utils";
import { server } from "@/config/server";
import ProductDetails from "@/components/Product/ProductDetails";
import { IFood } from "../../../src/interfaces/index";

const mockProduct: IFood = {
  dsc: "A small description",
  id: "burger-1",
  img: "http://burger.jpg",
  price: 10,
  name: "Burger",
  quantity: 1,
  category: "burger",
};

describe("Product Page", () => {
  it("should renders the product details", async () => {
    renderWithClient(<ProductDetails productData={mockProduct} />);

    expect(screen.getByText("A small description")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();
    expect(screen.getByText("Burger")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should renders two CTA buttons", async () => {
    renderWithClient(<ProductDetails productData={mockProduct} />);

    expect(
      screen.getByRole("button", { name: "Order now" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add to cart" })
    ).toBeInTheDocument();
  });

  it("should renders a success message if we are authenticated and we add a product to cart", async () => {
    renderWithClient(<ProductDetails productData={mockProduct} />);

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

    renderWithClient(<ProductDetails productData={mockProduct} />);

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

    renderWithClient(<ProductDetails productData={mockProduct} />);

    const addToCartBtn = screen.getByText("Add to cart");

    act(() => {
      fireEvent.click(addToCartBtn);
    });

    expect(await screen.findByText("Something went wrong")).toBeInTheDocument();
  });
});
