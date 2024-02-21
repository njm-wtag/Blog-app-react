import useBlogs from "hooks/useBlogs";
import useAuth from "hooks/useAuth";
import BlogList from "components/BlogList";
import HomeBanner from "components/HomeBanner";
import Layout from "components/Layout";
import useSearch from "hooks/useSearch";

const Home = () => {
  const { authUser } = useAuth();
  const blogs = useBlogs();
  const { homeQUery } = useSearch();
  let randomBlog;

  const blogsByOtherAuthor = blogs?.filter(
    (blog) => blog.authorId != authUser?.id
  );

  if (blogsByOtherAuthor) {
    const numberOfBlogs = blogsByOtherAuthor.length;
    const randomIndex = Math.floor(Math.random() * numberOfBlogs);
    randomBlog = blogsByOtherAuthor[randomIndex];
  }

  return (
    <Layout>
      <HomeBanner blog={randomBlog} />
      <BlogList blogs={blogsByOtherAuthor} query={homeQUery} />
    </Layout>
  );
};

export default Home;
