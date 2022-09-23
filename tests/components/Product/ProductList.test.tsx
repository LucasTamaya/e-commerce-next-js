import { rest } from "msw";

import { server } from "tests/config/server";
import ProductList from "@/components/Product/ProductList";
import { renderWithClient } from "@/config/utils";

describe("ProductList Component", () => {
  it("should renders the component", () => {
    const { getByText } = renderWithClient(
      <ProductList fetchDetails="products" title="Men's Products" />
    );

    expect(getByText(/Men's Products/i)).toBeInTheDocument();
  });

  it("should renders some ProductCards when the fetch request is done", async () => {
    const { findAllByText, findAllByRole } = renderWithClient(
      <ProductList fetchDetails="products" title="Men's Products" />
    );

    expect(await findAllByText("Product")).toHaveLength(4);
    expect(await findAllByText("$10")).toHaveLength(4);
    expect(await findAllByRole("img")).toHaveLength(4);
  });

  it("should renders an error message if the fetch request fails", async () => {
    server.use(
      rest.get("*", (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { findByText } = renderWithClient(
      <ProductList fetchDetails="products" title="Men's Products" />
    );

    expect(
      await findByText("Something went wrong, please try again.")
    ).toBeTruthy();
  });
});
