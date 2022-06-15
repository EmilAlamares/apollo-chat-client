import Message from "../../components/Message"
import { useState, useContext, useEffect } from "react"
import { UserContext } from "../../contexts/UserContext"
import api from "../../api/util"



const ChatContent = () => {
  const [messages, setMessages] = useState(null)
  const {user} = useContext(UserContext)

  useEffect(() => {
    api.get(`http://localhost:8000/messages`).then((res) => {
      if (res.data) {
        setMessages(res.data.message)
      }
    })
  }, [user])


  return (
    <div className="chat-content flex-1 flex-v">
      {messages?.map(m => <Message msg={m.message} own={m.senderId === user.id ? true : false} key={m._id}/>)}
    </div>
  )
}

export default ChatContent
