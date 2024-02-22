import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import useAuth from "hooks/useAuth";
import useBlogs from "hooks/useBlogs";
import useFilter from "hooks/useFilter";
import useSearch from "hooks/useSearch";
import AuthorDetails from "components/AuthorDetails";
import BlogList from "components/BlogList";
import EditProfileForm from "components/EditProfileForm";
import BlogForm from "components/BlogForm";
import ButtonContainer from "components/ButtonContainer";
import Layout from "components/Layout";
import { postBlog } from "features/blogs/blogsSlice";
import {
  tagRemovedInProfile,
  tagSelectedInProfile,
} from "features/filter/filterSlice";

const Profile = () => {
  const [isEditProfileFormOpen, setIsEditProfileFormOpen] = useState(false);
  const [isAddBlogFormOpen, setIsAddBlogFormOpen] = useState(false);
  const { authUser } = useAuth();
  const blogs = useBlogs();
  const { profileQuery } = useSearch();

  const { filteredTagsInProfile } = useFilter();
  const dispatch = useDispatch();

  const blogByAuthor = blogs?.filter((blog) => blog.authorId === authUser.id);

  const handleSelect = (tag) => {
    const isSelected = filteredTagsInProfile.includes(tag);
    if (isSelected) {
      dispatch(tagRemovedInProfile(tag));
    } else {
      dispatch(tagSelectedInProfile(tag));
    }
  };

  const toggleSelected = (tag) => filteredTagsInProfile.includes(tag);

  const onSubmit = (blog) => {
    blog.id = uuidv4();
    blog.authorId = authUser.id;
    blog.createdAt = new Date().toISOString();
    dispatch(postBlog(blog));
    setIsAddBlogFormOpen && setIsAddBlogFormOpen(false);
  };

  return (
    <Layout className="profile-page">
      <ButtonContainer
        setIsAddBlogFormOpen={setIsAddBlogFormOpen}
        setIsEditProfileFormOpen={setIsEditProfileFormOpen}
      />

      {authUser && <AuthorDetails authUser={authUser} />}
      {isEditProfileFormOpen && (
        <EditProfileForm setIsEditProfileFormOpen={setIsEditProfileFormOpen} />
      )}
      {isAddBlogFormOpen && (
        <BlogForm
          setIsAddBlogFormOpen={setIsAddBlogFormOpen}
          onSubmit={onSubmit}
        />
      )}
      <h3>My published posts</h3>
      {blogByAuthor.length ? (
        <BlogList
          blogs={blogByAuthor}
          query={profileQuery}
          handleSelect={handleSelect}
          toggleSelected={toggleSelected}
          filteredTags={filteredTagsInProfile}
        />
      ) : (
        "No blog published yet"
      )}
    </Layout>
  );
};

export default Profile;
