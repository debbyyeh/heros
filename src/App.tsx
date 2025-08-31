import Error from './pages/Error';
import './styles/global.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeroesPage from './pages/HeroesPage';
import HeroProfile from './pages/HeroProfile';
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([

  {
    path: "/",
    errorElement: <Error/>,
    element: <Navigate to="/heroes" replace />,
  },
  {
    path: "/heroes",
    element: <HeroesPage/>,
    children: [
      {
        path: ":id",
        element: <HeroProfile />,
      },
    ],
  }
]);

function App() {

  return (
      <RouterProvider router={router}/>
  )
}

export default App
