import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import useAuth from "hooks/useAuth";
import authSlice from "features/auth/authSlice";
import { mockAuthUser } from "utils/testHelper";
import AuthorDetails from ".";

vi.mock("hooks/useAuth");

describe("AuthorDetails component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const initialState = {};

  const mockStore = (initialState) =>
    configureStore({
      reducer: {
        auth: authSlice,
      },
      preloadedState: initialState,
    });

  const store = mockStore(initialState);

  it("should render author details properly", () => {
    useAuth.mockReturnValue({ authUser: mockAuthUser });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthorDetails />
        </BrowserRouter>
      </Provider>
    );
    const profileImageElement = screen.getByAltText("Profile");
    expect(profileImageElement).toBeInTheDocument();

    const fullNameElement = screen.getByText(/John Doe/i);
    expect(fullNameElement).toBeInTheDocument();

    const subtitleElement = screen.getByText(/Subtitle/i);
    expect(subtitleElement).toBeInTheDocument();

    const aboutElement = screen.getByText(/About me/i);
    expect(aboutElement).toBeInTheDocument();
  });

  it("should render author social links properly", () => {
    useAuth.mockReturnValue({ authUser: mockAuthUser });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthorDetails />
        </BrowserRouter>
      </Provider>
    );
    const facebookElement = screen.getByAltText("Facebook");
    expect(facebookElement).toBeInTheDocument();

    const twitterElement = screen.getByAltText("Twitter");
    expect(twitterElement).toBeInTheDocument();

    const instagramElement = screen.getByAltText("Instagram");
    expect(instagramElement).toBeInTheDocument();

    const youtubeElement = screen.getByAltText("Youtube");
    expect(youtubeElement).toBeInTheDocument();
  });
});
