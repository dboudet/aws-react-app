import "./App.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Signup from "./Signup"
import Login from "./Login"

export default function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Signup} />
          </Switch>
        </header>
      </div>
    </Router>
  )
}
