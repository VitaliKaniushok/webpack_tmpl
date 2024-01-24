import {Link, Outlet} from "react-router-dom"

export const App = () => {

   return (
      <div>
         <h1>ADMIN Module</h1>
         <Link to='/admin/about'>Go to about</Link>
         <Outlet/>
      </div>
   )
}