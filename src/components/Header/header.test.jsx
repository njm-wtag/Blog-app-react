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

  it("Should render the Header component properly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByRole("link", { name: /WellBlog/i });
    const searchElement = screen.getByPlaceholderText("Search");

    expect(linkElement).toBeInTheDocument();
    expect(searchElement).toBeInTheDocument();
  });
});
