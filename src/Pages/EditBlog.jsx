import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "../rtk/features/blogs/blogsSlice";
import BlogForm from "../components/BlogForm/BlogForm";
const EditBlog = () => {
  const { blogId } = useParams();
  const { blogs } = useSelector((state) => state.blogs);
  const blogDetails = blogs.find((blog) => blog.id == blogId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (blog) => {
    dispatch(updateBlog(blog));
    navigate(`/${blogDetails.author.username}`);
  };

  return (
    <div>
      <BlogForm blogDetails={blogDetails} onSubmit={onSubmit} />
    </div>
  );
};

export default EditBlog;
