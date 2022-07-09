import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import axios from "axios"

const CreateAccount = () => {
  const { setUser } = useContext(UserContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [image, setImage] = useState(null)
  const navigate = useNavigate()

  const handleCreate = (e) => {
    e.preventDefault()

    if (!username || !password || !passwordConfirm)
      return console.log("Please input all fields.")

    if (password !== passwordConfirm) console.log("Passwords don't match")

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
            localStorage.setItem('user', JSON.stringify(data))
            navigate("/chats")
          } else {
            console.log(data.message)
          }
          if (image)
          handleImageUpload(data.id)
        }
      })
      .catch((err) => console.log(err))
  }

  const handleImageUpload = async (userId) => {
    const formData = new FormData()
    formData.append("image", image)
    formData.append("filename", userId)
    try {
     axios.post("http://localhost:8000/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="align-center flex">
      <div
        className="login-container create-container"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleCreate(e)
          }
        }}
      >
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
            autoFocus
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
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .bmp, .gif, .jfif"
            onChange={(e) => setImage(e.target.files[0])}
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
