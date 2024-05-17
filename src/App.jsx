import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import {
  ExpenseTable,
  Home,
  HomeLayout,
  ReportChart,
  TrackerForm,
} from "./Pages/index";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/expensetable",
          element: <ExpenseTable />,
        },
        {
          path: "/trackerform",
          element: <TrackerForm />,
        },
        {
          path: "/dashboard",
          element: <ReportChart />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
