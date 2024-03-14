import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import authSlice from "features/auth/authSlice";
import EditProfileForm from ".";

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

  //Resolving error

  it("should upload profile image correcly", async () => {
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
    const profileImageElement = screen.getByLabelText("Profile Image");

    const blob = new Blob(["profile"], { type: "image/png" });
    const newFile = new File([blob], "profile.png", {
      type: "image/png",
    });

    await user.upload(profileImageElement, {
      newFile,
    });

    await waitFor(() => expect(profileImageElement.files).toHaveLength(1));
  });

  it("submits form with updated values", async () => {
    const handleImageChange = vi.fn();
    // const onSubmit = vi.fn();
    const updatedValues = {
      firstname: "Jane",
      lastname: "Smith",
      subtitle: "Web Developer",
      about: "Consectetur adipiscing elit",
      profileImage: "updated-profile.jpg",
    };

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

    const profileImageElement = screen.getByLabelText("Profile Image");

    const blob = new Blob(["image data"], { type: "image/jpeg" });
    const file = new File([blob], "updated-profile.jpg", {
      type: "image/jpeg",
    });

    await user.upload(profileImageElement, file);

    const submitButton = screen.getByRole("button", { name: "Submit" });
    user.click(submitButton);

    expect(profileImageElement.files).toHaveLength(1);
    expect(firstNameElement.value).toBe(updatedValues.firstname);
    expect(lastNameElement.value).toBe(updatedValues.lastname);
    expect(subtitleElement.value).toBe(updatedValues.subtitle);
    expect(aboutElement.value).toBe(updatedValues.about);
    // expect(onSubmit).toHaveBeenCalledOnce();
  });

  it("should cancel form editing", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EditProfileForm
            setIsEditProfileFormOpen={mockSetIsEditProfileFormOpen}
          />
        </BrowserRouter>
      </Provider>
    );

    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    user.click(cancelButton);

    await waitFor(() => {
      expect(mockSetIsEditProfileFormOpen).toHaveBeenCalledWith(false);
    });
  });
});
