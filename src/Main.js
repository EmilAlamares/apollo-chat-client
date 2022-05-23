import Navbar from "./Navbar"
import LeftSidebar from "./LeftSidebar"
import RightSidebar from "./RightSidebar"
import ChatWindow from "./ChatWindow"

const Main = () => {
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
