import { useContext } from "react"
import { UserContext } from "./contexts/UserContext";

const Navbar = () => {
    const {user} = useContext(UserContext)
    return ( 
        <div className="navbar flex">
            <img src="icon.png" alt="apollo icon" />
            <h1>Apollo Chat! {user.username}</h1>
        </div>
     );
}
 
export default Navbar;