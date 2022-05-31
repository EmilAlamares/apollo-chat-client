import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    const data = new URLSearchParams({
      username: `${username}`,
      password: `${password}`,
    }).toString()

    fetch(`http://localhost:8000/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then(async (data) => {
        if (data.ok) {
          data = (await data.json())
          if (data.message === "Success"){
          console.log(data)
          navigate("/home")
        }else {
          throw new Error (data.message)
        }
        }
      })
      .catch((err) => console.log(err))
  }

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
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
          <input
            type="password"
            style={{ marginBottom: "20px" }}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <div className="flex">
            <Link to="/register">
              <button>Forgot password?</button>
            </Link>
            <button onClick={(e) => handleLogin(e)}>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
