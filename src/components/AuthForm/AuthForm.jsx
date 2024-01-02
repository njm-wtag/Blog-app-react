import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";
import { FORM_ERROR } from "final-form";
import "../../styles/components/_login-form.scss";

const AuthForm = ({ register }) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const onSubmit = async (values) => {
    await sleep(300);

    if (values.username === "") {
      return { username: "Unknown username" };
    }
    if (values.password === "") {
      return { [FORM_ERROR]: "Login Failed" };
    }
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = [...existingUsers, values];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    window.alert("LOGIN SUCCESS!");
  };

  return (
    <div className="form-container">
      <Form
        onSubmit={onSubmit}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        render={({ submitError, handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            {register && (
              <>
                <Field name="first_name">
                  {({ input, meta }) => (
                    <div>
                      <input {...input} type="text" placeholder="First name" />
                      {(meta.error || meta.submitError) && meta.touched && (
                        <span>{meta.error || meta.submitError}</span>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="last_name">
                  {({ input, meta }) => (
                    <div>
                      <input {...input} type="text" placeholder="Last name" />
                      {(meta.error || meta.submitError) && meta.touched && (
                        <span>{meta.error || meta.submitError}</span>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="email">
                  {({ input, meta }) => (
                    <div>
                      <input {...input} type="email" placeholder="Email" />
                      {(meta.error || meta.submitError) && meta.touched && (
                        <span>{meta.error || meta.submitError}</span>
                      )}
                    </div>
                  )}
                </Field>
              </>
            )}
            <Field name="username">
              {({ input, meta }) => (
                <div>
                  <input {...input} type="text" placeholder="Username" />
                  {(meta.error || meta.submitError) && meta.touched && (
                    <span>{meta.error || meta.submitError}</span>
                  )}
                </div>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <div>
                  <input {...input} type="password" placeholder="Password" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            {submitError && <div className="error">{submitError}</div>}
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                Log In
              </button>
              {/* <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button> */}
            </div>
          </form>
        )}
      />
    </div>
  );
};

AuthForm.defaultProps = {
  register: false,
};

AuthForm.propTypes = {
  register: PropTypes.bool,
};

export default AuthForm;
