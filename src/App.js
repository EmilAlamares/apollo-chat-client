import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CreateAccount from "./CreateAccount"
import Login from "./Login"
import Main from "./Main"

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<CreateAccount />}></Route>
            <Route path="/home" element={<Main />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
