import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import useRegister from "hooks/useRegister";
import blogsSlice from "features/blogs/blogsSlice";
import registerSlice from "features/register/registerSlice";
import BlogList from ".";
import { mockBlogs, mockTags, mockUsers } from "utils/testHelper";
import { BUTTON } from "utils/const";

vi.mock("hooks/useRegister");
vi.mock("components/BlogCard", () => {
  return {
    default: ({ blog }) => <div data-testid="blog-card">{blog.title}</div>,
  };
});

describe("BlogList Component", () => {
  const user = userEvent.setup();

  it("should render blog list correctly", () => {
    const handleSelect = vi.fn();
    const handleLoadMore = vi.fn();
    const handleShowLess = vi.fn();

    const initialState = {};

    const mockStore = (initialState) =>
      configureStore({
        reducer: {
          register: registerSlice,
          blog: blogsSlice,
        },
        preloadedState: initialState,
      });

    const store = mockStore(initialState);

    useRegister.mockReturnValue({
      users: mockUsers,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BlogList
            blogs={mockBlogs}
            query=""
            handleSelect={handleSelect}
            handleLoadMore={handleLoadMore}
            handleShowLess={handleShowLess}
            blogsPerPage={2}
            currentPage={1}
          />
        </BrowserRouter>
      </Provider>
    );

    const blogCards = screen.getAllByTestId("blog-card");
    expect(blogCards.length).toBe(2);
    expect(screen.getByText("Sample Blog 1")).toBeInTheDocument();
    expect(screen.getByText("Sample Blog 2")).toBeInTheDocument();
  });

  it("should invoke handleLoadMore when Load More button is clicked", async () => {
    const handleLoadMore = vi.fn();

    render(
      <BlogList
        blogs={mockBlogs}
        query=""
        handleLoadMore={handleLoadMore}
        handleShowLess={() => {}}
        blogsPerPage={2}
        currentPage={1}
      />
    );
    const loaadMoreButton = screen.getByRole(BUTTON, { name: /Load More/i });
    expect(loaadMoreButton).toBeInTheDocument;
    await user.click(loaadMoreButton);
    expect(handleLoadMore).toHaveBeenCalled();
  });

  it("should invoke handleShowLess when show less button is clicked", async () => {
    const handleShowLess = vi.fn();

    render(
      <BlogList
        blogs={mockBlogs}
        query=""
        handleShowLess={handleShowLess}
        blogsPerPage={2}
        currentPage={2}
      />
    );
    const showLessButton = screen.getByRole(BUTTON, { name: /Show Less/i });
    expect(showLessButton).toBeInTheDocument;
    await user.click(showLessButton);
    expect(handleShowLess).toHaveBeenCalled();
  });

  it("should filter blogs based on query correctly", () => {
    const handleSelect = vi.fn();
    const handleLoadMore = vi.fn();
    const handleShowLess = vi.fn();

    const initialState = {};

    const mockStore = (initialState) =>
      configureStore({
        reducer: {
          register: registerSlice,
          blog: blogsSlice,
        },
        preloadedState: initialState,
      });

    const store = mockStore(initialState);

    useRegister.mockReturnValue({
      users: mockUsers,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BlogList
            blogs={mockBlogs}
            query="Sample Blog 1"
            handleSelect={handleSelect}
            handleLoadMore={handleLoadMore}
            handleShowLess={handleShowLess}
            blogsPerPage={2}
            currentPage={1}
          />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Sample Blog 1")).toBeInTheDocument();
    expect(screen.queryByText("Sample Blog 2")).toBeNull();
  });

  it("should call handleSelect with the correct tag value when a tag is clicked", async () => {
    const handleSelect = vi.fn();

    render(
      <BlogList
        blogs={mockBlogs}
        query=""
        handleSelect={handleSelect}
        blogsPerPage={2}
        currentPage={1}
        toggleSelected={() => {}}
        filteredTags={["technology"]}
      />
    );

    const techTagButton = screen.getByRole(BUTTON, { name: "Technology" });

    user.click(techTagButton);

    await waitFor(() => {
      expect(techTagButton).toBeInTheDocument();
      expect(handleSelect).toHaveBeenCalledWith(mockTags[0].value);
    });
  });
});
