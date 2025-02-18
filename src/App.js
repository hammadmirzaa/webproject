import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import ListUser from "./components/listUser";
import CreateUser from "./components/createUser";
import EditUser from "./components/editUser";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import { AuthProvider, UseAuthContext } from "./store/authContext";
import ProtectedRoute from "./store/protectedRoute";

function App() {
  return (
    <div className="App">
      Hello React
      <BrowserRouter>
      <AuthProvider>
        <nav>
          <ul>
            <li>
              <Link to="/listItems">List Users</Link>
            </li>
            <li>
              <Link to="/"> Login </Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="user/create">Admin Portal</Link>
            </li>
          </ul>
        </nav>
        <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/listItems"
          element={<ProtectedRoute element={<ListUser />} />}
        />
        <Route
          path="user/create"
          element={<ProtectedRoute element={<CreateUser />} />}
        />
        <Route
          path="user/:id/edit"
          element={<ProtectedRoute element={<EditUser />} />}
        />
      </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
