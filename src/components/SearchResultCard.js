import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"

const SearchResultCard = ({
  result,
  setSelectedConversation,
  setOtherUser,
}) => {
  const { user } = useContext(UserContext)
  return (
    <div
      className="search-results-card flex"
      onMouseDown={() => {
        setSelectedConversation(null)

        result.conversation.map((res, idx) => {
          if (res.usersName.includes(user.username))
            // Checks if the user in the card has a conversation with the current user.
            return setSelectedConversation(result.conversation[idx]._id)

            return true // For warnings.
        })

        setOtherUser({ username: result.username, id: result._id })
      }}
    >
      <img
        src={`https://apollo-chat-server.herokuapp.com/image/${result._id}`}
        alt="user"
      />
      <p>{result.username}</p>
    </div>
  )
}

export default SearchResultCard
