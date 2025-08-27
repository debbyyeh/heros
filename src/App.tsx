import './App.css'
import Error from './pages/Error';

import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import HeroesPage from './pages/HeroesPage';
import HeroProfile from './pages/HeroProfile';

const router = createBrowserRouter([

  {
    path: "/",
    errorElement: <Error/>,
    element: <>
      <h1>Welcom to Hero pages</h1>
      <Link to='/heroes'>See Our Heros</Link>
    </>,
  },
  {
    path: "/heroes",
    element: <HeroesPage/>,
    children: [
      {
        path: ":id", // 子路由
        element: <HeroProfile />,
      },
    ],
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
