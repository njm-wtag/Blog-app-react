import { render, screen } from "@testing-library/react";
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

describe("EditProfileForm component", () => {
  it("should render form fields with initial values", () => {
    const authUser = {
      firstname: "John",
      lastname: "Doe",
      username: "johndoe",
      subtitle: "Software Engineer",
      about: "Lorem ipsum dolor sit amet",
      profileImage: "profile.jpg",
    };
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditProfileForm
            setIsEditProfileFormOpen={mockSetIsEditProfileFormOpen}
          />
        </BrowserRouter>
      </Provider>
    );

    const firstNameElement = screen.getByPlaceholderText(/First name/i);
    expect(firstNameElement).toHaveValue(authUser.firstname);

    const lastNameElement = screen.getByPlaceholderText(/Last name/i);
    expect(lastNameElement).toHaveValue(authUser.lastname);

    const userameElement = screen.getByPlaceholderText(/Username/i);
    expect(userameElement).toHaveValue(authUser.username);

    const subtitleElement = screen.getByPlaceholderText(/Subtitle/i);
    expect(subtitleElement).toHaveValue(authUser.subtitle);

    const aboutElement = screen.getByPlaceholderText(/About/i);
    expect(aboutElement).toHaveValue(authUser.about);

    const profileImageElement = screen.getByAltText("Author Image");

    expect(profileImageElement).toHaveAttribute("src", authUser.profileImage);
  });

  it("submits form with updated values", async () => {
    const updatedValues = {
      firstname: "Jane",
      lastname: "Smith",
      subtitle: "Web Developer",
      about: "Consectetur adipiscing elit",
      profileImage: "updated-profile.jpg",
    };

    const onSubmit = vi.fn();

    render(
      <EditProfileForm
        setIsEditProfileFormOpen={mockSetIsEditProfileFormOpen}
      />
    );

    const firstNameElement = screen.getByPlaceholderText(/First name/i);
    await user.clear(firstNameElement);
    await user.type(firstNameElement, updatedValues.firstname);

    const lastNameElement = screen.getByPlaceholderText(/Last name/i);
    await user.clear(lastNameElement);
    await user.type(lastNameElement, updatedValues.lastname);

    const subtitleElement = screen.getByPlaceholderText(/Subtitle/i);
    await user.clear(subtitleElement);
    await user.type(subtitleElement, updatedValues.subtitle);

    const aboutElement = screen.getByPlaceholderText(/About/i);
    await user.clear(aboutElement);
    await user.type(aboutElement, updatedValues.about);

    // const profileImageElement = screen.getByAltText("Author Image");
    const profileImageElement = screen.getByLabelText("Profile Image");
    const newFile = new File([""], "updated-profile.jpg", {
      type: "image/jpeg",
    });

    user.upload(profileImageElement, newFile);

    expect(profileImageElement.files[0]).toEqual(newFile);
    await user.clear(profileImageElement);
    await user.type(profileImageElement, updatedValues.profileImage);

    const submitButton = screen.getByText("Submit");
    user.click(submitButton);

    // expect(onSubmit).toHaveBeenCalled(updatedValues);
  });
});
