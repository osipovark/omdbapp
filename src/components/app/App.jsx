import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import styles from "./App.module.scss";

import Base from "../base/Base.jsx";
// import Home from "../../pages/home/Home.jsx";
import Search from "../../pages/search/Search.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    children: [
      {
        index: true,
        element: <Search />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
