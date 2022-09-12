import { fireEvent, render, screen } from "@testing-library/react";

import SignIn from "@/pages/sign-in";
import * as FirebaseConfig from "../../firebase-config";
import { act } from "react-dom/test-utils";

jest.mock("../../firebase-config.ts", () => {
  return () => ({
    auth: jest.fn(),
  });
});

describe("SignIn Page", () => {
  it("should renders the page", () => {
    render(<SignIn />);

    expect(screen.getByPlaceholderText("Email")).toBeTruthy();
    expect(screen.getByPlaceholderText("Password")).toBeTruthy();
    expect(screen.getByText(/Sign-in with Google/i)).toBeTruthy();
  });

  it("should shows error messages if input fields are incorrect", async () => {
    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitBtn = screen.getByText("Sign-In");

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
    render(<SignIn />);

    const submitBtn = screen.getByText("Sign-In");

    fireEvent.click(submitBtn);

    expect(await screen.findAllByText("This field is required")).toHaveLength(
      2
    );
  });
});

// it("should push the user to the index page if the authentification is successfull", async () => {
//   render(<Login />);

//   const emailInput = screen.getByPlaceholderText("Email");
//   const passwordInput = screen.getByPlaceholderText("Password");
//   const submitBtn = screen.getByText("Sign-In");
//   act(() => {
//     fireEvent.change(emailInput, {
//       target: { value: "toto@orange.fr" },
//     });
//     fireEvent.change(passwordInput, { target: { value: "123456" } });
//     fireEvent.click(submitBtn);
//   });

//   expect(await screen.findByText("CONNECTED"));
// });

//   it("should renders an error message if the authentification fails", () => {});

//   it("should renders an error message if there is an error during the fetch request", () => {});
