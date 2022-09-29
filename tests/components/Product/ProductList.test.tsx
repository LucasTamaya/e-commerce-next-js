import { rest } from "msw";

import { server } from "tests/config/server";
import ProductList from "@/components/Product/ProductList";
import { renderWithClient } from "@/config/utils";

describe("ProductList Component", () => {
  it("should renders the component", () => {
    const { getByText } = renderWithClient(
      <ProductList category="burgers" title="Burgers" />
    );

    expect(getByText(/Burgers/i)).toBeInTheDocument();
  });

  it("should renders some ProductCards when the fetch request is done", async () => {
    const { findAllByText, findAllByRole } = renderWithClient(
      <ProductList category="burgers" title="Burgers" />
    );

    expect(await findAllByText("Burger")).toHaveLength(3);
    expect(await findAllByText("$10")).toHaveLength(3);
    expect(await findAllByRole("img")).toHaveLength(3);
  });

  it("should renders an error message if the fetch request fails", async () => {
    server.use(
      rest.get("*", (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { findByText } = renderWithClient(
      <ProductList category="burgers" title="Burgers" />
    );

    expect(
      await findByText("Something went wrong, please try again.")
    ).toBeTruthy();
  });
});
