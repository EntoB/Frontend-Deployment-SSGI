import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function ChangePassword({ isLogged }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  console.log(user);
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
          alert("Failed to fetch user data.");
        }
      } else {
        navigate("/login");
      }
    }

    fetchData();
  }, [isLogged, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New Password and Confirm Password do not match!");
      return;
    }

    if (!user._id) {
      alert("User ID is missing!");
      return;
    }

    try {
      const { newPassword, currentPassword } = formData;

      const response = await axios.put(
        `http://localhost:5000/api/user/changePassword/${user._id}`,
        { newPassword, currentPassword },
      );
      console.log(response.data);
      alert("Password changed successfully");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("An error occurred while changing the password.");
    }
  }

  return (
    <div className="mt-20 flex h-max flex-col items-center justify-center gap-y-10 bg-slate-300 p-10">
      <h1 className="bg-slate-300 px-28 py-4 text-2xl font-semibold uppercase text-blue-600">
        Change Password
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-max grid-cols-1 flex-col items-center justify-items-center gap-5 rounded-md bg-slate-100 p-5 shadow-md"
      >
        <input
          type="password"
          placeholder="Current Password"
          name="currentPassword"
          className="w-96 rounded-md py-2 pl-4"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          name="newPassword"
          className="w-96 rounded-md py-2 pl-4"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="w-96 rounded-md py-2 pl-5"
          placeholder="Confirm new Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button className="col-span-2 m-3 w-full rounded-md bg-blue-800 pb-3 pt-3 text-xl font-semibold uppercase text-blue-50 hover:bg-blue-700">
          Change
        </button>
      </form>
    </div>
  );
}
