import SearchBar from "./SearchBar"

const LeftSidebar = () => {
  return (
    <div className="left-sidebar-container flex-v">
      <SearchBar />
      <div className="left-sidebar-content"></div>
    </div>
  )
}

export default LeftSidebar
