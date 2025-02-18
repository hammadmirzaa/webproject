import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import ListUser from "./components/listUser";
import CreateUser from "./components/createUser";
import EditUser from "./components/editUser";

function App() {
  return (
    <div className="App">
      Hello React
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">List Users</Link>
            </li>
            <li>
              <Link to="user/create">Create User</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index element={<ListUser />} />
          <Route path="user/create" element={<CreateUser />} />
          <Route path="user/:id/edit" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
