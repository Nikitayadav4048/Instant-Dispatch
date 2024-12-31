

import Book from "./Book";

import About from "./About";

import Career from "./Career";

import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Servicespage from "./Servicespage";
import Home from "./home";
const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/about",
    element:<About/>
  },
  {
    path:"/career",
    element:<Career/>
  },
  {
    path:"/book",
    element:<Book/>
  },
  {
    path:"/services",
    element:<Servicespage/>
  }
]);

export default function App() {
  return <RouterProvider router={router} />
}