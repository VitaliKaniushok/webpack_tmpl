import {Suspense} from "react";
import {createRoot} from "react-dom/client"
import {createBrowserRouter,RouterProvider} from "react-router-dom";

import {App} from "@src/Components/App"
import {About} from '@src/pages/About'
import {Shop} from '@src/pages/Shop'

const root = document.getElementById('root')

if(!root) {
   throw new Error('root not found')
}

const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      children: [
         {
            path: '/about',
            element: <Suspense fallback={'Loading...'}><About /></Suspense>
         },
         {
            path: '/shop',
            element: <Suspense fallback={'Loading...'}><Shop /></Suspense>
         }
      ]
   },
 ]);

const container = createRoot(root)

container.render(
   <RouterProvider router={router} />
)