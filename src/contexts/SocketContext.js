import { createContext } from "react"
import { io } from "socket.io-client"

export const SocketContext = createContext({})
export const socket = io('http://localhost:8000')

const SocketContextProvider = (props) => {
  socket.on('server-new-message', () => {
    console.log('new message server.')
  })
  return (
    <SocketContext.Provider value={{socket}}>
      {props.children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider
