import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Users from "./pages/Users";
import Return from "./pages/Return";
import Facilities from "./pages/Facilities";
import Reservations from "./pages/Reservations";

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
      path: "/*",
      element: <Return/>
    }
  ]

  if (localStorage.getItem("userType") === "DOCENTE") {
    listRoutes.push( {
      path: "/users", 
      element: <Users />
    } )
  }

  const router = createBrowserRouter(listRoutes);

  return (
    <RouterProvider router={router} />
  )
}

export default App
