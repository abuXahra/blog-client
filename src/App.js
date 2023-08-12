import { useContext } from "react";
import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Setting from "./pages/settings/Setting";
import Single from './pages/single/Single'
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Context } from "./context/Context";

function App() {

  const { user } = useContext(Context);

  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/register" element={user ? <Navigate to={'/'} /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to={'/'} /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Navigate to={'/register'} />} />
        <Route path="/settings" element={user ? <Setting /> : <Navigate to={'/register'} />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
