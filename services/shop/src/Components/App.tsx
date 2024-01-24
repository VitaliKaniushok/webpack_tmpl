import {Link, Outlet} from "react-router-dom"

export const App = () => {

   return (
      <div>
         <h1>SHOP Module</h1>
         <Link to='/shop/main'>Go to main</Link>
         <br />
         <br />
         <br />
         <Link to='/shop/second'>Go to second</Link>
         <Outlet/>
      </div>
   )
}