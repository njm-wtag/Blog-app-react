import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import useBlogs from "hooks/useBlogs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Blog from "./Blog";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import blogsSlice from "features/blogs/blogsSlice";
import authSlice from "features/auth/authSlice";
import searchSlice from "features/search/searchSlice";

vi.mock("react-router-dom", () => ({
  BrowserRouter: vi.fn().mockImplementation((props) => props.children),
  useParams: vi.fn(),
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));

vi.mock("hooks/useBlogs");

describe("Blog component", () => {
  beforeEach(() => {
    useParams.mockReturnValue({ blogId: "123" });
  });
  const initialState = {};

  const mockStore = (initialState) =>
    configureStore({
      reducer: {
        blog: blogsSlice,
        auth: authSlice,
        search: searchSlice,
      },
      preloadedState: initialState,
    });

  const store = mockStore(initialState);

  it("should render BlogDetails component with correct blogDetails prop", () => {
    const blogDetails = {
      id: "123",
      title: "Test Blog",
      bannerImage: "banner.jpg",
      body: "Test Blog Body",
      createdAt: "2022-02-28T12:00:00.000Z",
      tags: [{ label: "Tag" }],
    };

    useBlogs.mockReturnValue([blogDetails]);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Blog />
        </BrowserRouter>
      </Provider>
    );
    const blogElements = screen.getByText("Test Blog");
    console.log(blogElements);
    expect(blogElements).toBeInTheDocument();
  });
});
