import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login"
import SignUp from "./pages/signUp"
import Users from "./pages/users";
import Return from "./pages/return";
import Facilities from "./pages/facilities";
import Reservations from "./pages/reservations";
import ReservationsCreate from "./pages/reservationsCreate";

function App() {
  const listRoutes = [
    { 
      path: "/",
      element: <Login />
    },
    {
      path: "/signUp",
      element: <SignUp />
    },
    {
      path: "/facilities",
      element: <Facilities />
    },
    {
      path: "/reservations",
      element: <Reservations />
    },
    {
      path: "/reservationsCreate",
      element: <ReservationsCreate />
    },
    {
      path: "/users",
      element: <Users />
    },
    {
      path: "/*",
      element: <Return/>
    }
  ]

  const router = createBrowserRouter(listRoutes);

  return (
    <RouterProvider router={router} />
  )
}

export default App
