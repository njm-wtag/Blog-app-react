import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import EditProfileForm from ".";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import authSlice from "features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { userEvent } from "@testing-library/user-event";

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
vi.mock("hooks/useRegister");

const mockDispatch = vi.fn();
vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  Provider: ({ children }) => children,
}));

const mockSetIsEditProfileFormOpen = vi.fn();

const initialState = {};

const mockStore = (initialState) =>
  configureStore({
    reducer: {
      auth: authSlice,
    },
    preloadedState: initialState,
  });

const store = mockStore(initialState);
const user = userEvent.setup();
const onSubmit = vi.fn();

describe("EditProfileForm component", () => {
  // it("should render form fields with initial values", () => {
  //   const authUser = {
  //     firstname: "John",
  //     lastname: "Doe",
  //     username: "johndoe",
  //     subtitle: "Software Engineer",
  //     about: "Lorem ipsum dolor sit amet",
  //     profileImage: "profile.jpg",
  //   };
  //   render(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <EditProfileForm
  //           setIsEditProfileFormOpen={mockSetIsEditProfileFormOpen}
  //         />
  //       </BrowserRouter>
  //     </Provider>
  //   );

  //   const firstNameElement = screen.getByPlaceholderText(/First name/i);
  //   expect(firstNameElement).toHaveValue(authUser.firstname);

  //   const lastNameElement = screen.getByPlaceholderText(/Last name/i);
  //   expect(lastNameElement).toHaveValue(authUser.lastname);

  //   const userameElement = screen.getByPlaceholderText(/Username/i);
  //   expect(userameElement).toHaveValue(authUser.username);

  //   const subtitleElement = screen.getByPlaceholderText(/Subtitle/i);
  //   expect(subtitleElement).toHaveValue(authUser.subtitle);

  //   const aboutElement = screen.getByPlaceholderText(/About/i);
  //   expect(aboutElement).toHaveValue(authUser.about);

  //   const profileImageElement = screen.getByAltText("Author Image");

  //   expect(profileImageElement).toHaveAttribute("src", authUser.profileImage);
  // });

  it("should upload profile image correcly", async () => {
    const profileImageElement = screen.getByLabelText("Profile Image");
    const newFile = new File(["profile"], "profile.jpg", {
      type: "image/png",
    });
    const handleImageChange = vi.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditProfileForm
            setIsEditProfileFormOpen={mockSetIsEditProfileFormOpen}
            onChange={handleImageChange}
          />
        </BrowserRouter>
      </Provider>
    );

    await user.upload(profileImageElement, newFile);
    // console.log(profileImageElement.files);
    // console.log(profileImageElement.files.length);
    // expect(profileImageElement.files[0]).toEqual(newFile);
    expect(handleImageChange).toHaveBeenCalled();

    // const str = JSON.stringify(mockImage);
    // const blob = new Blob([str]);
    // const file = new File([blob], "values.json", {
    //   type: "application/JSON",
    // });
    // File.prototype.text = vi.fn().mockResolvedValueOnce(str);
    // const input = screen.getByLabelText("Profile Image");
    // const uploaded = await user.upload(input, file);
    // console.log(uploaded);
    // await waitFor(() => expect(input.toBeTruthy()));
  });

  // it("submits form with updated values", async () => {
  //   const updatedValues = {
  //     firstname: "Jane",
  //     lastname: "Smith",
  //     subtitle: "Web Developer",
  //     about: "Consectetur adipiscing elit",
  //     profileImage: "updated-profile.jpg",
  //   };

  //   render(
  // <Provider store={store}>
  //<BrowserRouter>
  //     <EditProfileForm
  //       setIsEditProfileFormOpen={mockSetIsEditProfileFormOpen}
  //     />
  //   );
  // </BrowserRouter>
  // </Provider>

  //   const firstNameElement = screen.getByPlaceholderText(/First name/i);
  //   await user.clear(firstNameElement);
  //   await user.type(firstNameElement, updatedValues.firstname);

  //   const lastNameElement = screen.getByPlaceholderText(/Last name/i);
  //   await user.clear(lastNameElement);
  //   await user.type(lastNameElement, updatedValues.lastname);

  //   const subtitleElement = screen.getByPlaceholderText(/Subtitle/i);
  //   await user.clear(subtitleElement);
  //   await user.type(subtitleElement, updatedValues.subtitle);

  //   const aboutElement = screen.getByPlaceholderText(/About/i);
  //   await user.clear(aboutElement);
  //   await user.type(aboutElement, updatedValues.about);

  //   // const profileImageElement = screen.getByLabelText("Profile Image");
  //   // console.log(profileImageElement);
  //   // await user.type(profileImageElement, updatedValues.profileImage);

  //   const submitButton = screen.getByRole("button", { name: "Submit" });
  //   user.click(submitButton);

  //   await waitFor(() => {
  //     expect(onSubmit).toHaveBeenCalled();
  //   });
  // });

  // it("should cancel form editing", () => {
  //   render(
  //     // <Provider store={store}>
  //<BrowserRouter>
  //     <EditProfileForm
  //       setIsEditProfileFormOpen={mockSetIsEditProfileFormOpen}
  //     />
  //   );
  // </BrowserRouter>
  // </Provider>
  //   );

  //   const cancelButton = screen.getByRole("button", { name: /Cancel/i });
  //   user.click(cancelButton);

  //   expect(mockSetIsEditProfileFormOpen).toHaveBeenCalledWith(false);
  // });
});