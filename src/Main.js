import Navbar from "./Navbar"
import LeftSidebar from "./LeftSidebar"
import RightSidebar from "./RightSidebar"
import ChatWindow from "./ChatWindow"
import axios from "axios"



const Main = () => {
  axios.get(`http://localhost:8000/users/home`).then((res) => {
    if (!res.data.message === 'Success') 
    console.log('not good')
  })

  return (
    <div className="main-content">
      <Navbar />
      <div className="flex" style={{ height: "calc(100% - 50px)" }}>
        <LeftSidebar />
        <ChatWindow />
        <RightSidebar />
      </div>
    </div>
  )
}

export default Main
