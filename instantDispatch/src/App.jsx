

import Book from "./Book";

import About from "./About";

import Career from "./Career";

import {createBrowserRouter, RouterProvider} from "react-router-dom"
const router = createBrowserRouter([
  {
    path:"/",
    element:<About/>
  },
  {
    path:"/career",
    element:<Career/>
  },
  {
    path:"/book",
    element:<Book/>
  }
]);

export default function App() {
  return <RouterProvider router={router} />
}