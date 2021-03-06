import Navbar from "./Navbar"
import Message from "../../components/Message"
import api from "../../api/util"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext, useRef, useLayoutEffect } from "react"
import { UserContext } from "../../contexts/UserContext"
import Conversation from "../../components/Conversation"
import { io } from "socket.io-client"
import SearchResultCard from "../../components/SearchResultCard"

const Main = () => {
  const [conversations, setConversations] = useState(null)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [receivedMessage, setReceivedMessage] = useState(null)
  const [messages, setMessages] = useState([])
  const [otherUser, setOtherUser] = useState(null)
  const [searchUser, setSearchUser] = useState("")
  const [searchResults, setSearchResults] = useState(null)
  const [searchBarFocus, setSearchBarFocus] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState([])
  const { user } = useContext(UserContext)
  const chatBox = useRef(null)
  const scrollRef = useRef(null)
  const navigate = useNavigate()
  let socket = useRef(null)

  // Soft verification -- to be optimized in the future.
  api
    .get(`https://apollo-chat-server.herokuapp.com/home`)
    .then((res) => {
      if (res.data.message !== "Success") {
        navigate("/")
        localStorage.clear()
      }
    })
    .catch((err) => console.log(err))

  // Connect socket
  useEffect(() => {
    socket.current = io("https://apollo-chat-server.herokuapp.com", {
      query: `user=${user.id}`,
    })

    socket.current.on("userOnline", (user) =>
      setOnlineUsers((users) => [...users, user])
    )
    socket.current.on("userOffline", (user) => setOnlineUsers(user))

    socket.current.on("currentOnline", (users) => setOnlineUsers(users))

    socket.current.on("receiveMsg", (msg) => setReceivedMessage(msg))
    socket.current.on("receiveConv", (conv) =>
      setConversations((c) => [conv, ...c])
    )
  }, [user])

  /* eslint-disable */
  // Handling receiving message.

  useEffect(() => {
    if (receivedMessage?.senderId === otherUser?.id)
      setMessages((m) => [...m, receivedMessage])

    let index
    // For updating the last entry in conversation state.
    const newState = conversations?.map((c, idx) => {
      if (c._id === receivedMessage.conversationId) {
        index = idx
        return {
          ...c,
          lastEntry: {
            senderId: receivedMessage.senderId,
            message: receivedMessage.message,
          },
        }
      } else return c
    })
    newState?.splice(0, 0, newState.splice(index, 1)[0]) // To move the selected conversation to the first index.
    setConversations(newState)
  }, [receivedMessage])

  /* eslint-enable */

  // Get conversations
  useEffect(() => {
    api
      .get(`https://apollo-chat-server.herokuapp.com/conversations`)
      .then((res) => {
        if (res.data) {
          const { conversation } = res.data
          setConversations(conversation)
          const filteredConversation = conversation?.filter(
            (conv) => conv.lastEntry.senderId === user.id
          )
          const sortedConversation = filteredConversation.sort(
            (convA, convB) => convB.lastModifiedEntry - convA.lastModifiedEntry
          )
          setSelectedConversation(conversation[0] ? conversation[0]?._id : null)
          setSelectedConversation(
            filteredConversation[0]
              ? sortedConversation[0]?._id
              : conversation[0]?._id
          )
        }

        if (!res.data.conversation[0]) setOtherUser(true) // To allow the rendering when there's no available conversation.
      })
  }, [user])

  // Get other user(s) info
  useEffect(() => {
    if (selectedConversation)
      api
        .get(
          `https://apollo-chat-server.herokuapp.com/conversations/${selectedConversation}`
        )
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
      .get(
        `https://apollo-chat-server.herokuapp.com/messages/${selectedConversation}`
      )
      .then((res) => {
        if (res.data) {
          setMessages(res.data.message)
        }
      })
  }, [selectedConversation])

  // Handle user search.
  useEffect(() => {
    if (searchUser !== "") {
      api
        .get(`https://apollo-chat-server.herokuapp.com/users/${searchUser}`)
        .then((res) => {
          const { user } = res.data
          setSearchResults(user)
        })
    } else {
      setSearchResults(null)
    }
  }, [searchUser])

  // Auto scroll after every message.
  useLayoutEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  // Auto resizing of the chat-box textarea
  const autoResize = (e) => {
    e.target.style.height = "36px"
    e.target.style.height = `${e.target.scrollHeight + 16}px`
  }

  // Handling creating conversation.
  const createConversation = () => {
    api
      .post(`https://apollo-chat-server.herokuapp.com/conversations`, {
        userOneName: user.username,
        userOneId: user.id,
        userTwoName: otherUser.username,
        userTwoId: otherUser.id,
      })
      .then((res) => {
        if (res.data._id) setConversations([res.data, ...conversations])
        setSelectedConversation(res.data._id)
        socket.current.emit("new-conversation", res.data)
      })
      .catch((err) => console.log(err))
  }

  // Handling sending message.
  const handleSend = (e) => {
    e.preventDefault()

    if (chatBox.current.value !== "") {
      let index
      setMessages([
        ...messages,
        {
          message: chatBox.current.value,
          senderId: user.id,
          _id: Math.random(),
        },
      ])

      // For updating the last entry in conversation state.
      const newState = conversations?.map((c, idx) => {
        if (c._id === selectedConversation) {
          index = idx
          return {
            ...c,
            lastEntry: { senderId: user.id, message: chatBox.current.value },
          }
        } else return c
      })
      newState.splice(0, 0, newState.splice(index, 1)[0]) // To move the selected conversation to the first index.
      setConversations(newState)

      api
        .post(`https://apollo-chat-server.herokuapp.com/messages`, {
          message: chatBox.current.value,
          senderId: user.id,
          recipientId: otherUser.id,
        })
        .then((res) => {
          let { message } = res.data
          socket.current.emit("new-message", message)
        })
        .catch((err) => console.log(err))
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

  // To determine what to display in chat window.
  const displayChatWindow = () => {
    const convIsAlreadyCreated = conversations
      .map((c) => c.users)
      .filter((user) => user.includes(otherUser.id))

    if (!conversations[0] && !otherUser.id)
      return (
        <h1 className="no-conversation-header">
          You currently have no conversations. Search a user and start a
          conversation.
        </h1>
      )

    if (otherUser.id && !messages && !convIsAlreadyCreated[0])
      return (
        <h1
          onClick={(e) => {
            // Secure this in the future.
            if (e.target.className === "start-conversation-header") {
              e.target.className += " start-conversation-header-loading"
              createConversation()
            }
          }}
          className="start-conversation-header"
        >
          Start a conversation with this user.
        </h1>
      )

    return messages?.map((m) => (
      <Message
        msg={m.message}
        own={m.senderId === user.id ? true : false}
        key={m._id}
      />
    ))
  }

  return (
    <>
      {conversations && otherUser && (
        <div className="main-content">
          <Navbar socket={socket.current} />
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
                    <img
                      src={`https://apollo-chat-server.herokuapp.com/image/${otherUser.id}`}
                      alt="user profile"
                    />
                    <div>
                      <p className="user">{otherUser.username}</p>
                      <p
                        className={
                          onlineUsers.includes(otherUser.id)
                            ? "online-status"
                            : "offline-status"
                        }
                      >
                        {onlineUsers.includes(otherUser.id)
                          ? "online"
                          : "offline"}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="chat-content flex-1 flex-v" ref={scrollRef}>
                <div className="flex-v full-height flex-0">
                  {displayChatWindow()}
                </div>
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
                    <img
                      src={`https://apollo-chat-server.herokuapp.com/image/${otherUser.id}`}
                      alt=""
                    />
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
