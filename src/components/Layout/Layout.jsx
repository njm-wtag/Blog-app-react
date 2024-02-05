import PropTypes from "prop-types";
import Header from "components/Header/Header";
import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <Header />
      <div>{children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
