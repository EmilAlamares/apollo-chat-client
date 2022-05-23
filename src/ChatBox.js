const ChatBox = () => {

  const autoResize = (e) => {
    e.target.style.cssText = "height: 35px"
    e.target.style.cssText = `height: ${e.target.scrollHeight}px`
  }

  return (
    <div className="chat-box flex">
      <form className="flex">
        {/* Here, I put the textarea and the button in two seperate divs to
        prevent the scrollbar edgesin textarea from overflowing */}

        <div className="chat-box-input-container flex-1">
          <textarea
            style={{height: "35px"}}
            className="chat-box-input"
            type="text"
            placeholder="Aa"
            onChange={(e) => {
        
              autoResize(e)
            }}
          />
        </div>

        <div>
          <button></button>
        </div>
      </form>
    </div>
  )
}

export default ChatBox
