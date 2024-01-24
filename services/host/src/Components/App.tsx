import {Link, Outlet} from "react-router-dom"

import {shopRoutes} from '@packages/shared/src/routes/shop'
import {adminRoutes} from '@packages/shared/src/routes/admin'

export const App = () => {

   return (
      <div>
         <h1>Page</h1>
         <Link to={adminRoutes.about}>About</Link>
         <br />
         <br />
         <br />
         <Link to={shopRoutes.main}>Shop</Link>
         <Outlet/>
      </div>
   )
}