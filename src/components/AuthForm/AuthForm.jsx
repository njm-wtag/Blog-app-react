import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";
import { Link } from "react-router-dom";
import "./AuthForm.scss";
const AuthForm = ({ register, handleSubmit }) => {
  return (
    <div className="form-container">
      <Form
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors = {};
          if (register) {
            if (!values.firstname) {
              errors.firstname = "First name is required";
            }
            if (!values.lastname) {
              errors.lastname = "Last name is required";
            }
            if (!values.email) {
              errors.email = "Email is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
          }

          if (!values.username) {
            errors.username = "User name is required";
          }

          if (!values.password) {
            errors.password = "Password is required";
          } else if (values.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
          }
          return errors;
        }}
        render={({ submitError, handleSubmit }) => (
          <form className="form-container__form" onSubmit={handleSubmit}>
            {register && (
              <>
                <Field name="firstname">
                  {({ input, meta }) => (
                    <div className="form-container__field">
                      <input {...input} type="text" placeholder="First name" />
                      {meta.error && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="lastname">
                  {({ input, meta }) => (
                    <div className="form-container__field">
                      <input {...input} type="text" placeholder="Last name" />
                      {meta.error && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="email">
                  {({ input, meta }) => (
                    <div className="form-container__field">
                      <input {...input} type="email" placeholder="Email" />
                      {meta.error && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </>
            )}
            <Field name="username">
              {({ input, meta }) => (
                <div className="form-container__field">
                  <input {...input} type="text" placeholder="Username" />
                  {meta.error && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <div className="form-container__field">
                  <input {...input} type="password" placeholder="Password" />
                  {meta.error && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            {submitError && (
              <div className="form-container__error">{submitError}</div>
            )}
            <div className="form-container__buttons">
              <button type="submit" className="form-container__buttons__button">
                {register ? "Register" : "Log In"}
              </button>
            </div>
            <div className="form-container__link-button">
              {register ? (
                <Link to="/login">Already have an account? Login</Link>
              ) : (
                <Link to="/register">Do not have an account? Register</Link>
              )}
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
  handleSubmit: PropTypes.func.isRequired,
};

export default AuthForm;
