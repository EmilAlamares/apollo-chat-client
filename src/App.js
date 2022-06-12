import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CreateAccount from "./pages/CreateAccount"
import Login from "./pages/Login"
import Main from "./pages/Main/Main"
import Welcome from "./pages/Welcome"
import UserContextProvider from "./contexts/UserContext"
import PrivateRoute from "./PrivateRoute"
// import SocketContextProvider from "./contexts/SocketContext"

const App = () => {

  return (
    <UserContextProvider>
      {/* <SocketContextProvider> */}
      <Router>
        <div className="App">
          <div className="container">
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<CreateAccount />}></Route>

              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Main />
                  </PrivateRoute>
                }
              ></Route>

              <Route path="/" element={<Welcome />}></Route>
            </Routes>
          </div>
        </div>
      </Router>
      {/* </SocketContextProvider> */}
    </UserContextProvider>
  )
}

export default App
