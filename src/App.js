import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import ListUser from "./components/listUser";
import CreateUser from "./components/createUser";
import EditUser from "./components/editUser";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import { AuthProvider, UseAuthContext } from "./store/authContext";
import ProtectedRoute from "./store/protectedRoute";
import { UsePostFormContext } from "./store/postContext";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const { isLogout, setIsLogout } = UsePostFormContext();
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
        {isLogout &&
          <nav>
          <ul>
            {isLogout ? (
              <li>
                <Link to="/" > Logout </Link>
              </li>
            ) : (
              <li>
                <Link to="/"> Login </Link>
              </li>
            )}
            <li>
              <Link to="user/create">Admin Portal</Link>
            </li>
          </ul>
        </nav>
         }

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
