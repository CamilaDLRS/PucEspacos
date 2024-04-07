import Login from "./Pages/Login/Login"
import SingUp from "./Pages/SingUp/SingUp"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/singUp",
      element: <SingUp />
    },
  ]);
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
