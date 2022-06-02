import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
    const isLoggedIn = localStorage.hasOwnProperty('user')
    console.log('nice')
    return isLoggedIn ? props.children : <Navigate to={'/'}/>
}
 
export default PrivateRoute;    