import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "./contexts/UserContext"

const CreateAccount = () => {
  const { setUser } = useContext(UserContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const navigate = useNavigate()

  const handleCreate = (e) => {
    e.preventDefault()

    if (!username || !password || !passwordConfirm)
      throw new Error("Please input all fields.")

    if (password !== passwordConfirm) throw new Error("Passwords don't match")

    // Converting js object for x-www-form-urlencoded content type.
    const data = new URLSearchParams({
      username,
      password,
      passwordConfirm,
    }).toString()

    fetch(`http://localhost:8000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    })
      .then(async (data) => {
        if (data.ok) {
          data = await data.json()
          if (data.message === "Success") {
            setUser(data)
            navigate("/home")
          } else {
            throw new Error(data.message)
          }
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="align-center flex">
      <div className="login-container create-container">
        <h1>Apollo Chat!</h1>
        <h2>Create Account</h2>
        <form>
          <input
            type="text"
            style={{ marginBottom: "30px" }}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete=""
          />
          <input
            type="password"
            style={{ marginBottom: "30px" }}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete=""
          />
          <input
            type="password"
            style={{ marginBottom: "30px" }}
            placeholder="confirm password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            autoComplete=""
          />
          <div className="flex">
            <button onClick={() => navigate("/")}>Back</button>
            <button onClick={(e) => handleCreate(e)}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateAccount
