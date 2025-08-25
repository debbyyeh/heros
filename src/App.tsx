import './App.css'
import Error from './pages/Error';

import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import HerosPage from './pages/HerosPage';
import HeroProfile from './pages/HeroProfile';

const router = createBrowserRouter([

  {
    path: "/",
    errorElement: <Error/>,
    element: <>
      <h1>Welcom to Hero pages</h1>
      <Link to='/heros'>See Our Heros</Link>
    </>,
  },
  {
    path: "/heros",
    element: <HerosPage/>,
  },
  {
    path: "/heros/:id",
    element: <HeroProfile/>,
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
