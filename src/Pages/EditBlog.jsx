import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBlog } from "features/blogs/blogsSlice";
import BlogForm from "components/BlogForm";
import useBlogs from "hooks/useBlogs";
import Layout from "components/Layout";

const EditBlog = () => {
  const { blogId } = useParams();
  const blogs = useBlogs();
  const blogDetails = blogs?.find((blog) => blog.id == blogId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (blog) => {
    dispatch(updateBlog(blog));
    navigate(`/blog/${blogId}`);
  };

  return (
    <Layout>
      <BlogForm blogDetails={blogDetails} onSubmit={onSubmit} />
    </Layout>
  );
};

export default EditBlog;
