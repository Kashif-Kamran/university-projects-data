import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Favourites from './pages/Favourites'
import Layout from './Layout'
import { store } from './Store'
import { Provider } from 'react-redux'
import UserProtectedRoute from "./protectedRoutes/UserProtectedRoute.jsx"
import { initializeApp } from "firebase/app";
import { Navigate } from 'react-router-dom'
// Initilzing Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCBoMVjSwpKsD6Q9373X6WaPfc2WRhAdgs",
  authDomain: "novafrontendapp.firebase`app.com",
  projectId: "novafrontendapp",
  storageBucket: "novafrontendapp.appspot.com",
  messagingSenderId: "100421121783",
  appId: "1:100421121783:web:a30c21a4f301461585c5f2"
};

initializeApp(firebaseConfig);

function App()
{
  return (
    <Provider store={store}>
      <Routes>
        {/* <Route exect path="/" element{<Navigate to="/home" />} /> */}
        <Route exect path="/" element={<Navigate to="/home" />} />
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route element={<UserProtectedRoute />}>
            <Route path="/favourites" element={<Favourites />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Provider>
  )
}

export default App
