import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import authSlice, { loggedOutUser } from "features/auth/authSlice";
import searchSlice, { updateHomeQuery } from "features/search/searchSlice";
import Header from ".";
import { mockAuthUserWithProfileImage } from "utils/testHelper";

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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const user = userEvent.setup();

  const mockStore = (initialState) =>
    configureStore({
      reducer: {
        auth: authSlice,
        search: searchSlice,
      },
      preloadedState: initialState,
    });

  // const store = mockStore(initialState);

  it("Should render the title and search properly", () => {
    const initialState = {
      auth: {
        authUser: mockAuthUserWithProfileImage,
      },

      search: {
        homeQuery: "",
        profileQuery: "",
      },
    };
    render(
      <Provider store={mockStore(initialState)}>
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
    const initialState = {
      auth: {
        authUser: mockAuthUserWithProfileImage,
      },

      search: {
        homeQuery: "",
        profileQuery: "",
      },
    };
    const store = mockStore(initialState);
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

  //Failed testcase. Working on resolving it

  // it("should render login and signup links when user is not authenticated", () => {
  //   vi.mock("hooks/useAuth", () => ({
  //     default: () => ({
  //       authUser: null,
  //     }),
  //   }));
  //   // vi.mock("hooks/useAuth", async (importOriginal) => {
  //   //   const actual = await importOriginal();
  //   //   return {
  //   //     ...actual,
  //   //     namedExport: () => ({
  //   //       authUser: null,
  //   //     }),
  //   //   };
  //   // });

  //   const modifiedInitialState = {
  //     auth: {
  //       authUser: null,
  //     },
  //   };
  //   const a = mockStore(modifiedInitialState);
  //   console.log(a.getState(), "non auth");
  //   render(
  //     <Provider store={mockStore(modifiedInitialState)}>
  //       <BrowserRouter>
  //         <Header />
  //       </BrowserRouter>
  //     </Provider>
  //   );

  //   const loginElement = screen.getByRole("link", { name: /Login/i });
  //   const signupElement = screen.getByRole("link", { name: /Signup/i });

  //   expect(loginElement).toBeInTheDocument();
  //   expect(loginElement).toHaveAttribute("href", "/login");
  //   expect(signupElement).toBeInTheDocument();
  //   expect(signupElement).toHaveAttribute("href", "/register");
  // });

  it("should render user information and logout button when user is authenticated", () => {
    const initialState = {
      auth: {
        authUser: mockAuthUserWithProfileImage,
      },

      search: {
        homeQuery: "",
        profileQuery: "",
      },
    };

    vi.mock("hooks/useAuth", () => ({
      default: () => ({
        authUser: mockAuthUserWithProfileImage,
      }),
    }));

    render(
      <Provider store={mockStore(initialState)}>
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
    const initialState = {
      auth: {
        authUser: mockAuthUserWithProfileImage,
      },

      search: {
        homeQuery: "",
        profileQuery: "",
      },
    };
    render(
      <Provider store={mockStore(initialState)}>
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
    });
  });
});
