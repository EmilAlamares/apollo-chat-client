import { useContext, useRef } from "react"
import { SocketContext } from "./contexts/SocketContext"

const ChatBox = () => {
  const { socket } = useContext(SocketContext)
  const chatBox = useRef(null)

  const autoResize = (e) => {
    e.target.style.height = "36px"
    e.target.style.height = `${e.target.scrollHeight + 16}px`
  }

  const handleSend = (e) => {
    e.preventDefault()
    
    if (chatBox.current.value !== "")
    socket.emit('new-message', `${chatBox.current.value}`)

    chatBox.current.value = ""
    chatBox.current.focus()
  }

  return (
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
            autoFocus
          />
        </div>
        <div className="flex">
          <button onClick={(e) => handleSend(e)}></button>
        </div>
      </form>
    </div>
  )
}

export default ChatBox
