import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BlogList from ".";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import blogsSlice from "features/blogs/blogsSlice";
import registerSlice from "features/register/registerSlice";
import useRegister from "hooks/useRegister";
import userEvent from "@testing-library/user-event";

vi.mock("hooks/useRegister");
vi.mock("components/BlogCard", () => {
  return {
    default: ({ blog }) => <div data-testid="blog-card">{blog.title}</div>,
  };
});

describe("BlogList Component", () => {
  const user = userEvent.setup();

  it("should render blog list correctly", () => {
    const blogs = [
      {
        id: "1",
        authorId: "author1",
        bannerImage: "banner1.jpg",
        createdAt: "2024-02-28T12:00:00.000Z",
        tags: [{ value: "technology", label: "Technology" }],
        title: "Sample Blog 1",
      },
      {
        id: "2",
        authorId: "author2",
        bannerImage: "banner2.jpg",
        createdAt: "2024-03-01T12:00:00.000Z",
        tags: [{ value: "flim", label: "Flim" }],
        title: "Sample Blog 2",
      },
    ];

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
      users: [
        {
          id: "author1",
          username: "John doe",
        },
        {
          id: "author2",
          username: "Jame smith",
        },
      ],
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BlogList
            blogs={blogs}
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
    const blogs = [
      {
        id: "1",
        authorId: "author1",
        bannerImage: "banner1.jpg",
        createdAt: "2024-02-28T12:00:00.000Z",
        tags: [{ value: "tech", label: "Tech" }],
        title: "Sample Blog 1",
      },
      {
        id: "2",
        authorId: "author2",
        bannerImage: "banner2.jpg",
        createdAt: "2024-02-28T12:00:00.000Z",
        tags: [{ value: "flim", label: "Flim" }],
        title: "Sample Blog 2",
      },
      {
        id: "3",
        authorId: "author1",
        bannerImage: "banner.jpg",
        createdAt: "2024-03-05T12:00:00.000Z",
        tags: [{ value: "technology", label: "Technology" }],
        title: "Sample Blog 3",
      },
    ];

    render(
      <BlogList
        blogs={blogs}
        query=""
        handleLoadMore={handleLoadMore}
        handleShowLess={() => {}}
        blogsPerPage={2}
        currentPage={1}
      />
    );
    const loaadMoreButton = screen.getByRole("button", { name: /Load More/i });
    expect(loaadMoreButton).toBeInTheDocument;
    await user.click(loaadMoreButton);
    expect(handleLoadMore).toHaveBeenCalled();
  });

  it("should invoke handleShowLess when show less button is clicked", async () => {
    const handleShowLess = vi.fn();
    const blogs = [
      {
        id: "1",
        authorId: "author1",
        bannerImage: "banner1.jpg",
        createdAt: "2024-02-28T12:00:00.000Z",
        tags: [{ value: "technology", label: "Technology" }],
        title: "Sample Blog 1",
      },
      {
        id: "2",
        authorId: "author2",
        bannerImage: "banner2.jpg",
        createdAt: "2024-02-28T12:00:00.000Z",
        tags: [{ value: "flim", label: "Flim" }],
        title: "Sample Blog 2",
      },
      {
        id: "3",
        authorId: "author1",
        bannerImage: "banner3.jpg",
        createdAt: "2024-03-05T12:00:00.000Z",
        tags: [{ value: "technology", label: "Technology" }],
        title: "Sample Blog 3",
      },
    ];

    render(
      <BlogList
        blogs={blogs}
        query=""
        handleShowLess={handleShowLess}
        blogsPerPage={2}
        currentPage={2}
      />
    );
    const showLessButton = screen.getByRole("button", { name: /Show Less/i });
    expect(showLessButton).toBeInTheDocument;
    await user.click(showLessButton);
    expect(handleShowLess).toHaveBeenCalled();
  });

  it("should filter blogs based on query correctly", () => {
    const handleSelect = vi.fn();
    const handleLoadMore = vi.fn();
    const handleShowLess = vi.fn();
    const blogs = [
      {
        id: "1",
        authorId: "author1",
        bannerImage: "banner1.jpg",
        createdAt: "2024-02-28T12:00:00.000Z",
        tags: [{ value: "technology", label: "Technology" }],
        title: "Sample Blog 1",
      },
      {
        id: "2",
        authorId: "author2",
        bannerImage: "banner2.jpg",
        createdAt: "2024-02-28T12:00:00.000Z",
        tags: [{ value: "flim", label: "Flim" }],
        title: "Sample Blog 2",
      },
    ];

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
      users: [
        {
          id: "author1",
          username: "John Doe",
        },
        {
          id: "author2",
          username: "James Smith",
        },
      ],
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <BlogList
            blogs={blogs}
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

  it("should call handleSelect with the correct tag value when a tag button is clicked", () => {
    const blogs = [
      {
        id: "1",
        authorId: "author1",
        bannerImage: "banner1.jpg",
        createdAt: "2024-02-28T12:00:00.000Z",
        tags: [{ value: "technology", label: "Technology" }],
        title: "Sample Blog 1",
      },
      {
        id: "2",
        authorId: "author2",
        bannerImage: "banner2.jpg",
        createdAt: "2024-02-28T12:00:00.000Z",
        tags: [{ value: "flim", label: "Flim" }],
        title: "Sample Blog 2",
      },
    ];

    const handleSelect = vi.fn();
    const toggleSelected = vi.fn((tagValue) => tagValue === "technology");

    render(
      <BlogList
        blogs={blogs}
        query=""
        handleSelect={handleSelect}
        blogsPerPage={2}
        currentPage={1}
        toggleSelected={toggleSelected}
        filteredTags={["technology"]}
      />
    );

    const techTagButton = screen.getByRole("button", { name: "Technology" });
    expect(techTagButton).toBeInTheDocument();

    user.click(techTagButton);

    expect(handleSelect).toHaveBeenCalled();
  });
});
