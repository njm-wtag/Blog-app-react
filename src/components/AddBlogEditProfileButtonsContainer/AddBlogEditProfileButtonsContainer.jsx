import PropTypes from "prop-types";
import "./AddBlogEditProfileButtonsContainer.scss";

const AddBlogEditProfileButtonsContainer = ({ setIsAddBlogFormOpen }) => {
  return (
    <div className="button-container">
      <div
        className="button-container_add-blog"
        onClick={() =>
          setIsAddBlogFormOpen((isAddBlogFormOpen) => !isAddBlogFormOpen)
        }
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8.75 4.75C8.75 4.33579 8.41421 4 8 4C7.58579 4 7.25 4.33579 7.25 4.75V7.25H4.75C4.33579 7.25 4 7.58579 4 8C4 8.41421 4.33579 8.75 4.75 8.75H7.25V11.25C7.25 11.6642 7.58579 12 8 12C8.41421 12 8.75 11.6642 8.75 11.25V8.75H11.25C11.6642 8.75 12 8.41421 12 8C12 7.58579 11.6642 7.25 11.25 7.25H8.75V4.75Z"
            fill="#0F172A"
          />
        </svg>
      </div>

      <div className="button-container_edit-profile">
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.43306 12.9168L4.69485 9.76231C4.89603 9.25935 5.19728 8.80249 5.58033 8.41945L12.4995 1.50071C13.3279 0.672287 14.6711 0.672289 15.4995 1.50072C16.3279 2.32914 16.3279 3.67229 15.4995 4.50072L8.58033 11.4194C8.19728 11.8025 7.74042 12.1037 7.23746 12.3049L4.08299 13.5667C3.67484 13.73 3.2698 13.3249 3.43306 12.9168Z"
            fill="#0F172A"
          />
          <path
            d="M1.5 4.75C1.5 4.05964 2.05964 3.5 2.75 3.5H8C8.41421 3.5 8.75 3.16421 8.75 2.75C8.75 2.33579 8.41421 2 8 2H2.75C1.23122 2 0 3.23122 0 4.75V14.25C0 15.7688 1.23122 17 2.75 17H12.25C13.7688 17 15 15.7688 15 14.25V9C15 8.58579 14.6642 8.25 14.25 8.25C13.8358 8.25 13.5 8.58579 13.5 9V14.25C13.5 14.9404 12.9404 15.5 12.25 15.5H2.75C2.05964 15.5 1.5 14.9404 1.5 14.25V4.75Z"
            fill="#0F172A"
          />
        </svg>
      </div>
    </div>
  );
};

AddBlogEditProfileButtonsContainer.propTypes = {
  setIsAddBlogFormOpen: PropTypes.func,
};

export default AddBlogEditProfileButtonsContainer;
