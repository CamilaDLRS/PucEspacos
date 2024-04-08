import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login"
import SingUp from "./pages/SingUp"
import Users from "./pages/Users";

function App() {
  const listRoutes = [
    { 
      path: "/",
      element: <Login />
    },
    {
      path: "/singUp",
      element: <SingUp />
    },
    {
      path: "/*",
      element: <h1>Sem permissão ou rota não existe!</h1>
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
