import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Layout from ".";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "features/auth/authSlice";
import searchSlice from "features/search/searchSlice";

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

describe("Layout", () => {
  it("should render children properly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <div>Child Component</div>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
    const childrenElement = screen.getByText(/Child Component/i);

    expect(childrenElement).toBeInTheDocument();
  });
});
