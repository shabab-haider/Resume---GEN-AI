import { createBrowserRouter } from "react-router";

import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Protected from "./features/auth/components/Protected";
import Logout from "./features/auth/pages/Logout";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";

export const Router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/interview/:id",
    element: (
      <Protected>
        <Interview />
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);
