import Navbar from "./Navbar"
import Message from "../../components/Message"
import api from "../../api/util"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext, useRef } from "react"
import { UserContext } from "../../contexts/UserContext"
import Conversation from "../../components/Conversation"
import { io } from "socket.io-client"

const Main = () => {
  const [conversations, setConversations] = useState(null)
  const [messages, setMessages] = useState(null)
  const { user } = useContext(UserContext)
  const socket = io("http://localhost:8000")
  const chatBox = useRef(null)
  const navigate = useNavigate()


  // Get conversations
  useEffect(() => {
    api.get(`http://localhost:8000/conversations`).then((res) => {
      if (res.data) {
        setConversations(res.data.conversation)
      }
    })
  }, [user])

  // Get messages
  useEffect(() => {
    api.get(`http://localhost:8000/messages`).then((res) => {
      if (res.data) {
        setMessages(res.data.message)
      }
    })
  }, [user])

  // Auto resizing of the chat-box textarea
  const autoResize = (e) => {
    e.target.style.height = "36px"
    e.target.style.height = `${e.target.scrollHeight + 16}px`
  }

  // Handling Send
  const handleSend = (e) => {
    e.preventDefault()

    if (chatBox.current.value !== "")
      socket.emit("new-message", `${chatBox.current.value}`)

    chatBox.current.value = ""
    chatBox.current.style.height = "36px"
    chatBox.current.focus()
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter")
      if (!e.shiftKey) {
        // For handling shift + enter key press.
        e.preventDefault()
        handleSend(e)
      }
  }

  api
    .get(`http://localhost:8000/users/home`)
    .then((res) => {
      if (res.data.message !== "Success") navigate("/")
    })
    .catch((err) => console.log(err))

  return (
    <div className="main-content">
      <Navbar />
      <div className="flex" style={{ height: "calc(100% - 50px)" }}>
        <div className="left-sidebar-container flex-v">
          <div className="searchBar-container">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="left-sidebar-content">
            <div onChange={(e) => console.log(`Conversation: ${e.target.id}`)}>
            {conversations?.map((c) => (
              <Conversation conv={c} key={c._id} />
            ))}
            </div>
          </div>
        </div>
        <div className="chat-container flex-v">
          <div className="chat-window-header flex">
            <img src="img/user-img-placeholder.png" alt="" />
            <div>
              <p className="user">John Doe</p>
              <p className="status">offline</p>
            </div>
          </div>
          <div className="chat-content flex-1 flex-v">
            {messages?.map((m) => (
              <Message
                msg={m.message}
                own={m.senderId === user.id ? true : false}
                key={m._id}
              />
            ))}
          </div>
          <div className="chat-box flex">
            <form className="flex">
              <div className="chat-box-input-container flex-1 flex">
                <textarea
                  className="chat-box-input"
                  ref={chatBox}
                  type="text"
                  placeholder="Aa"
                  onChange={(e) => {
                    autoResize(e)
                  }}
                  onKeyPress={(e) => handleKeyPress(e)}
                  autoFocus
                />
              </div>
              <div className="flex">
                <button onClick={(e) => handleSend(e)}></button>
              </div>
            </form>
          </div>
        </div>

        <div className="right-sidebar-container flex-v">
          <div className="right-sidebar-content">
            <img src="img/user-img-placeholder-2.png" alt="" />
            <p className="user">
              <strong>John Doe</strong>
            </p>
            <p className="user-joined">
              <strong>Joined on 04/06/2022</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
