import PropTypes from "prop-types";
import AddIcon from "components/icons/AddIcon";
import Button from "components/Button/Button";
import EditIcon from "components/icons/EditIcon";
import "./buttonContainer.scss";

const ButtonContainer = ({
  setIsAddBlogFormOpen,
  setIsEditProfileFormOpen,
}) => {
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

      <Button
        className="button-container_edit-profile"
        onClickHandler={() =>
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
  setIsAddBlogFormOpen: PropTypes.func.isRequired,
};

export default ButtonContainer;
