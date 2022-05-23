import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const CreateAccount = () => {

  const navigate = useNavigate()
  return (
    <div className="align-center flex">
      <div className="login-container create-container">
        <h1>Create Account</h1>
        <h2>Apollo Chat!</h2>
        <form>
          <input
            type="text"
            style={{ marginBottom: "30px" }}
            placeholder="username"
            required
          />
          <input
            type="password"
            style={{ marginBottom: "30px" }}
            placeholder="password"
            required
          />
          <input
            type="password"
            style={{ marginBottom: "20px" }}
            placeholder="confirm password"
            required
          />
          <div className="flex">
            <button onClick={() => navigate(-1)}>Back</button>
            <Link to="/home">
              <button>Next</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateAccount
