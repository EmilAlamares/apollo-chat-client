import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CreateAccount from "./CreateAccount"
import Login from "./Login"
import Main from "./Main"
import Welcome from "./Welcome"
import UserContextProvider from "./contexts/UserContext"
import PrivateRoute from "./PrivateRoute"



const App = () => {
  return (
    <UserContextProvider>
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
    </UserContextProvider>
  )
}

export default App
