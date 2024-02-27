import { render, screen } from "@testing-library/react";
import BlogCard from ".";
import { describe, expect, it } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import blogsSlice from "features/blogs/blogsSlice";
import registerSlice from "features/register/registerSlice";

describe("BlogCard", () => {
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

  it("renders blog card with correct content", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BlogCard blog={blog} />
        </BrowserRouter>
      </Provider>
    );
    const titleElement = screen.getByText(/Test Blog Title/i);
    expect(titleElement).toBeInTheDocument();
  });
});
