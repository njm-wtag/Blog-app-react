import { describe, expect, it, vi } from "vitest";
import { render, waitFor, screen } from "@testing-library/react";
import AuthForm from ".";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "features/auth/authSlice";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("AuthForm component", () => {
  const initialState = { users: [] };
  const mockStore = () =>
    configureStore({
      reducer: {
        auth: authSlice,
      },
    });
  const store = mockStore(initialState);
  const handleSubmit = vi.fn();
  const user = userEvent.setup();

  // const loginButton = screen.getByRole("button", {
  //   name: /Login/i,
  // });

  it("renders login form when location pathname is /login without errors", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <AuthForm handleSubmit={handleSubmit} />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  // it("submits the login form with valid input", async () => {
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter initialEntries={["/login"]}>
  //         <AuthForm handleSubmit={handleSubmit} />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const usernameInput = screen.getByPlaceholderText("Username");
  //   const passwordInput = screen.getByPlaceholderText("Password");
  //   const loginButton = screen.getByRole("button", {
  //     name: /Login/i,
  //   });

  //   await waitFor(() => {
  //     userEvent.type(usernameInput, "testuser");
  //     userEvent.type(passwordInput, "testpassword");
  //     userEvent.click(loginButton);
  //   });

  //   expect(handleSubmit).toHaveBeenCalledWith({
  //     username: "testuser",
  //     password: "testpassword",
  //   });
  // });

  it("renders register form when location pathname is /register without errors", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/register"]}>
          <AuthForm handleSubmit={handleSubmit} />
        </MemoryRouter>
      </Provider>
    );
    const firstnameInput = screen.getByPlaceholderText("First name");
    const lastnameInput = screen.getByPlaceholderText("Last name");
    const emailInput = screen.getByPlaceholderText("Email");
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(firstnameInput).toBeInTheDocument();
    expect(lastnameInput).toBeInTheDocument();
  });

  it("submits the register form with valid input", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/register"]}>
          <AuthForm handleSubmit={handleSubmit} />
        </MemoryRouter>
      </Provider>
    );
    const firstnameInput = screen.getByPlaceholderText("First name");
    const lastnameInput = screen.getByPlaceholderText("Last name");
    const emailInput = screen.getByPlaceholderText("Email");
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    const registerButton = screen.getByRole("button", {
      name: /Register/i,
    });

    await waitFor(() => {
      user.type(firstnameInput, "John");

      user.type(lastnameInput, "Doe");

      user.type(emailInput, "john.doe@example.com");

      user.type(usernameInput, "johndoe");

      user.type(passwordInput, "password123");

      user.click(registerButton);
    });

    // expect(handleSubmit).toBeCalled(1);
  });
});
