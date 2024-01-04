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
    path: "details/:id",
    element: <Details />,
  },
];

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <div className="absolute flex items-center justify-center left-0 top-0 right-0 bottom-0 bg-[#2c4058] ">
      <div className="w-[376px] h-[666px]  bg-gray-100 rounded-lg shadow-md overflow-y-scroll">
        <Header />
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
