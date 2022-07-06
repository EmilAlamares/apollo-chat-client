import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import axios from "axios"

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { setUser } = useContext(UserContext)

  const handleLogin = (e) => {
    e.preventDefault()

    const data = new URLSearchParams({
      username: `${username}`,
      password: `${password}`,
    }).toString()

    axios
      .post(
        `http://localhost:8000/users/login`,
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        if (response.data.message === 'Success')
        {
          setUser(response.data)
          localStorage.setItem('user', JSON.stringify(response.data))
          navigate("/chats")
        }
        else console.log(`Error: ${response.data.message}`)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="align-center flex">
      <div className="login-container" onKeyPress={(e) => {
        if (e.key === 'Enter')
        {
          handleLogin(e)
        }
        }}>
        <h1>Apollo Chat!</h1>
        <h2>Login</h2>
        <form>
          <input
            type="text"
            style={{ marginBottom: "30px" }}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
            autoComplete="off"
            autoFocus
          />
          <input
            type="password"
            style={{ marginBottom: "30px" }}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            autoComplete="off"
          />
          <div className="flex">
            <Link to="/register">
              <button>Forgot password?</button>
            </Link>
            <button onClick={(e) => handleLogin(e)}>Login</button>
          </div>
        </form>
        <button className="back-btn" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
  )
}

export default Login
