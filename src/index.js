import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { getAuth } from "firebase/auth";

// importing the top menu
import TopMenu from "./components/TopMenu/TopMenu";

// importing the different pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Editor from "./pages/Editor/Editor";
import ModuleList from "./pages/ModuleList/ModuleList";
import LoginPage from "./pages/Login/Login";
import LessonsPage from "./pages/Lessons/Lessons";
import HomePage from "./pages/HomePage/HomePage";
import UploadLesson from "./pages/UploadLesson/UploadLesson";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

// import firebase configs
import "./service/firebase";

// eslint-disable-next-line
function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const auth = getAuth();

    let unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  if (user === undefined) {
    // implement a loading screen
    return (
      <div className="loading container-fluid">
        <div className="row h-100 justify-content-center align-items-center ">
          <div className="col d-flex justify-content-center">
            <div className="spinner-border text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (user === null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
  // return children;
}

function AppLayout() {
  return (
    <>
      <TopMenu />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/editor",
        element: (
          <ProtectedRoute>
            <Editor />
          </ProtectedRoute>
        ),
      },
      {
        path: "/upload",
        element: (
          <ProtectedRoute>
            <UploadLesson />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/lessons",
        element: (
          <ProtectedRoute>
            <LessonsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/lessons/:lessonId",
        element: (
          <ProtectedRoute>
            <ModuleList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/modules",
        element: (
          <ProtectedRoute>
            <ModuleList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/errors",
        element: <ErrorPage />,
      },
      {
        path: "/",
        element: <LoginPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
