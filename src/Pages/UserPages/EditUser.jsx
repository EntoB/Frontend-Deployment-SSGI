import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditUser({ isLogged }) {
  console.log(isLogged);
  const { id } = useParams(); // Extract the User ID from the URL parameters
  const navigate = useNavigate(); // Use navigate for redirection
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User"); // Default role
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch the existing user details when the component mounts
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/singleUser/${id}`,
        );
        console.log("Fetched user data:", response.data); // Log the fetched data
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user:", error); // Log any errors
        setMessage(`Failed to fetch user details: ${error.message}`);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/update/${id}`,
        {
          firstName,
          lastName,
          email,
          role,
        },
      );
      console.log("Update response:", response.data);
      alert("User updated successfully");
      navigate("/users"); // Redirect to the list page after successful update
    } catch (error) {
      console.error("Error updating user:", error); // Log any errors
      setMessage(`Failed to update user: ${error.message}`);
    }
  };

  if (!isLogged) navigate("/login");
  return (
    <div className="mt-20 flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border-t-2 bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Edit User</h2>

        {message && <p className="mb-4 text-center text-red-500">{message}</p>}

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter First Name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Last Name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="role"
          >
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="PI">PI</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 py-2 text-white transition duration-300 hover:bg-blue-600"
        >
          Update User
        </button>
      </form>
    </div>
  );
}
