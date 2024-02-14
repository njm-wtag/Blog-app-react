import useBlogs from "hooks/useBlogs";
import useAuth from "hooks/useAuth";
import BlogList from "components/BlogList/BlogList";
import HomeBanner from "components/HomeBanner/HomeBanner";
import Layout from "components/Layout/Layout";

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
      <HomeBanner blog={randomBlog} />
      <BlogList blogs={blogsByOtherAuthor} />
    </Layout>
  );
};

export default Home;
