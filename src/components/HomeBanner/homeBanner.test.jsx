import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import authSlice from "features/auth/authSlice";
import registerSlice from "features/register/registerSlice";
import useAuth from "hooks/useAuth";
import useRegister from "hooks/useRegister";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import HomeBanner from ".";

vi.mock("hooks/useAuth");
vi.mock("hooks/useRegister");

describe("HomeBanner component", () => {
  const initialState = {};
  const mockStore = (initialState) =>
    configureStore({
      reducer: {
        auth: authSlice,
        register: registerSlice,
      },
      preloadedState: initialState,
    });

  const store = mockStore(initialState);

  it("should render with provided blog data", () => {
    const blog = {
      authorId: "author123",
      bannerImage: "banner.jpg",
      createdAt: "2024-03-01",
      tags: [{ label: "Technology" }],
      title: "Sample Title",
    };
    const authorDetails = {
      id: "author123",
      firstname: "John",
      lastname: "Doe",
      profileImage: "profile.jpg",
      username: "johndoe",
    };

    useAuth.mockReturnValue({ authUser: { id: "author123" } });
    useRegister.mockReturnValue({ users: [authorDetails] });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomeBanner blog={blog} />
        </BrowserRouter>
      </Provider>
    );

    const titleElement = screen.getByText(blog.title);
    expect(titleElement).toBeInTheDocument();

    const authorNameElement = screen.getByText(/john doe/i);
    expect(authorNameElement).toBeInTheDocument();

    const authorImageElement = screen.getByAltText(authorDetails.username);
    expect(authorImageElement).toBeInTheDocument();

    const blogCreatedTimeElement = screen.getByText(
      blog.createdAt.substring(0, 10)
    );
    expect(blogCreatedTimeElement).toBeInTheDocument();

    const bannerImageElement = screen.getByTestId("background");
    expect(bannerImageElement).toHaveStyle(
      `background-image: url(${blog.bannerImage})`
    );

    const tagElement = screen.getByText(blog.tags[0].label);
    expect(tagElement).toBeInTheDocument();
  });
});
