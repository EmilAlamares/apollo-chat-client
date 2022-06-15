import { useContext, useRef } from "react"
import { UserContext } from "../contexts/UserContext"

const Conversation = ({ conv }) => {
  const { user } = useContext(UserContext)
  const otherUserName = conv.usersName.filter(
    (usersName) => usersName !== user.username
  )


  return (
    <>
      <input type="radio" id={conv._id} name="convos" style={{display: "none"}}/>
      <label htmlFor={conv._id}>
        <div className={"conversation flex"}>
          <img src={"img/user-img-placeholder-2.png"} alt="User" />
          <span>
            <h1>{otherUserName}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </span>
        </div>
      </label>
    </>
  )
}

export default Conversation
