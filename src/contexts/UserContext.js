import { createContext, useState } from "react"

export const UserContext = createContext({})

const UserContextProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  )

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
