import ChatWindowHeader from "./ChatWindowHeader"
import ChatContent from "./ChatContent"
import ChatBox from "./ChatBox"

const ChatWindow = () => {
  return (
    <div className="chat-container flex-v">
      <ChatWindowHeader/>
      <ChatContent />
      <ChatBox/>
    </div>
  )
}

export default ChatWindow
