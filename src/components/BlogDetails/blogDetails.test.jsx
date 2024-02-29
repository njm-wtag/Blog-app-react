import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import useAuth from "hooks/useAuth";
import useRegister from "hooks/useRegister";
import { describe, expect, it, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "features/auth/authSlice";
import registerSlice from "features/register/registerSlice";
import BlogDetails from ".";

vi.mock("hooks/useAuth");
vi.mock("hooks/useRegister");

describe("BlogDetails component", () => {
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

  useRegister.mockReturnValue({
    users: [
      {
        id: "authorId",
        username: "author username",
      },
      {
        id: "non-author user",
        username: "non-author username",
      },
    ],
  });

  it("should render blog details correctly", () => {
    const blogDetails = {
      id: "blogId",
      authorId: "authorId",
      title: "Blog Title",
      bannerImage: "banner.jpg",
      body: "Blog Body",
      createdAt: "2022-02-28T12:00:00.000Z",
      tags: [{ value: "technology", label: "Technology" }],
    };

    useAuth.mockReturnValue({ authUser: { id: "authorId" } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BlogDetails blogDetails={blogDetails} />
        </BrowserRouter>
      </Provider>
    );

    const titleElement = screen.getByText(/Blog Title/i);
    expect(titleElement).toBeInTheDocument();

    const authorNameElement = screen.getByText(/author username/i);
    expect(authorNameElement).toBeInTheDocument();

    const authorImageElement = screen.getByAltText(/author username/i);
    expect(authorImageElement).toBeInTheDocument();

    const blogCreatedTimeElement = screen.getByText(/2022-02-28/i);
    expect(blogCreatedTimeElement).toBeInTheDocument();

    const bannerImageElement = screen.getByAltText(/Banner Image/i);
    expect(bannerImageElement).toBeInTheDocument();

    const blogBodyElement = screen.getByText(/Blog Body/i);
    expect(blogBodyElement).toBeInTheDocument();

    const tagElement = screen.getByText(/Technology/i);
    expect(tagElement).toBeInTheDocument();
  });

  it("should display edit button if the blog is created by the auth user", () => {
    const blogDetails = {
      id: "blogId",
      authorId: "authorId",
      title: "Blog Title",
      bannerImage: "bannerImageURL",
      body: "Blog Body",
      createdAt: "2022-02-28T12:00:00.000Z",
      tags: [{ value: "technology", label: "Technology" }],
    };

    useAuth.mockReturnValue({ authUser: { id: "authorId" } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BlogDetails blogDetails={blogDetails} />
        </BrowserRouter>
      </Provider>
    );

    const editButton = screen.getByRole("link", {
      href: `/edit/${blogDetails.id}`,
    });
    expect(editButton).toBeInTheDocument();
  });

  it("should not display edit button if the blog is not created by the auth user", () => {
    const blogDetails = {
      id: "blogId",
      authorId: "authorId",
      title: "Blog Title",
      bannerImage: "bannerImageURL",
      body: "Blog Body",
      createdAt: "2022-02-28T12:00:00.000Z",
      tags: [{ value: "technology", label: "Technology" }],
    };

    useAuth.mockReturnValue({ authUser: { id: "non-author user" } });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BlogDetails blogDetails={blogDetails} />
        </BrowserRouter>
      </Provider>
    );

    const editButton = screen.queryByTestId("edit-button");
    expect(editButton).not.toBeInTheDocument();
  });
});
