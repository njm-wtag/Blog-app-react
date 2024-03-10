import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Home from "./Home";
import { describe, expect, it, vi } from "vitest";
import authSlice from "features/auth/authSlice";
import searchSlice from "features/search/searchSlice";
import { BrowserRouter } from "react-router-dom";
import useRegister from "hooks/useRegister";

vi.mock("hooks/useAuth", () => ({
  default: () => ({
    authUser: {
      username: "testuser",
    },
  }),
}));
vi.mock("hooks/useRegister");
vi.mock("hooks/useBlogs", () => ({
  default: () => [
    { id: "1", title: "Blog 1", authorId: "authorId" },
    { id: "2", title: "Blog 2", authorId: "authorId" },
    { id: "3", title: "Blog 3", authorId: "non-author user" },
  ],
}));
vi.mock("hooks/useFilter", () => ({
  default: () => ({
    filteredTagsInHome: {},
  }),
}));
vi.mock("hooks/useSearch", () => ({
  default: () => ({
    homeQuery: {},
  }),
}));
vi.mock("hooks/usePaginate", () => ({
  default: () => ({
    blogsPerPageInHome: 3,
    currentHomePage: 1,
  }),
}));

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

useRegister.mockReturnValue({
  users: [
    {
      id: "authorId",
      username: "testuser",
    },
    {
      id: "non-author user",
      username: "non-author username",
    },
  ],
});

describe("Home", () => {
  it("should render properly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
  });
});
