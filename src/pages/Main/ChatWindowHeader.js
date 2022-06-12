const ChatWindowHeader = () => {
  return (
    <div className="chat-window-header flex">
      <img src="img/user-img-placeholder.png" alt=""/>
      <div>
        <p className="user">John Doe</p>
        <p className="status">offline</p>
      </div>
    </div>
  )
}

export default ChatWindowHeader
