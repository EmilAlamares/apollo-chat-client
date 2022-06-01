import { Link } from "react-router-dom"

const Welcome = () => {
  return (
    <div className="align-center flex">
      <div className="welcome-container">
        <h1>Apollo Chat!</h1>
        <h2>Welcome!</h2>
          <Link to='/login'><button className="login-btn">Login</button></Link>
          <Link to='/register'><button className="register-btn">Register</button></Link>
      </div>
    </div>
  )
}

export default Welcome
