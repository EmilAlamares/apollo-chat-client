import { createContext } from "react"
import { io } from "socket.io-client"

export const SocketContext = createContext({})
export const socket = io('')

const SocketContextProvider = (props) => {
  return (
    <SocketContext.Provider value={{socket}}>
      {props.children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider
