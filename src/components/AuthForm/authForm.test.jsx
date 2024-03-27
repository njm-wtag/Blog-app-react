import { describe, expect, it, vi } from "vitest";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import authSlice from "features/auth/authSlice";
import registerSlice from "features/register/registerSlice";
import {
  BUTTON,
  EMAIL,
  EMAIL_LABEL,
  FIRST_NAME,
  LAST_NAME,
  PASSWORD,
  PASSWORD_LABEL,
  TYPE,
  USERNAME,
} from "utils/const";
import AuthForm from ".";

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

    const usernameInput = screen.getByPlaceholderText(USERNAME);
    const passwordInput = screen.getByPlaceholderText(PASSWORD_LABEL);

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute(TYPE, PASSWORD);
  });

  it("submits the login form with valid input", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <AuthForm handleSubmit={handleSubmit} />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText(USERNAME);
    const passwordInput = screen.getByPlaceholderText(PASSWORD_LABEL);
    const loginButton = screen.getByRole(BUTTON, {
      name: /Log In/i,
    });

    await user.type(usernameInput, "johndoe");

    await user.type(passwordInput, "password123");

    await user.click(loginButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled({
        username: "johndoe",
        password: "password123",
      });
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
    const firstnameInput = screen.getByPlaceholderText(FIRST_NAME);
    const lastnameInput = screen.getByPlaceholderText(LAST_NAME);
    const emailInput = screen.getByPlaceholderText(EMAIL_LABEL);
    const usernameInput = screen.getByPlaceholderText(USERNAME);
    const passwordInput = screen.getByPlaceholderText(PASSWORD_LABEL);

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute(TYPE, PASSWORD);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute(TYPE, EMAIL);
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

    const firstnameInput = screen.getByPlaceholderText(FIRST_NAME);
    const lastnameInput = screen.getByPlaceholderText(LAST_NAME);
    const emailInput = screen.getByPlaceholderText(EMAIL_LABEL);
    const usernameInput = screen.getByPlaceholderText(USERNAME);
    const passwordInput = screen.getByPlaceholderText(PASSWORD_LABEL);

    const registerButton = screen.getByRole(BUTTON, {
      name: /Register/i,
    });

    await user.type(firstnameInput, "John");

    await user.type(lastnameInput, "Doe");

    await user.type(emailInput, "john.doe@example.com");

    await user.type(usernameInput, "johndoe");

    await user.type(passwordInput, "password123");

    await user.click(registerButton);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled([
        {
          firstname: "John",
          lastname: "Doe",
          email: "john.doe@example.com",
          username: "johndoe",
          password: "password123",
        },
      ]);
    });
  });
});
