import Navbar from "./Navbar"
import Message from "../../components/Message"
import api from "../../api/util"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext, useRef } from "react"
import { UserContext } from "../../contexts/UserContext"
import Conversation from "../../components/Conversation"
import { io } from "socket.io-client"
import SearchResultCard from "../../components/SearchResultCard"

const Main = () => {
  const [conversations, setConversations] = useState(null)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState(null)
  const [otherUser, setOtherUser] = useState(null)
  const [searchUser, setSearchUser] = useState("")
  const [searchResults, setSearchResults] = useState(null)
  const [searchBarFocus, setSearchBarFocus] = useState(false)
  const { user } = useContext(UserContext)
  const chatBox = useRef(null)
  const navigate = useNavigate()
  let socket = useRef(null)

  // Soft verification -- to be optimized in the future.
  api
    .get(`http://localhost:8000/home`)
    .then((res) => {
      if (res.data.message !== "Success") {
        navigate("/")
        localStorage.clear()
      }
    })
    .catch((err) => console.log(err))

  // Connect socket
  useEffect(() => {
    socket.current = io("http://localhost:8000", {query: `user=${user.id}`})

    // Update the conversation when received new message.
    socket.current.on('new-message', (c) => {console.log(c)})
    socket.current.on('receiveMsg', (msg) => setMessages([...msg, msg]))

  }, [user])

  // Get conversations
  useEffect(() => {
    api.get(`http://localhost:8000/conversations`).then((res) => {
      if (res.data) {
        const { conversation } = res.data
        setConversations(conversation)
        setSelectedConversation(conversation[0] ? conversation[0]._id : null)
      }

      if (!res.data.conversation[0]) setOtherUser(true) // To allow the rendering when there's no available conversation.
    })
  }, [user])

  // Get other user(s) info
  useEffect(() => {
    if (selectedConversation)
      api
        .get(`http://localhost:8000/conversations/${selectedConversation}`)
        .then((res) => {
          if (res.data) {
            const username = res.data.conversation[0].usersName.filter(
              (x) => x !== user.username
            )[0]
            const id = res.data.conversation[0].users.filter(
              (x) => x !== user.id
            )[0]

            setOtherUser({
              username,
              id,
            })
          }
        })
  }, [selectedConversation, user])

  // Get messages
  useEffect(() => {
    api
      .get(`http://localhost:8000/messages/${selectedConversation}`)
      .then((res) => {
        if (res.data) {
          setMessages(res.data.message)
        }
      })
  }, [selectedConversation])

  // Handle user search.
  useEffect(() => {
    if (searchUser !== "") {
      api.get(`http://localhost:8000/users/${searchUser}`).then((res) => {
        const { user } = res.data
        setSearchResults(user)
      })
    } else {
      setSearchResults(null)
    }
  }, [searchUser])

  // Auto resizing of the chat-box textarea
  const autoResize = (e) => {
    e.target.style.height = "36px"
    e.target.style.height = `${e.target.scrollHeight + 16}px`
  }

  // Handling creating conversation.
  const createConversation = () => {
    api
      .post(`http://localhost:8000/conversations`, {
        userOneName: user.username,
        userOneId: user.id,
        userTwoName: otherUser.username,
        userTwoId: otherUser.id,
      })
      .then((res) => {
        if (res.data._id) setConversations([res.data, ...conversations])
        setSelectedConversation(res.data._id)
      })
      .catch((err) => console.log(err))
  }

  // Handling sending message.
  const handleSend = (e) => {
    e.preventDefault()

    if (chatBox.current.value !== "") {
      api
        .post(`http://localhost:8000/messages`, {
          message: chatBox.current.value,
          senderId: user.id,
          recipientId: otherUser.id,
        })
        .then((res) => {
          let {message} = res.data
          setMessages([...messages, message])

          // For updating the last entry in conversation object.
          const newState = conversations?.map(c => {
            if (c._id === selectedConversation)
            return {...c, lastEntry: {senderId: user.id, message: message.message}}
            else
            return c
          })
          setConversations(newState)
        })
        .catch((err) => console.log(err))

      // socket.current.emit("new-message", `${newMessage.message}`)
      // setMessages([...messages, newMessage])
    }

    chatBox.current.value = ""
    chatBox.current.style.height = "36px"
    chatBox.current.focus()
  }

  // Handling key press in chat textarea.
  const handleKeyPress = (e) => {
    if (e.key === "Enter")
      if (!e.shiftKey) {
        // For handling shift + enter key press.
        e.preventDefault()
        handleSend(e)
      }
  }

  return (
    <>
      {conversations && otherUser && (
        <div className="main-content">
          <Navbar />
          <div className="flex" style={{ height: "calc(100% - 50px)" }}>
            <div className="left-sidebar-container flex-v">
              <div className="searchBar-container">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchUser}
                  onChange={(e) => {
                    setSearchUser(e.target.value)
                  }}
                  style={
                    searchUser && searchResults?.length > 0 && searchBarFocus
                      ? { borderRadius: "20px 20px 0 0" }
                      : {}
                  }
                  onFocus={() => setSearchBarFocus(true)}
                  onBlur={() => setSearchBarFocus(false)}
                />
                <img src="img/search-bar-icon.png" alt="search icon" />
              </div>
              {searchUser && searchResults?.length > 0 && searchBarFocus && (
                <div className="search-results-container">
                  {searchResults?.map((result) => (
                    <SearchResultCard
                      result={result}
                      key={result._id}
                      setOtherUser={setOtherUser}
                      setSelectedConversation={setSelectedConversation}
                    />
                  ))}
                </div>
              )}
              <div className="left-sidebar-content">
                <div
                  onChange={(e) => {
                    setSelectedConversation(e.target.id)
                  }}
                >
                  {conversations?.map((c, index) => (
                    <Conversation
                      conv={c}
                      key={c._id}
                      index={index}
                      selectedId={selectedConversation}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="chat-container flex-v">
              <div className="chat-window-header flex">
                {otherUser.id && (
                  <>
                    <img src="img/user-img-placeholder.png" alt="" />
                    <div>
                      <p className="user">{otherUser.username}</p>
                      <p className="status">offline</p>
                    </div>
                  </>
                )}
              </div>
              <div className="chat-content flex-1 flex-v">
                {selectedConversation ? (
                  messages?.map((m) => (
                    <Message
                      msg={m.message}
                      own={m.senderId === user.id ? true : false}
                      key={m._id}
                    />
                  ))
                ) : (
                  <h1 onClick={() => createConversation()}>
                    Start a conversation with this user.
                  </h1>
                )}
              </div>
              <div className="chat-box flex">
                <form className="flex">
                  <div
                    className="chat-box-input-container flex-1 flex"
                    style={
                      selectedConversation ? {} : { background: "#d8dcdf" }
                    }
                  >
                    <textarea
                      className="chat-box-input"
                      ref={chatBox}
                      type="text"
                      placeholder="Aa"
                      onChange={(e) => {
                        autoResize(e)
                      }}
                      onKeyPress={(e) => handleKeyPress(e)}
                      disabled={selectedConversation ? false : true}
                      style={
                        selectedConversation
                          ? {}
                          : {
                              background: "#d8dcdf",
                              border: "8px solid #d8dcdf",
                            }
                      }
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
                {otherUser.id && (
                  <>
                    <img src="img/user-img-placeholder-2.png" alt="" />
                    <p className="user">
                      <strong>{otherUser.username}</strong>
                    </p>
                    <p className="user-joined">
                      <strong>Joined on 04/06/2022</strong>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Main
