import {Suspense} from "react";

import {createBrowserRouter, Navigate} from "react-router-dom";

import {App} from "@src/Components/App"
import {Shop} from '@src/pages/Shop'

import {UserCard} from '@packages/shared/src/components/UserCard'

const routes =  [
   {
      path: "/",
      element: <Navigate to='/shop' replace={true} />,
   },
   {
      path: "/shop",
      element: <App />,
      children: [
         {
            path: '/shop/main',
            element: <Suspense fallback={'Loading...'}><Shop /></Suspense>
         },
         {
            path: '/shop/second',
            element: 
               <Suspense fallback={'Loading...'}>
                <div style={{padding: '30px 0'}}>
                   <h3>SECOND page</h3>
                   <UserCard userName={'User name from shop'}/>
                </div>
               </Suspense>
         }
      ]
   },
 ]

export const router = createBrowserRouter(routes);

export default routes;