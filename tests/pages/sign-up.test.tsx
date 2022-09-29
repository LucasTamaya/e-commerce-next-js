import { fireEvent, render, screen } from "@testing-library/react";

import SignUp from "@/pages/sign-up";
// import * as FirebaseConfig from "../../src/firebase/firebase-config";
// import { act } from "react-dom/test-utils";

jest.mock("../../src/firebase/firebase-config.ts", () => {
  return () => ({
    auth: jest.fn(),
  });
});

describe("Sign-up Page", () => {
  it("should renders the page", () => {
    render(<SignUp />);

    expect(screen.getByPlaceholderText("Email")).toBeTruthy();
    expect(screen.getByPlaceholderText("Password")).toBeTruthy();
    expect(screen.getByText(/Continue with Google/i)).toBeTruthy();
  });

  it("should shows error messages if input fields are incorrect", async () => {
    render(<SignUp />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitBtn = screen.getByText("Sign-up");

    fireEvent.change(emailInput, {
      target: { value: "N0t_aCorrect@email.45" },
    });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.click(submitBtn);

    expect(
      await screen.findByText("This email address is invalid")
    ).toBeTruthy();
    expect(await screen.findByText("This password is too short")).toBeTruthy();
  });

  it("should shows error messages if we submit the form with empty fields", async () => {
    render(<SignUp />);

    const submitBtn = screen.getByText("Sign-up");

    fireEvent.click(submitBtn);

    expect(await screen.findAllByText("This field is required")).toHaveLength(
      2
    );
  });

  // it("should renders an error message if the user already exists", () => {})
  // it("should renders an error message if there is an error during the fetch request", () => {})
  // it("should redirects the user to the index page if the authentication is successfull", () => {})
});
