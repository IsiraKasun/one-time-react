import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { rootRiderct } from "./components/layouts/rootRedirect";
import Main from "./components/layouts/Main"

const router = createBrowserRouter([
  {
    path: "/",
    loader: rootRiderct,
  },
  {
    path: "/app",
    children: [
      {
        index: true,
        element: <Main />,
      }
    ],
  },
]);

function App() {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
