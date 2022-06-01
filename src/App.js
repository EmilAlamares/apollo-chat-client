import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CreateAccount from "./CreateAccount"
import Login from "./Login"
import Main from "./Main"
import Welcome from "./Welcome"
import { UserContext } from "./contexts/UserContext"
import { useState } from "react"

const App = () => {
  const [user, setUser] = useState("")
  return (
    <UserContext.Provider value={{user, setUser}}>
    <Router>
      <div className="App">
        <div className="container">
          <Routes>
            <Route
              path="/login"
              element={
                  <Login />
              }
            ></Route>
            <Route path="/register" element={<CreateAccount />}></Route>
            <Route
              path="/home"
              element={
                  <Main />
              }
            ></Route>
            <Route path="/" element={<Welcome />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
    </UserContext.Provider>
  )
}

export default App
