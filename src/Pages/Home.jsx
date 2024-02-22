import { useDispatch } from "react-redux";
import useAuth from "hooks/useAuth";
import useBlogs from "hooks/useBlogs";
import useFilter from "hooks/useFilter";
import useSearch from "hooks/useSearch";
import BlogList from "components/BlogList";
import HomeBanner from "components/HomeBanner";
import Layout from "components/Layout";
import {
  tagRemovedInHome,
  tagSelectedInHome,
} from "features/filter/filterSlice";

const Home = () => {
  const { authUser } = useAuth();
  const blogs = useBlogs();
  const { homeQuery } = useSearch();
  const { filteredTagsInHome } = useFilter();
  const dispatch = useDispatch();
  let randomBlog;

  const blogsByOtherAuthor = blogs?.filter(
    (blog) => blog.authorId != authUser?.id
  );

  if (blogsByOtherAuthor) {
    const numberOfBlogs = blogsByOtherAuthor.length;
    const randomIndex = Math.floor(Math.random() * numberOfBlogs);
    randomBlog = blogsByOtherAuthor[randomIndex];
  }

  const handleSelect = (tag) => {
    const isSelected = filteredTagsInHome.includes(tag);
    if (isSelected) {
      dispatch(tagRemovedInHome(tag));
    } else {
      dispatch(tagSelectedInHome(tag));
    }
  };

  const toggleSelected = (tag) => filteredTagsInHome.includes(tag);

  return (
    <Layout>
      <HomeBanner blog={randomBlog} />
      <BlogList
        blogs={blogsByOtherAuthor}
        query={homeQuery}
        handleSelect={handleSelect}
        toggleSelected={toggleSelected}
        filteredTags={filteredTagsInHome}
      />
    </Layout>
  );
};

export default Home;
