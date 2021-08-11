import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Signup() {
  const [user, setUser] = useState({})
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((rawData) => rawData.json())
      .then((allUsers) => setAllUsers(allUsers))
      .catch((err) => console.error(err))
  }, [])

  const handleCreateUser = () => {
    fetch("http://localhost:5000/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      // fetch ALWAYS requires two .thens...
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data))
      })
      .then(() => window.location.reload(false))
      .catch((err) => console.error(err))
  }

  const handleFormData = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }
  return (
    <div className="signup-container">
      <h2>Sign up below:</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={handleFormData}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={handleFormData}
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        onChange={handleFormData}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleFormData}
      />
      <button
        type="submit"
        disabled={
          user.email && user.password && user.firstName && user.lastName
            ? false
            : true
        }
        onClick={handleCreateUser}
      >
        Sign me up!
      </button>
        <Link to="/login">Go to login page</Link>
      <div className="userList">
        {allUsers &&
          allUsers.map((singleUser) => {
            return (
              <div className="singleUser" key={singleUser._id}>
                <p>{singleUser.firstName}</p>
                <p>{singleUser.lastName}</p>
                <p>{singleUser.email}</p>
              </div>
            )
          })}
      </div>
      <button onClick={() => localStorage.clear()}>Clear local storage</button>
      <button
        onClick={() => {
          const localUser = JSON.parse(localStorage.getItem("user"))
          console.log(localUser)
        }}
      >
        Get local storage
      </button>
    </div>
  )
}
