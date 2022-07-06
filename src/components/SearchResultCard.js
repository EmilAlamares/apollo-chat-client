import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"

const SearchResultCard = ({ result, setSelectedConversation, setOtherUser }) => {
  const { user } = useContext(UserContext)
  return (
    <div
      className="search-results-card flex"
      onMouseDown={() => {
        if ((result?.conversation[0]?.usersName)?.includes(user.username))
        setSelectedConversation(result.conversation[0]._id)
        else
        setSelectedConversation(null)
        setOtherUser({username: result.username, id: result._id})
      }}
    >
      <img src={`http://localhost:8000/image/${result._id}`} alt="user" />
      <p>{result.username}</p>
    </div>
  )
}

export default SearchResultCard
