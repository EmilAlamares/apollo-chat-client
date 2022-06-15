import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

const Conversation = ({ selected, conv }) => {
  const { user } = useContext(UserContext)
  const otherUserName = conv.usersName.filter(
    (usersName) => usersName !== user.username
  )
  return (
        <div
          className={
            selected ? "conversation selected flex" : "conversation flex"
          }
        >
          <img src={"img/user-img-placeholder-2.png"} alt="User" />
          <span>
            <h1>{otherUserName}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </span>
        </div>
  )
}

export default Conversation
