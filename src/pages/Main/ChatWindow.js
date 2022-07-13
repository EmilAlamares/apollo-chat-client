// import ChatWindowHeader from "./ChatWindowHeader"
// import ChatContent from "./ChatContent"
// import ChatBox from "./ChatBox"

// const ChatWindow = () => {
//   const [messages, setMessages] = useState(null)
//   useEffect(() => {
//     api.get(`https://apollo-chat-server.herokuapp.com/messages`).then((res) => {
//       if (res.data) {
//         setMessages(res.data.message)
//       }
//     })
//   }, [user])

//   return (
//     <div className="chat-container flex-v">
//       <div className="chat-window-header flex">
//         <img src="img/user-img-placeholder.png" alt="" />
//         <div>
//           <p className="user">John Doe</p>
//           <p className="status">offline</p>
//         </div>
//       </div>
//       <div className="chat-content flex-1 flex-v">
//         {messages?.map((m) => (
//           <Message
//             msg={m.message}
//             own={m.senderId === user.id ? true : false}
//             key={m._id}
//           />
//         ))}
//       </div>
//       <div className="chat-box flex">
//         <form className="flex">
//           <div className="chat-box-input-container flex-1 flex">
//             <textarea
//               className="chat-box-input"
//               ref={chatBox}
//               type="text"
//               placeholder="Aa"
//               onChange={(e) => {
//                 autoResize(e)
//               }}
//               onKeyPress={(e) => handleKeyPress(e)}
//               autoFocus
//             />
//           </div>
//           <div className="flex">
//             <button onClick={(e) => handleSend(e)}></button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default ChatWindow
