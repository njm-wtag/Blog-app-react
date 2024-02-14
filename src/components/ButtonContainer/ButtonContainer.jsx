import PropTypes from "prop-types";
import "./ButtonContainer.scss";
import AddIcon from "components/icons/AddIcon";
import EditIcon from "components/icons/EditIcon";
import Button from "components/Button/Button";

const ButtonContainer = ({ setIsAddBlogFormOpen }) => {
  return (
    <div className="button-container">
      <Button
        className="button-container_add-blog"
        onClickHandler={() =>
          setIsAddBlogFormOpen((isAddBlogFormOpen) => !isAddBlogFormOpen)
        }
      >
        <AddIcon />
      </Button>

      <Button className="button-container_edit-profile">
        <EditIcon />
      </Button>
    </div>
  );
};

ButtonContainer.propTypes = {
  setIsAddBlogFormOpen: PropTypes.func.isRequired,
};

export default ButtonContainer;
