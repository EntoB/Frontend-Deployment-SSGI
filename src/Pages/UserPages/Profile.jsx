import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

export default function Profile({ isLogged }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (isLogged) {
    
        try {
          const userToken = localStorage.getItem("token");
          if (userToken) {
            const decodedToken = jwtDecode(userToken);
            const userId = decodedToken.id;

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
      } else {
        navigate("/login");
      }
    }

    fetchData();
  }, [isLogged, navigate]);


  return (
    <div className="mt-[5rem] flex items-center justify-end gap-5 border bg-slate-50 px-6 pb-9 xs:flex-col lg:flex-row">
      {isLogged ? (
        <>
          <div className="mt-10 grid h-max w-max grid-cols-2 justify-items-center gap-y-4 space-x-2 border bg-slate-100 p-5 capitalize">
            <img
              src="./src/assets/profile.png"
              className="col-span-2 h-20 w-20 rounded-full"
              alt="Profile"
            />
            <div className="col-span-2">{user.role}</div>
            <Link
              to="/edit"
              className="rounded-md bg-green-700 px-3 py-2 text-center uppercase text-white hover:bg-green-600 xs:w-52"
            >
              Update Profile
            </Link>
            <Link
              to="/changePassword"
              className="rounded-md bg-green-700 px-3 py-2 text-center uppercase text-white hover:bg-green-600 xs:w-52"
            >
              Change Password
            </Link>
          </div>
          <div className="mt-10 grid h-max w-max grid-cols-2 gap-y-3 bg-slate-100 p-10">
            <label>Full Name</label>
            <h1>
              {user.firstName} {user.lastName}
            </h1>
            <hr className="col-span-2 border" />
            <label>Email</label>
            <h1>{user.email}</h1>
            <hr className="col-span-2 border" />
            <label>Country</label>
            <h1>{user.country}</h1>
            <hr className="col-span-2 border" />
          </div>
        </>
      ) : null}
    </div>
  );
}
