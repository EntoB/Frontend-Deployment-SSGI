import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import SignUpPage from "./Pages/UserPages/SignUpPage"; // Fixed typo here
import EditProfile from "./Pages/UserPages/EditProfile"; // Fixed typo here
import DashBoard from "./Pages/UserPages/DashBoard"; // Fixed typo here
import Layout from "./components/Layout";
import { useState } from "react";
import SignInPage from "./Pages/UserPages/SignInPage";
import WelcomePage from "./components/WelcomePage";
import YourProject from "./Pages/ProjectsPage/YourProject";
import Profile from "./Pages/UserPages/Profile";
import ChangePassword from "./Pages/UserPages/ChangePassword";
import ViewProject from "./Pages/ProjectsPage/ViewProject";
import AllProjects from "./Pages/ProjectsPage/AllProjects";
import Leo from "./Pages/LeoPage/LEOList";
import EditLeo from "./Pages/LeoPage/EditLeo";
import EditProject from "./Pages/ProjectsPage/EditProject";
import Users from "./Pages/UserPages/UsersList";
import ViewUser from "./Pages/UserPages/ViewUser";
import EditUser from "./Pages/UserPages/EditUser";
import Reminder from "./Pages/UserPages/Reminder";

export default function App() {
  const [isLogged, setIsLogged] = useState(() => {
    const found = localStorage.getItem("token");
    if (found) {
      return true;
    }
  });

  function handleLogIn() {
    setIsLogged((prev) => !prev);
  }
  function handleLogOut() {
    localStorage.removeItem("token"); // Remove token on logout
    setIsLogged(false);
  }
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Layout isLogged={isLogged} onLogout={handleLogOut} />}
          >
            <Route index element={<HomePage />} />
            <Route path="signup" element={<SignUpPage isLogged={isLogged} />} />
            <Route path="/" element={<WelcomePage />} />
            <Route
              path="/project/view/:id"
              element={<ViewProject />}
            />
            <Route
              path="/user/view/:id"
              element={<ViewUser isLogged={isLogged} />}
            />
            <Route
              path="/user/edit/:id"
              element={<EditUser isLogged={isLogged} />}
            />
            <Route
              path="/user/sendreminder"
              element={<Reminder isLogged={isLogged} />}
            />
            <Route
              path="/project/edit/:id"
              element={<EditProject isLogged={isLogged} />}
            />
            <Route path="/leo/edit/:id" element={<EditLeo />} />
            <Route path="/leo" element={<Leo />} />

            <Route
              path="/dashboard"
              element={<DashBoard isLogged={isLogged} />}
            />
            <Route path="/users" element={<Users isLogged={isLogged} />} />
            <Route path="/allprojects" element={<AllProjects />} />
            <Route path="/profile" element={<Profile isLogged={isLogged} />} />
            <Route path="/edit" element={<EditProfile isLogged={isLogged} />} />
            <Route
              path="login"
              element={<SignInPage onLogIn={handleLogIn} />}
            />
            <Route
              path="/changePassword"
              element={<ChangePassword isLogged={isLogged} />}
            />
            <Route
              path="yourProjects"
              element={<YourProject isLogged={isLogged} />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
