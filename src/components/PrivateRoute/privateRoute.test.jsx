import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import PrivateRoute from ".";
import useLocalStorageAuth from "hooks/useLocalStorageAuth";
import Login from "pages/Login";
import Profile from "pages/Profile";
import useAuth from "hooks/useAuth";

vi.mock("hooks/useLocalStorageAuth");
vi.mock("hooks/useAuth");

const mockLogin = () => <div>Login</div>;
const mockProfile = () => <div>Profile </div>;

describe("PrivateRoute Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("navigates to login if not logged in", async () => {
    let testHistory, testLocation;
    const location = useLocation();
    console.log(location.pathname, "login");
    useLocalStorageAuth.mockReturnValue(false);
    vi.mock("react-router-dom", async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        useLocation: () => ({
          pathname: "/login",
        }),
      };
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route
            render={({ history, location }) => {
              testHistory = history;
              testLocation = location;
              return null;
            }}
            element={<PrivateRoute />}
          >
            {/* <Route path="/me" element={<Profile />} /> */}
          </Route>
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    );

    console.log(location.pathname, "from profile");
    await waitFor(() => {
      expect(location.pathname).toEqual("/login");
    });
  });

  it("navigates to private route when the user is logged in", async () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });
    useLocalStorageAuth.mockReturnValue(true);
    const location = useLocation();
    console.log(location.pathname);

    vi.mock("react-router-dom", async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        useLocation: () => ({
          pathname: "/me",
        }),
      };
    });
    const mockAuthUser = {
      username: "John doe",
    };

    useAuth.mockReturnValue({ authUser: mockAuthUser });

    render(
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/me" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
    // console.log(container.firstChild);
    // expect(container.firstChild).toMatchSnapshot();
    // const profileElement = screen.queryByText(mockAuthUser.username);

    await waitFor(() => {
      console.log(location.pathname);
      expect(location.pathname).toEqual("/me");
    });
    // const profileElement = screen.getByText("profile info");
    // console.log(profileElement);
    // expect(profileElement).toBeInTheDocument();
  });
});
