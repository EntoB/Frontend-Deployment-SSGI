import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Pagination from "../../components/Pagination";

export default function Users({ isLogged }) {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/getallusers/",
        );
        setUsers(response.data);
      } catch (error) {
        console.error(error);
        // alert(error.response ? error.response.data.message : error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please sign in again.");
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("User deleted successfully");
      setUsers(users.filter((user) => user._id !== userId)); // Remove user from the list
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  if (!isLogged) navigate("/login");

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="col-span-2 ml-52 mt-20 flex flex-col items-center gap-3 p-5 text-xs">
      <h1 className="text-2xl font-bold text-violet-700">Users List</h1>
      <table className="overflow-auto p-5">
        <thead className="p-2">
          <tr className="m-3">
            <th className="border p-1">#</th>
            <th className="border p-1">Name</th>
            <th className="border p-1">Email</th>
            <th className="border p-1">Account status</th>
            <th className="border p-1">Phone number</th>
            <th className="border p-1">Country</th>
            <th className="border p-1">Role</th>
            <th className="border p-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user._id} className="mx-3">
              <td className="border p-1 px-3">
                <span>{index + 1 + indexOfFirstUser}</span>
              </td>
              <td className="border p-1">
                {user.firstName} {user.lastName}
              </td>
              <td className="border p-1">{user.email}</td>
              <td className="border p-1">
                {user.role === "user" ? "Not Verified" : "Verified"}
              </td>
              <td className="border p-1">{user.phoneNumber}</td>
              <td className="border p-1">{user.country}</td>
              <td className="border p-1">{user.role}</td>
              <td className="flex flex-wrap justify-center gap-2 border px-1 py-4">
                <button
                  className="rounded-md border bg-transparent p-1 text-sm text-green-600 hover:bg-sky-50"
                  aria-label="View"
                  onClick={() => navigate(`/user/view/${user._id}`)}
                >
                  &#128065; View
                </button>
                <button
                  className="rounded-md border bg-transparent p-1 text-sm text-blue-600 hover:bg-sky-50"
                  aria-label="Edit"
                  onClick={() => navigate(`/user/edit/${user._id}`)}
                >
                  &#9998; Edit
                </button>
                <button
                  className="rounded-md border bg-transparent p-1 text-red-600 hover:bg-sky-50"
                  aria-label="Delete"
                  onClick={() => handleDelete(user._id)}
                >
                  &#x1F5D1; Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {currentPage} of {totalPages}
    </div>
  );
}
