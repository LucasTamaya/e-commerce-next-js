import { rest } from "msw";
import { server } from "tests/config/server";
import ProductList from "../../../src/components/Product/ProductList";
import { renderWithClient } from "../../config/utils";

describe("ProductList Component", () => {
  it("should renders the component", () => {
    const { getByRole } = renderWithClient(
      <ProductList category="men's clothing" />
    );

    expect(getByRole("heading")).toBeInTheDocument();
  });

  it("should renders some ProductCards when the fetch request is done", async () => {
    const { findAllByRole } = renderWithClient(
      <ProductList category="men's clothing" />
    );

    expect(await findAllByRole("listitem")).toHaveLength(4);
  });

  it("should renders an error message if the fetch request fails", async () => {
    server.use(
      rest.get("*", (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { findByText } = renderWithClient(
      <ProductList category="men's clothing" />
    );

    expect(
      await findByText("Something went wrong, please try again.")
    ).toBeTruthy();
  });
});
