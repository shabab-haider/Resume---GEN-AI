import React from "react";
import { RouterProvider } from "react-router";
import { Router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import InterviewContext from "./features/interview/interview.context.jsx";
import AppNavbar from "./components/AppNavbar.jsx";

const App = () => {
  return (
    <AuthProvider>
      <InterviewContext>
        <AppNavbar />
        <RouterProvider router={Router} />
      </InterviewContext>
    </AuthProvider>
  );
};

export default App;
