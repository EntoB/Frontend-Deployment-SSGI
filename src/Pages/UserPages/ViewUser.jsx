import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/singleUser/${id}`,
        );
        setUser(response.data);
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        alert(error.response ? error.response.data.message : error.message);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ml-52 mt-12 flex h-max flex-col items-center gap-4 bg-sky-50 p-5 py-16">
      <div className="flex h-max flex-col items-center gap-5 w-full">
        <img
          src="/src/assets/profile.png"
          alt="User Profile"
          className="max-h-14 min-w-14 rounded-full border-2 bg-gray-50 p-[1px]"
        />
        <h1 className="text-2xl font-bold capitalize text-blue-600">
          {user.role}
        </h1>

        <div className="flex w-full flex-col rounded-md bg-white p-6 shadow-md">
          <h1 className="mb-4 text-3xl font-semibold text-sky-500">
            User Details
          </h1>
          <div className="mb-4 flex gap-2">
            <h2 className="whitespace-nowrap text-xl font-medium text-gray-700">
              Name:
            </h2>
            <p className="w-full text-lg text-sky-600">
              <span>
                {user.firstName} {user.lastName}
              </span>
            </p>
          </div>
          <div className="d mb-4 flex gap-2">
            <h2 className="text-xl font-medium text-gray-700">Email:</h2>
            <p className="text-lg text-sky-600">{user.email}</p>
          </div>
          <div className="mb-4 flex gap-2">
            <h2 className="text-xl font-medium text-gray-700">Role:</h2>
            <p className="text-lg text-sky-600"> {user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
