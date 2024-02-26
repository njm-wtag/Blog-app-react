import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";
import Header from ".";
import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "features/search/searchSlice";
import authSlice from "features/auth/authSlice";
import { BrowserRouter } from "react-router-dom";

describe("Header", () => {
  // const user = userEvent.setup();
  const initialState = {
    auth: {
      authUser: { username: "testuser" },
    },
    search: {
      homeQuery: "",
      profileQuery: "",
    },
  };
  const mockStore = () =>
    configureStore({
      reducer: {
        auth: authSlice,
        search: searchSlice,
      },
    });
  const store = mockStore(initialState);

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

  it("should render login and signup links when user is not authenticated", () => {
    render(
      <Provider store={store}>
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

  // it("should render user information and logout button when user is authenticated", () => {
  //   render(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <Header />
  //       </BrowserRouter>
  //     </Provider>
  //   );

  //   const welcomeElement = screen.getByTestId("greet-element");
  //   // const usernameElement = screen.getByRole("link", { name: /testuser/i });

  //   expect(welcomeElement).toBeInTheDocument();
  //   screen.debug();
  //   // expect(usernameElement).toBeInTheDocument();
  // });
});
