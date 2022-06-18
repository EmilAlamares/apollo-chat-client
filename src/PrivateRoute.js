const PrivateRoute = (props) => {
    // const isLoggedIn = localStorage.hasOwnProperty('user') // Use cookies for auth in the future.

    // return isLoggedIn ? props.children : <Navigate to={'/'}/>
    return props.children
}
 
export default PrivateRoute;    