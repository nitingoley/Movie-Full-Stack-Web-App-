import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/User/Home.jsx";
import { Login } from "./pages/Auth/Login.jsx";
import { Signup } from "./pages/Auth/Signup.jsx";
import { PrivateRoute } from "./pages/Auth/PrivateRoute.jsx";
import { Profie } from "./pages/User/Profie.jsx";
import { AdminRoute } from "./pages/Admin/AdminRoute.jsx";
import { GenreList } from "./pages/Admin/GenreList.jsx";
import { CreateMovie } from "./pages/Admin/CreateMovie.jsx";
import { AdminMovieList } from "./pages/Admin/AdminMovieList.jsx";
import { AdminUpdateMovie } from "./pages/Admin/AdminUpdateMovie.jsx";
import { AllMovies } from "./pages/Movies/AllMovies.jsx";
import { MovieDetails } from "./pages/Movies/MovieDetails.jsx";
import { AllComments } from "./pages/Movies/AllComments.jsx";
import { AdminDashboard } from "./pages/Admin/Dashboard/AdminDashboard.jsx";
import Subscription from "./pages/User/Subscription.jsx";
import Success from "./components/Success.jsx";
import Cancel from "./components/Cancel.jsx";
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "movies",
        element: <AllMovies />
      },
      {
        path: "movies/:id",
        element: <MovieDetails />
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Signup />,
      },
      {
        path: "payment",
        element: <Subscription />
      },
      {
        path: "success",
        element: <Success />
      },
      {
        path: "cancel",
        element: <Cancel />
      },
      {
        path: "profile",
        element: <PrivateRoute />, 
        children: [
          {
            path: "",
            element: <Profie />,  
          },
        ],
      },

      {
        path: "/",
        element: <AdminRoute />, 
        children: [
          {
           path:"/admin/movies/genre",
            element: <GenreList />,  
          },
          {
            path: '/admin/movies/create',
            element: <CreateMovie />
          },
          {
            path: "/admin/movies-list",
            element: <AdminMovieList />
          },
          {
            path: "/admin/movies/update/:id",
            element: <AdminUpdateMovie />
          },      {
            path: "/admin/movies/comments",
            element: <AllComments />
          },
          {
            path: "/admin/movies/dashboard",
            element: <AdminDashboard />
          },
        ],
      },
    ],
  },
]);


// Render the application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
