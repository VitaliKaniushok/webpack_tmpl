import {useState} from 'react'
import classes from './App.module.scss'
import {Link, Outlet} from 'react-router-dom'

import avatarPng from '@src/assets/anonymous.png'
import avatarjpg from '@src/assets/avatar-programmer.jpg'

import AvatarSvg from '@src/assets/avatar-svg.svg'


export const App = () => {
   const [count, setCount] = useState<number>(0)

   // TREE SHAKING 
   if (__PLATFORM__ == 'mobile') {
      return <h1>Mobile patform</h1>
   }

   return (
      <>
         <h1>platfom: {__PLATFORM__}</h1>
         <div>
            <img width={100} height={100} src={avatarPng} alt="" />
            <img width={100} height={100} src={avatarjpg} alt="" />
         </div>

         <div>
            <AvatarSvg color='red' width={200} height={100}/>
         </div>

         <Link to={'/about'}>About us</Link>
         <br />
         <Link to={'/shop'}>Shop</Link>

         <h1 className={classes.title}>
            Hello Vitali!
         </h1>
   
         <button className={classes.button} onClick={() => setCount(prev => ++prev)}>
            {count}
         </button>

         <Outlet />
      </>
   )
}