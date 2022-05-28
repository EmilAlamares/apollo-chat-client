import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CreateAccount = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleCreate = (e) => {
    e.preventDefault()
    
    if (!username || !password || !confirmPassword)
    throw new Error ('Please input all fields.')

    if (password !== confirmPassword)
    throw new Error("Passwords don't match")

    console.log('User created.')

  }
  



  const navigate = useNavigate()
  return (
    <div className="align-center flex">
      <div className="login-container create-container">
        <h1>Create Account</h1>
        <h2>Apollo Chat!</h2>
        <form>
          <input
            type="text"
            style={{ marginBottom: "30px" }}
            placeholder="username"
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            style={{ marginBottom: "30px" }}
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            style={{ marginBottom: "20px" }}
            placeholder="confirm password"
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <div className="flex">
            <button onClick={() => navigate('/')}>Back</button>
              <button onClick={e => handleCreate(e)}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateAccount
