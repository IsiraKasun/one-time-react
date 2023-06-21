import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { rootRiderct } from "./components/layouts/rootRedirect";
import Main from "./components/layouts/Main";
import Message from "./components/layouts/Message";

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
      },
      {
        path: "message/:linkId",
        element: <Message />
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
