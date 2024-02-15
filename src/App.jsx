import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blog from "./Pages/Blog";
import EditBlog from "./Pages/EditBlog";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/me" element={<Profile />} />
          <Route path="/edit/:blogId" element={<EditBlog />} />
        </Route>
        <Route path="/blog/:blogId" element={<Blog />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
