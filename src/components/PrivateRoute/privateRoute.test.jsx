import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import useLocalStorageAuth from "hooks/useLocalStorageAuth";
import authSlice from "features/auth/authSlice";
import blogsSlice from "features/blogs/blogsSlice";
import EditBlog from "pages/EditBlog";
import Profile from "pages/Profile";
import Login from "pages/Login";
import PrivateRoute from ".";

vi.mock("hooks/useLocalStorageAuth");
vi.mock("hooks/useAuth");
const mockDispatch = vi.fn();
vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: vi.fn(),
  Provider: ({ children }) => children,
}));
vi.mock("hooks/useSearch", () => ({
  default: () => ({
    search: {
      homeQuery: "",
      profileQuery: "",
    },
  }),
}));

vi.mock("hooks/useBlogs");
vi.mock("hooks/useFilter", () => ({
  default: () => ({
    filter: {
      filteredTagsInProfile: "",
    },
  }),
}));
vi.mock("hooks/usePaginate", () => ({
  default: () => ({
    paginate: {
      blogsPerPageInProfile: "",
    },
  }),
}));

describe("PrivateRoute Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockStore = (initialState) =>
    configureStore({
      reducer: {
        auth: authSlice,
        blog: blogsSlice,
      },
      preloadedState: initialState,
    });

  it("navigates to login if not logged in", async () => {
    useLocalStorageAuth.mockReturnValue(false);
    const initialState = {
      auth: {
        authUser: null,
      },
    };
    vi.mock("hooks/useAuth", () => ({
      default: () => ({
        authUser: null,
      }),
    }));

    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/me" element={<Profile />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const loginElements = screen.getAllByText(/Login/i);
    expect(loginElements.length).toBeGreaterThan(0);
  });

  it("navigates to private route when the user is logged in", async () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    useLocalStorageAuth.mockReturnValue(true);

    const initialState = {
      auth: {
        authUser: {
          firstname: "John",
          lastname: "Doe",
          username: "johndoe",
          subtitle: "Software Engineer",
          about: "Lorem ipsum dolor sit amet",
          profileImage: "profile.jpg",
        },
      },
    };
    vi.mock("hooks/useAuth", () => ({
      default: () => ({
        authUser: {
          firstname: "John",
          lastname: "Doe",
          username: "johndoe",
          subtitle: "Software Engineer",
          about: "Lorem ipsum dolor sit amet",
          profileImage: "profile.jpg",
        },
      }),
    }));

    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={["/edit/1"]}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/edit/1" element={<EditBlog />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const editBlogElements = screen.getByText(/Edit blog/i);

    expect(editBlogElements).toBeInTheDocument();
  });
});
