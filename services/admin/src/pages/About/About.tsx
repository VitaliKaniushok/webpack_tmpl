import {Link} from "react-router-dom";

import {UserCard} from "@packages/shared/src/components/UserCard";

const About = () => {

   return (
      <>
         <h1>About</h1>
         <Link to='/admin'>Go to admin</Link>
         <UserCard userName={'FROM ADMIN'} />
      </>
   )
}

export default About;