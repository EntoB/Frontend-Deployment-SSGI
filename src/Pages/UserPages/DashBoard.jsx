import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Adjust import for jwt-decode

export default function DashBoard({ isLogged }) {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  useEffect(() => {
    async function getUserData() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.id;
          const response = await axios.get(
            `http://localhost:5000/api/user/singleUser/${userId}`,
          );
          setUser(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    getUserData();
  }, []);

  useEffect(() => {
    async function getProjectsData() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.id;
          const response = await axios.get(
            `http://localhost:5000/api/project/getbycreator/${userId}`,
          );
          setProjects(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    getProjectsData();
  }, []);

  return (
    <div className="mt-10 grid grid-cols-2 justify-items-center gap-3 bg-[url('/src/assets/bgimg.png')] bg-cover bg-no-repeat p-10 pt-20 text-white shadow-md">
      <div className="col-span-2 flex flex-col items-center gap-2">
        <h1 className="font-serif text-2xl font-bold text-sky-50 backdrop-blur-2xl">
          {user.role} Dashboard
        </h1>
        <h2 className="text-xl font-bold capitalize text-sky-50">
          {user.firstName} {user.lastName}
        </h2>
      </div>
      <div className="col-span-2">
        <img
          src="src/assets/big-logo.png"
          className="object-fit rounded-md"
          alt="logo"
        />
      </div>
      <div className="boder-4 col-span-2 m-4 flex flex-col items-center justify-center">
        <h2 className="font-mono capitalize text-orange-300">
          Project created by {user.role}
        </h2>
        {projects.length ? (
          <ul
            className={`ml-10 mt-3 grid ${projects.length > 3 ? "grid-cols-3" : "grid-cols-2"}`}
          >
            {projects.map((pro, index) => (
              <li
                key={pro.projectCode}
                className="bg-sky-10 flex border-collapse gap-2 border-2 border-violet-700 bg-violet-800 p-2 shadow-lg"
              >
                <span>{index + 1}.</span>
                <p>{pro.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <h1 className="text-red-400">Project not found</h1>
        )}
      </div>
    </div>
  );
}
