import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import useRegister from "hooks/useRegister";
import blogsSlice from "features/blogs/blogsSlice";
import registerSlice from "features/register/registerSlice";
import BlogCard from ".";

vi.mock("hooks/useRegister");

describe("BlogCard", () => {
  const users = [
    {
      id: "author1",
      firstname: "John",
      lastname: "Doe",
      profileImage: "profile.jpg",
    },
  ];

  useRegister.mockReturnValue({ users });

  const initialState = {
    blogs: [],
  };

  const mockStore = () =>
    configureStore({
      reducer: {
        blog: blogsSlice,
        register: registerSlice,
      },
    });

  const store = mockStore(initialState);
  const blog = {
    id: "1",
    authorId: "author1",
    bannerImage: "banner.jpg",
    createdAt: "2024-02-26T12:00:00Z",
    tags: [{ value: "tech", label: "Technology" }],
    title: "Test Blog Title",
  };

  it("should render blog card with correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BlogCard blog={blog} />
        </BrowserRouter>
      </Provider>
    );

    const titleElements = screen.getAllByRole("link", {
      name: /Test Blog Title/i,
    });

    expect(titleElements.length).toBe(2);
    const titleElement = titleElements[0];
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.getAttribute("href")).toBe(`/blog/${blog.id}`);

    const bannerImageElement = screen.getByAltText(/Test Blog Title/i);
    expect(bannerImageElement).toBeInTheDocument();

    const tagElement = screen.getByText(/Technology/i);
    expect(tagElement).toBeInTheDocument();

    const authorNameElement = screen.getByText(/John Doe/i);
    expect(authorNameElement).toBeInTheDocument();

    const createdAtElement = screen.getByText(/2024-02-26/i);
    expect(createdAtElement).toBeInTheDocument();
  });
});
