import "./App.css";
import "react-calendar/dist/Calendar.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import UserHome from "./pages/UserHome";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider } from "./context/AuthContext";
import Create from "./pages/Create";
import ChangePassword from "./pages/ChangePassword";
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            {/* <Route path="/home" component={UserHome} /> */}
            <Route path="/create" component={Create} />
            <Route path="/reset:id" component={ResetPassword} />
            <Route path="/changePassword" component={ChangePassword} />
            <ProtectedRoute path="/profile" component={Profile} auth={true} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
