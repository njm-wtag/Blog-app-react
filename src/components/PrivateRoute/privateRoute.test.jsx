import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import PrivateRoute from ".";
import useLocalStorageAuth from "hooks/useLocalStorageAuth";
import Login from "pages/Login";
import Profile from "pages/Profile";
import useAuth from "hooks/useAuth";

vi.mock("hooks/useLocalStorageAuth");
vi.mock("hooks/useAuth");

describe("PrivateRoute Component", () => {
  it("navigates to login page when the user is not logged in", () => {
    useLocalStorageAuth.mockReturnValue(false);

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
    const loginElement = screen.getByText(/Login/i);
    console.log(loginElement);
    // expect(loginElement).toBeInTheDocument();
  });

  // it("navigates to private route when the user is logged in", () => {
  //   useLocalStorageAuth.mockReturnValue(true);
  //   const mockAuthUser = {
  //     username: "John doe",
  //   };

  //   useAuth.mockReturnValue({ authUser: mockAuthUser });

  //   render(
  //     <BrowserRouter>
  //       <Routes>
  //         <Route element={<PrivateRoute />}>
  //           <Route path="/me" element={<Profile />} />
  //         </Route>
  //       </Routes>
  //     </BrowserRouter>
  //   );
  //   // console.log(container.firstChild);
  //   // expect(container.firstChild).toMatchSnapshot();
  //   const profileElement = screen.queryByText(mockAuthUser.username);
  //   console.log(profileElement);
  //   // expect(profileElement).toBeInTheDocument();
  // });
});
