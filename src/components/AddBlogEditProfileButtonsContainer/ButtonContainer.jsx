import PropTypes from "prop-types";
import "./ButtonContainer.scss";
import AddIcon from "../icons/AddIcon";
import EditIcon from "../icons/EditIcon";
import Button from "../Button/Button";

const ButtonContainer = ({
  setIsAddBlogFormOpen,
  setIsEditProfileFormOpen,
}) => {
  return (
    <div className="button-container">
      <Button
        className="button-container_add-blog"
        onclickHandler={() =>
          setIsAddBlogFormOpen((isAddBlogFormOpen) => !isAddBlogFormOpen)
        }
      >
        <AddIcon />
      </Button>

      <Button
        className="button-container_edit-profile"
        onclickHandler={() =>
          setIsEditProfileFormOpen(
            (isEditProfileFormOpen) => !isEditProfileFormOpen
          )
        }
      >
        <EditIcon />
      </Button>
    </div>
  );
};

ButtonContainer.propTypes = {
  setIsAddBlogFormOpen: PropTypes.func,
};

export default ButtonContainer;
