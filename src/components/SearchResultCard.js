const SearchResultCard = ({user}) => {
  return (
    <div className="search-results-card flex">
      <img src="img/user-img-placeholder.png" alt="user" />
      <p>{user.username}</p>
    </div>
  )
}

export default SearchResultCard
