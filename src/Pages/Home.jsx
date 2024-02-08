import Layout from "components/Layout/Layout";
import HomeBanner from "../components/HomeBanner/HomeBanner";
import BlogList from "components/BlogList/BlogList";
import useBlogs from "hooks/useBlogs";
import useAuth from "hooks/useAuth";

const Home = () => {
  const { authUser } = useAuth();
  const blogs = useBlogs();
  const blogsByOtherAuthor = blogs?.filter(
    (blog) => blog.authorId != authUser?.id
  );
  let randomBlog;

  if (blogsByOtherAuthor) {
    const numberOfBlogs = blogsByOtherAuthor.length;
    const randomIndex = Math.floor(Math.random() * numberOfBlogs);
    randomBlog = blogsByOtherAuthor[randomIndex];
  }

  return (
    <Layout>
      <HomeBanner blog={randomBlog} authUser={authUser} />
      <BlogList blogs={blogsByOtherAuthor} />
    </Layout>
  );
};

export default Home;
