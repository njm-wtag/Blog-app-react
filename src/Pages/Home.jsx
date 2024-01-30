import { useSelector } from "react-redux";
import HomeBanner from "../components/HomeBanner/HomeBanner";
import BlogList from "../components/BlogList/BlogList";

const Home = () => {
  const { authUser } = useSelector((state) => state.auth);
  const { blogs } = useSelector((state) => state.blogs);
  const blogsByOtherAuthor = blogs.filter(
    ({ author }) => author.id !== authUser?.id
  );
  const randomBlog =
    blogsByOtherAuthor[Math.floor(Math.random() * blogsByOtherAuthor.length)];
  return (
    <div>
      <HomeBanner blog={randomBlog} authUser={authUser} />
      <BlogList blogs={blogsByOtherAuthor} />
    </div>
  );
};

export default Home;
