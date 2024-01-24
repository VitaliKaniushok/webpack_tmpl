import {Suspense} from "react";

import {createBrowserRouter, Navigate} from "react-router-dom";

import {App} from "@src/Components/App/App"
import {About} from '@src/pages/About'

const routes =  [
   {
      path: "/",
      element: <Navigate to='/admin' replace={true} />,
   },
   {
      path: "/admin",
      element: <App />,
      children: [
         {
            path: '/admin/about',
            element: <Suspense fallback={'Loading...'}><About /></Suspense>
         },
      ]
   },
]

export const router = createBrowserRouter(routes);

export default routes;