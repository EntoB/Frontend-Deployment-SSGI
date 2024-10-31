import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import as a default import
import { useNavigate, Navigate } from "react-router-dom";

export default function EditProfile({ isLogged }) {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phoneNumber: "",
    country: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (isLogged) {
        try {
          const userToken = localStorage.getItem("token");
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
            const userData = response.data;
            setUser(userData);

            // Update formData based on fetched user data
            setFormData({
              firstName: userData.firstName || "",
              lastName: userData.lastName || "",
              email: userData.email || "",
              gender: userData.gender || "",
              phoneNumber: userData.phoneNumber || "",
              country: userData.country || "",
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    if (isLogged) {
      fetchData();
    }
  }, [isLogged]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      console.error("Email is required");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/update/${user._id}`, // Assuming you meant to update, not signup
        formData,
      );
      console.log(response.data);
      alert("Updated successfully");
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="mt-20 flex flex-col items-center justify-center gap-5 bg-slate-100 font-mono">
      <h1 className="text-2xl text-green-600">Update User Profile</h1>
      <form
        className="grid justify-items-center rounded-md bg-slate-200 p-10"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Select name="gender" value={formData.gender} onChange={handleChange} />
        <Input
          type="text"
          name="country"
          label="Country"
          value={formData.country}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="phoneNumber"
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="m-auto mt-5 w-52 rounded-md bg-blue-500 py-2 uppercase text-white"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

function Input({ placeholder, value, type, name, onChange, label }) {
  return (
    <fieldset className="rounded-md border border-slate-50 px-3">
      <legend className="rounded-md p-1 text-blue-500">{label}</legend>
      <input
        className="w-96 rounded-md border-0 bg-slate-200 p-2 text-green-500 outline-0"
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        required
      />
    </fieldset>
  );
}

function Select({ onChange, name, value }) {
  return (
    <select
      onChange={onChange}
      className="mt-3 w-[25.2rem] rounded-md border border-slate-100 bg-slate-200 p-3"
      value={value}
      required
      name={name}
    >
      <option value="">Gender</option>
      <option value="female">Female</option>
      <option value="male">Male</option>
    </select>
  );
}
