import { useContext } from "react"
import { UserContext } from "./contexts/UserContext";

const Navbar = () => {
    const {user} = useContext(UserContext)
    return ( 
        <div className="navbar flex">
            <img src="icon.png" alt="apollo icon" />
            <h1>Apollo Chat!</h1>
            <h2>Hello, {user.username}!</h2>
        </div>
     );
}
 
export default Navbar;