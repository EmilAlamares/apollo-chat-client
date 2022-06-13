import Conversation from "../../../components/Conversation"
import SearchBar from "./SearchBar"
import { useEffect, useContext, useState } from "react"
import { UserContext } from "../../../contexts/UserContext"
import api from "../../../api/util"

const LeftSidebar = () => {
  const [conversations, setConversations] = useState(null)
  const {user} = useContext(UserContext)

  useEffect(() => {
    api.get(`http://localhost:8000/conversation`).then((res) => {
      if (res.data) {
        console.log(res.data)
        setConversations(res.data.conversation)
      }
    })
  }, [user])
  console.log(conversations)

  return (
    <div className="left-sidebar-container flex-v">
      <SearchBar />
      <div className="left-sidebar-content">
        {conversations?.map(c => <Conversation selected={false} conv={c}  key={c._id}/>)}
      </div>
    </div>
  )
}

export default LeftSidebar
