import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Main from "@/pages/Main";
import SignUp from "@/pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
