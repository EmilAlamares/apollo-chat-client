import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
    const isLoggedIn = localStorage.hasOwnProperty('user')

    // return isLoggedIn ? props.children : <Navigate to={'/'}/>
    return props.children
}
 
export default PrivateRoute;    