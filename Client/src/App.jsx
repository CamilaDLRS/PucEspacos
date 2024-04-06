import TelaLogin from "./Pages/TelaLogin"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TelaLogin />
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
