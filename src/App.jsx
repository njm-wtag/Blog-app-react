import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.scss";
import Profile from "./Pages/Profile";
import Header from "./components/Header/Header";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Header />}>
        <Route index path="/" element={<Home />} />
        <Route path="/me" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
