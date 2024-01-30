import { Field, Form } from "react-final-form";
import "./EditProfileForm.scss";
import { useDispatch, useSelector } from "react-redux";
import { updatedAuthUser } from "../../rtk/features/auth/authSlice";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { convertToBase64 } from "../../utils/base64Image";

const EditProfileForm = ({ setIsEditProfileFormOpen }) => {
  const { authUser, success } = useSelector((state) => state.auth);
  const [imagePreview, setImagePreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const validate = (values) => {
    const errors = {};
    if (!values.firstname) {
      errors.firstname = "Required";
    }

    return errors;
  };

  const onSubmit = (userInfo) => {
    dispatch(updatedAuthUser(userInfo));
    setIsEditProfileFormOpen(false);
  };

  useEffect(() => {
    setImagePreview(selectedImage !== null || Boolean(authUser.profileImage));
  }, [success === true, selectedImage, authUser.profileImage]);

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={authUser}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="firstname">
            {({ input, meta }) => (
              <div className="form-container__field">
                <label>First Name</label>
                <input {...input} type="text" placeholder="First name" />
                {meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="lastname">
            {({ input, meta }) => (
              <div className="form-container__field">
                <label>Last Name</label>
                <input {...input} type="text" placeholder="Last name" />
                {meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="username">
            {({ input, meta }) => (
              <div className="form-container__field">
                <label>Userame</label>
                <input {...input} type="text" placeholder="Username" readOnly />
                {meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="subtitle">
            {({ input, meta }) => (
              <div className="form-container__field">
                <label>Subtitle</label>
                <input {...input} type="text" placeholder="Subtitle" />
                {meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="about">
            {({ input, meta }) => (
              <div className="form-container__field">
                <label>About</label>
                <textarea {...input} type="text" placeholder="About" />
                {meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="profileImage">
            {({ input, meta }) => (
              <div className="form-container__field custom-file-input">
                <label>Profile Image</label>
                <input
                  type="file"
                  onChange={async (e) => {
                    const newSelectedImage = await convertToBase64(
                      e.target.files[0]
                    );
                    setSelectedImage(newSelectedImage);
                    input.onChange(newSelectedImage);
                  }}
                />
                {
                  <img
                    className="author-about__details__image"
                    src={selectedImage ? selectedImage : authUser.profileImage}
                  />
                }
                {meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div className="form__buttons">
            <Button type={"submit"} className="submit-button">
              Submit
            </Button>
            <Button
              type={"button"}
              onclickHandler={() => setIsEditProfileFormOpen(false)}
              className="cancel-button"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    />
  );
};

export default EditProfileForm;

EditProfileForm.propTypes = {
  setIsAddBlogFormOpen: PropTypes.func,
};