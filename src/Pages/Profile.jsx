import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import AuthorAbout from "../components/AuthorAbout/AuthorAbout";
import BlogList from "../components/BlogList/BlogList";
import AddBlogForm from "../components/AddBlogForm/AddBlogForm";
import ButtonContainer from "../components/AddBlogEditProfileButtonsContainer/ButtonContainer";
import EditProfileForm from "../components/EditProfileForm/EditProfileForm";
import { postBlog } from "../rtk/features/blogs/blogsSlice";
// import postBlog from "../rtk/features/blogs/blogsSlice";
const Profile = () => {
  const [isEditProfileFormOpen, setIsEditProfileFormOpen] = useState(false);
  const [isAddBlogFormOpen, setIsAddBlogFormOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const { authUser } = useSelector((state) => state.auth);
  const { blogs } = useSelector((state) => state.blogs);
  const reversedBlog = [...blogs].reverse();
  const authBlogs = reversedBlog.filter(
    (blog) => blog.author.id === authUser.id
  );
  const dispatch = useDispatch();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };
  const onSubmit = async (blog) => {
    console.log(blog);
    blog.id = Date.now();
    blog.author = authUser;
    blog.createdAt = new Date().toISOString();
    const imagePreview = await convertToBase64(files[0]);
    blog.imagePreview = imagePreview;
    dispatch(postBlog(blog));
    setIsAddBlogFormOpen && setIsAddBlogFormOpen(false);
  };

  return (
    <div className="profile-page">
      <ButtonContainer
        setIsAddBlogFormOpen={setIsAddBlogFormOpen}
        setIsEditProfileFormOpen={setIsEditProfileFormOpen}
      />

      {authUser && <AuthorAbout authUser={authUser} />}
      {isEditProfileFormOpen && <EditProfileForm />}
      {isAddBlogFormOpen && (
        <AddBlogForm
          setIsAddBlogFormOpen={setIsAddBlogFormOpen}
          onSubmit={onSubmit}
          files={files}
          setFiles={setFiles}
        />
      )}
      <h3>My published posts</h3>
      <BlogList blogs={authBlogs} />
    </div>
  );
};

export default Profile;
