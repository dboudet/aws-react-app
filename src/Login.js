import { useState } from "react"
import { Link } from "react-router-dom"

export default function Login() {
  const [user, setUser] = useState({})
  const [loginResponse, setLoginResponse] = useState("login")

  const handleFormData = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleUserLogin = () => {
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) =>
        response.ok
          ? setLoginResponse("User now logged in")
          : setLoginResponse("Authentication failed")
      )
      .catch((err) => console.error(err))
  }

  return (
    <div className="login-container">
      <h1>Log in below</h1>
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
      {loginResponse !== "login" ? (
        <h3>{loginResponse}</h3>
      ) : (
        <button
          type="submit"
          onClick={handleUserLogin}
          disabled={user.email && user.password ? false : true}
        >
          Log In
        </button>
      )}

      <Link to="/">Go to signup page</Link>
    </div>
  )
}
