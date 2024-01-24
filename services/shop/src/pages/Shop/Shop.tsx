import {Link} from 'react-router-dom'

import {shopRoutes} from '@packages/shared/src/routes/shop'

const Shop = () => {

   return (
      <div style={{padding: '30px 0'}}>
         <h1>Shop Main</h1>
         <div>
            <Link to={shopRoutes.second}>Go to Second</Link>
         </div>
      </div>
   )
}

export default Shop;