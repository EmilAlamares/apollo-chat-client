import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CreateAccount from "./CreateAccount"
import Login from "./Login"
import Main from "./Main"
import { UserContext } from "./contexts/UserContext"
import { useState } from "react"

const App = () => {
  const [user, setUser] = useState("")
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <UserContext.Provider value={{ user, setUser }}>
                  <Login />
                </UserContext.Provider>
              }
            ></Route>
            <Route path="/register" element={<CreateAccount />}></Route>
            <Route
              path="/home"
              element={
                <UserContext.Provider value={{ user, setUser }}>
                  <Main />
                </UserContext.Provider>
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
