import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="align-center flex">
      <div className="login-container">
        <h1>Login</h1>
        <h2>Apollo Chat!</h2>
        <form>
          <input
            type="text"
            style={{ marginBottom: "30px" }}
            placeholder="username"
            required
          />
          <input
            type="password"
            style={{ marginBottom: "20px" }}
            placeholder="password"
            required
          />
          <div className="flex">
            <Link to="/register">
              <button>Forgot password?</button>
            </Link>
            <Link to="/home">
              <button>Login</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
