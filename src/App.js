import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import Admin from "./pages/Admin/Admin"
import Profile from "./pages/Profile/Profile"
import { useEffect } from "react";
import { SetToken } from "./redux/usersSlice";
import MovieDetails from "./pages/MovieDetails";
import { GetAllMovies } from "./api/movies";
import BookShow from "./components/BookShow";

function App() {

  const { loading } = useSelector((state) => state.loaders);
  const { user } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(SetToken(localStorage.getItem("token")))
    }
    // dispatch(GetAllMovies())
  }, [])



  return (
    <div>
      {loading && (
        <div className="loader-parent">
          <div className="loader"></div>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          {/* <Route index path="/" element={<Home />} /> */}
          <Route path="/movie/:id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
          <Route path="/book-show/:id" element={<ProtectedRoute><BookShow /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute ifAdmin={true}><Admin /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
