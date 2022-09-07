import { server } from "./tests/config/server";
import "@testing-library/jest-dom/extend-expect";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
