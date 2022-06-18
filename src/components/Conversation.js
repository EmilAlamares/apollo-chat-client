import { useContext} from "react"
import { UserContext } from "../contexts/UserContext"

const Conversation = ({ conv, index, selectedId }) => {
  const { user } = useContext(UserContext)
  const otherUserName = conv.usersName.filter(
    (usersName) => usersName !== user.username
  )

  return (
    <>
    {/* I put prevent default on onClick to set the checked attribute only AFTER the api call.
        Otherwise, the component will be styled as "checked" already even though the
        rest of the page are still displaying the previous data.*/}
      <input type="radio" id={conv._id} name="convos" style={{display: "none"}} checked={selectedId === conv._id} onClick={e => e.preventDefault()} readOnly/> 
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
