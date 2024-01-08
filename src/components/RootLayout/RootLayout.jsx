import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <h1>header</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
