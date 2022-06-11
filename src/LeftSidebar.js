import Conversation from "./components/Conversation"
import SearchBar from "./SearchBar"

const LeftSidebar = () => {
  return (
    <div className="left-sidebar-container flex-v">
      <SearchBar />
      <div className="left-sidebar-content">
        <Conversation selected={true}/>
        <Conversation />
        <Conversation />
      </div>
    </div>
  )
}

export default LeftSidebar
