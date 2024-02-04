import PropTypes from "prop-types";
import { Field, Form } from "react-final-form";
import { Link, useLocation } from "react-router-dom";
import authValidation from "utils/authValidation";
import useAuth from "../../hook/useAuth";
import "./AuthForm.scss";

const AuthForm = ({ handleSubmit }) => {
  const { error } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;
  const isRegisterForm = pathname === "/register";
  return (
    <div className="form-container">
      {error && (
        <div
          className={
            isRegisterForm
              ? "form-container__success-message"
              : "form-container__error-message"
          }
        >
          {error}
        </div>
      )}
      <Form
        onSubmit={handleSubmit}
        validate={(values) => authValidation(values, isRegisterForm)}
        render={({ submitError, handleSubmit }) => (
          <form className="form-container__form" onSubmit={handleSubmit}>
            {isRegisterForm && (
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
                {isRegisterForm ? "Register" : "Log In"}
              </button>
            </div>
            <div className="form-container__link-button">
              {isRegisterForm ? (
                <span>
                  {" "}
                  Already have an account? <Link to="/login"> Login</Link>
                </span>
              ) : (
                <span>
                  {" "}
                  Do not have an account? <Link to="/register">Register</Link>
                </span>
              )}
            </div>
          </form>
        )}
      />
    </div>
  );
};

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default AuthForm;
