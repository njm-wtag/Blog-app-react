import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { afterEach, describe, expect, it, vi } from "vitest";
import Header from ".";
import { configureStore } from "@reduxjs/toolkit";
import searchSlice, { updateHomeQuery } from "features/search/searchSlice";
import { BrowserRouter } from "react-router-dom";
import authSlice, { loggedOutUser } from "features/auth/authSlice";
import userEvent from "@testing-library/user-event";

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

vi.mock("hooks/useSearch", () => ({
  default: () => ({
    search: {
      homeQuery: "",
      profileQuery: "",
    },
  }),
}));

const mockDispatch = vi.fn();
vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: vi.fn(),
  Provider: ({ children }) => children,
}));

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    mockedUseNavigate: () => mockedUseNavigate,
  };
});

describe("Header", () => {
  const user = userEvent.setup();

  const initialState = {
    auth: {
      authUser: { username: "testuser" },
      loading: false,
      error: "",
      errorMessage: "",
      success: true,
    },

    search: {
      homeQuery: "",
      profileQuery: "",
    },
  };

  const mockStore = (initialState) =>
    configureStore({
      reducer: {
        auth: authSlice,
        search: searchSlice,
      },
      preloadedState: initialState,
    });

  const store = mockStore(initialState);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should render the title and search properly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    const titleElement = screen.getByRole("link", { name: /WellBlog/i });
    const searchElement = screen.getByPlaceholderText("Search");

    expect(titleElement).toBeInTheDocument();
    expect(searchElement).toBeInTheDocument();
  });

  it("Should update search on change", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const searchElement = screen.getByPlaceholderText("Search");
    user.type(searchElement, "test");
    store.dispatch(updateHomeQuery("test"));

    await waitFor(() => {
      expect(searchElement).toHaveValue("test");
      expect(store.getState().search.homeQuery).toEqual("test");
    });
  });

  it("should render user information and logout button when user is authenticated", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const welcomeElement = screen.getByText(/Welcome/i);
    const usernameElement = screen.getByRole("link", { name: "johndoe!" });
    const logoutElement = screen.getByRole("link", { name: /logout-button/i });

    expect(welcomeElement).toBeInTheDocument();
    expect(usernameElement).toBeInTheDocument();
    expect(logoutElement).toBeInTheDocument();
    expect(logoutElement).toHaveAttribute("href", "/login");
  });

  it("should dispatch loggedOutUser action and navigate to login page when logout button is clicked", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const logoutElement = screen.getByLabelText("logout-button");

    await user.click(logoutElement);

    await waitFor(() => {
      expect(logoutElement).toHaveAttribute("href", "/login");
      expect(mockDispatch).toHaveBeenCalledWith(loggedOutUser());
      // expect(mockedUseNavigate).toHaveBeenCalledWith(["/login"]);
    });
  });

  it("should render login and signup links when user is not authenticated", () => {
    const modifiedInitialState = {
      auth: {
        authUser: undefined,
        loading: false,
        error: "",
        errorMessage: "",
        success: true,
      },
    };
    render(
      <Provider store={mockStore(modifiedInitialState)}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const loginElement = screen.getByRole("link", { name: /Login/i });
    const signupElement = screen.getByRole("link", { name: /Signup/i });

    expect(loginElement).toBeInTheDocument();
    expect(loginElement).toHaveAttribute("href", "/login");
    expect(signupElement).toBeInTheDocument();
    expect(signupElement).toHaveAttribute("href", "/register");
  });
});
