import { useSelector } from "react-redux";
import Layout from "components/Layout/Layout";
import HomeBanner from "../components/HomeBanner/HomeBanner";
import BlogList from "components/BlogList/BlogList";
import useBlogs from "hooks/useBlogs";

const Home = () => {
  const { authUser } = useSelector((state) => state.auth);
  const { blogs } = useBlogs();
  const blogsByOtherAuthor = blogs.filter(
    ({ author }) => author.id !== authUser?.id
  );
  const randomBlog =
    blogsByOtherAuthor[Math.floor(Math.random() * blogsByOtherAuthor.length)];

  return (
    <Layout>
      <HomeBanner blog={randomBlog} authUser={authUser} />
      <BlogList blogs={blogsByOtherAuthor} />
    </Layout>
  );
};

export default Home;
