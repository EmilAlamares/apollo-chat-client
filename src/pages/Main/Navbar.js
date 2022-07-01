import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"

const Navbar = ({socket}) => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  return (
    <div className="navbar flex">
      {/* <img src="img/icon.png" alt="apollo icon" /> */}
      <h1>Apollo Chat!</h1>
      <h2
        style={{ cursor: "pointer" }}
        onClick={() => {
          localStorage.clear()
          socket.disconnect()
          navigate('/')
        }}
      >
        Hello, {user.username}!
      </h2>
    </div>
  )
}

export default Navbar
