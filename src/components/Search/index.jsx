import SearchIcon from "components/icons/SearchIcon";
import {
  updateHomeQuery,
  updateProfileQuery,
} from "features/search/searchSlice";
import useSearch from "hooks/useSearch";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();

  const { homeQuery, profileQuery } = useSearch();
  const location = useLocation();
  const profile = location.pathname === "/me";

  const handleSearch = (event) => {
    if (profile) {
      dispatch(updateProfileQuery(event.target.value));
      return;
    }
    dispatch(updateHomeQuery(event.target.value));
  };
  return (
    <div className="navbar__search">
      <input
        type="search"
        placeholder="Search"
        value={profile ? profileQuery : homeQuery}
        onChange={handleSearch}
      />
      <SearchIcon />
    </div>
  );
};

export default Search;
