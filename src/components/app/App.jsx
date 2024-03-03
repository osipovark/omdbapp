import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import styles from "./App.module.scss";

import Base from "../base/Base.jsx";
import Home from "../../pages/home/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
