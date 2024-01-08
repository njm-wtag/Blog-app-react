import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />;
        <Route path="/register" element={<Register />} />;
        <Route path="/home" element={<Home />} />;
      </Routes>
    </BrowserRouter>
  );
}

export default App;
