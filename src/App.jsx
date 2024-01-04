import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Header from "./components/Header.jsx";
import Activity from "./pages/Activity.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Details from "./pages/Details.jsx";

const routes = [
  {
    path: "/",
    element: <Activity />,
    errorElement: <ErrorPage />,
  },
  {
    path: "id",
    element: <Details />,
  },
];

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <div className="container">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
