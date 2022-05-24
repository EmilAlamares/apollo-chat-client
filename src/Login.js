import { useState } from "react"
import { Link } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
  
    fetch(`http://localhost:8000/members?username=${username}`)
      .then((data) => {
        if (data) return data.json()

      })
      .then((res) => {
        if (!res.length) throw new Error('User not found.')
        if (res[0].password === password) console.log('Logged In')
        else console.log('Incorrect credentials')
      })
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
