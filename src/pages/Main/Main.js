import Navbar from "./Navbar"
import LeftSidebar from "./LeftSidebar/LeftSidebar"
import RightSidebar from "./RightSidebar/RightSidebar"
import ChatWindow from "./ChatWindow"
import api from "../../api/util"
import { useNavigate } from "react-router-dom"

const Main = () => {
  const navigate = useNavigate()
  api
    .get(`http://localhost:8000/users/home`)
    .then((res) => {
      if (res.data.message !== "Success") navigate("/")
    })
    .catch((err) => console.log(err))

  return (
    <div className="main-content">
      <Navbar />
      <div className="flex" style={{ height: "calc(100% - 50px)" }}>
        <LeftSidebar />
        <ChatWindow/>
        <RightSidebar />
      </div>
    </div>
  )
}

export default Main
