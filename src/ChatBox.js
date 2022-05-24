const ChatBox = () => {
  const autoResize = (e) => {
    e.target.style.height = "36px"
    e.target.style.height = `${e.target.scrollHeight + 16}px`
  }

  return (
    <div className="chat-box flex">
      <form className="flex">
        <div className="chat-box-input-container flex-1 flex">
          <textarea
            className="chat-box-input"
            type="text"
            placeholder="Aa"
            onChange={(e) => {
              autoResize(e)
            }}
          />
        </div>

        <div className="flex">
          <button></button>
        </div>
      </form>
    </div>
  )
}

export default ChatBox
