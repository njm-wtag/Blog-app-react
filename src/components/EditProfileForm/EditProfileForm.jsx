import { Field, Form } from "react-final-form";
import "./EditProfileForm.scss";
import { useEffect } from "react";

const EditProfileForm = () => {
  const validate = (values) => {
    const errors = {};
    if (!values.firstname) {
      errors.firstname = "Required";
    }

    return errors;
  };

  // const saveToLocalStorage = (values) => {
  //   const formData = new FormData();
  //   formData.append("image", values.image);

  //   console.log(formData);

  //   console.log(values);

  //   // localStorage.setItem("authUser", JSON.stringify(values));
  // };

  const loadFromLocalStorage = () => {
    const storedValues = localStorage.getItem("authUser");
    return storedValues ? JSON.parse(storedValues) : {};
  };
  const initialValues = loadFromLocalStorage();

  const onSubmit = (values) => {
    localStorage.setItem("authUser", JSON.stringify(values));
    console.log(values);
    // const reader = new FileReader();
    // reader.readAsDataURL(values.image);
    // console.log(reader);
    // const formData = new FormData();
    // formData.append("name", values.name);
    // if (values.image.length > 0) formData.append("image", values.image);
    // formData.append("name", values.name);
    // console.log(formData);
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
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
                <input {...input} type="text" placeholder="Username" />
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
          <Field name="image">
            {({ input, meta }) => (
              <div className="form-container__field">
                <label>Profile Image</label>
                <input
                  type="file"
                  placeholder="Profile Image"
                  // onChange={() => console.log(form.getState().values)}
                  onChange={(e) => input.onChange(e.target.files[0])}
                />
                {meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>

          {/* <Field name="profileImage">
            {({ input: { ...input }, }) => (
              <input
                {...input}
                type="file"
                onChange={({ target }) => onChange(target.files)}
              />
            )}
          </Field> */}
          <div>
            <button
              type="submit"
              // disabled={submitting || pristine}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    />
  );
};

export default EditProfileForm;
