import { describe, expect, it, vi } from "vitest";
import { render, waitFor, screen } from "@testing-library/react";
import AuthForm from ".";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "features/auth/authSlice";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import registerSlice from "features/register/registerSlice";

describe("AuthForm component", () => {
  const initialState = { users: [] };
  const mockStore = () =>
    configureStore({
      reducer: {
        auth: authSlice,
        register: registerSlice,
      },
    });
  const store = mockStore(initialState);
  const handleSubmit = vi.fn();
  const user = userEvent.setup();

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

  it("submits the login form with valid input", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <AuthForm handleSubmit={handleSubmit} />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", {
      name: /Log In/i,
    });

    await user.type(usernameInput, "testuser");

    await user.type(passwordInput, "testpassword");

    await user.click(loginButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

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

    await user.type(firstnameInput, "John");

    await user.type(lastnameInput, "Doe");

    await user.type(emailInput, "john.doe@example.com");

    await user.type(usernameInput, "johndoe");

    await user.type(passwordInput, "password123");

    await user.click(registerButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
