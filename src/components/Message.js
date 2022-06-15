const Message = ({ own, msg }) => {
  return (
    <div className={own ? "msg-container own" : "msg-container"}>
      <p>{msg}</p>
    </div>
  )
}

export default Message
