import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

// importing the top menu
import TopMenu from "./components/TopMenu/TopMenu";

// importing the different pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Editor from "./pages/Editor/Editor";
import ModuleList from "./pages/ModuleList/ModuleList";
import LoginPage from "./pages/Login/Login";

const ProtectedRoute = ({ children }) => {
  let token = true;
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function AppLayout() {
  return (
    <>
      <TopMenu />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/home",
        element: <Editor />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "modules",
        element: <ModuleList />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "*",
        element: <Navigate to="/home" replace={true} />,
      },
    ],
  },]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="893030336396-4boqmdcq2lqtofpd9p3itcgisoadehig.apps.googleusercontent.com">
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GoogleOAuthProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
