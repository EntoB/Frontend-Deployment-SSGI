import { Link } from "react-router-dom";
import Dropdown from "./UserDropdown";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

import { useEffect, useState } from "react";
import Sidebar from "./Aside";
export default function Header({ isLogged, onLogout }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const userToken = localStorage.getItem("token") || [];
        if (userToken) {
          // Decode the token to get the user ID
          const decodedToken = jwtDecode(userToken);
          const userId = decodedToken.id; // Adjust the field based on your token's payload structure

          // Fetch user data using the extracted user ID
          const response = await axios.get(
            `http://localhost:5000/api/user/singleUser/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            },
          );
          setUser(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (isLogged) {
      fetchData();
    }
  }, [isLogged]);

  // console.log(console.log(user.role));
  return (
    <nav className="fixed left-0 top-0 flex w-full items-center justify-evenly bg-yellow-600 py-1 font-serif text-yellow-50">
      {isLogged && <Sidebar isLogged={isLogged} user={user} />}

      <div className="flex min-h-fit items-center justify-center space-x-3 py-3">
        <img
          className="h-12 w-12"
          src=".\src\assets\small-logo.png"
          alt="SSGI img"
        />
        <h1 className="text-xs sm:text-xl md:text-2xl">Project Monitoring</h1>
      </div>
      <div>
        {/* <button className="g-purple-600 hover: rounded-md bg-sky-700 px-3 py-2 text-sm text-purple-50 hover:bg-sky-600 sm:ml-10">
          dark theme
        </button> */}
      </div>
      <div className="ml-20 flex justify-between space-x-10 px-7">
        <h2 className="flex items-center justify-center space-x-1">
          <img className="h-5 w-5" src="./icons8-home.svg" alt="home icon" />
          <Link className="hover:text-yellow-950" to="/">
            Home
          </Link>
        </h2>
        {!isLogged && (
          <h2 className="flex items-center justify-center space-x-1">
            <img className="h-5 w-5" src="./icons8-log-in-50.png" alt="" />
            <Link className="hover:text-yellow-950" to="/login">
              Login
            </Link>
          </h2>
        )}
        {isLogged && (
          <h1 className="flex w-full flex-col items-center self-end font-semibold capitalize text-yellow-200">
            {user.firstName} {user.lastName} <span> {user.role}</span>
          </h1>
        )}
        {!isLogged && (
          <h2 className="flex items-center justify-center space-x-1">
            <img className="h-5 w-5" src="icons8-user-50.png" alt="user" />{" "}
            <Link className="hover:text-yellow-950" to="/signup">
              Register
            </Link>
          </h2>
        )}
        {isLogged && <Dropdown onLogout={onLogout} />}
      </div>
    </nav>
  );
}
