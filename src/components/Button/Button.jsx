import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ children, className, onClickHandler, type }) => {
  return (
    <button
      type={type}
      className={`${className} custom-button`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: null,
  onClickHandler: null,
  type: null,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClickHandler: PropTypes.func,
  type: PropTypes.string,
};

export default Button;
