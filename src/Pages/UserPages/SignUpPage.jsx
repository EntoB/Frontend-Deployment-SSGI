import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUpPages({ isLogged }) {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmPassword: "",
    password: "",
    gender: "",
    phoneNumber: "",
    country: "",
  });
  console.log(isLogged);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    if (!formData.email || !formData.password) {
      console.error("Email and Password are required");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/user/signup",
        formData,
      );
      console.log(response.data);
      setIsLoading(false);
      alert("Registred succefully");
      if (isLogged) navigate("/");
      else navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto mt-32 grid w-max grid-cols-2 items-center justify-items-center gap-5 rounded-md border bg-slate-100 p-5 shadow-md"
    >
      <div className="col-span-2 flex flex-col items-center justify-items-center">
        <img className="h-5 w-5" src="icons8-user-50.png" alt="user" />
        <h1>Sign Up</h1>
      </div>
      <Input
        placeholder={"First name"}
        type={"text"}
        onChange={handleChange}
        name={"firstName"}
        value={formData.firstName}
      />
      <Input
        placeholder={"Last name"}
        type={"text"}
        onChange={handleChange}
        name={"lastName"}
        value={formData.lastName}
      />
      <Input
        placeholder={"Email"}
        type={"email"}
        onChange={handleChange}
        name={"email"}
        value={formData.email}
      />
      <Select
        onChange={handleChange}
        required
        name={"gender"}
        value={formData.gender}
      />
      <Input
        placeholder={"Country"}
        type={"text"}
        onChange={handleChange}
        name={"country"}
        value={formData.country}
        required
      />
      <Input
        placeholder={"Phone number"}
        type={"number"}
        onChange={handleChange}
        name={"phoneNumber"}
        value={formData.phoneNumber}
      />
      <Input
        placeholder={"Password"}
        type={"password"}
        onChange={handleChange}
        name={"password"}
        value={formData.password}
      />
      <Input
        placeholder={"Confirm Password"}
        type={"password"}
        onChange={handleChange}
        name={"confirmPassword"}
        value={formData.confirmPassword}
      />
      <button className="p fitems-center ont-semibold col-span-2 m-3 flex w-full justify-center gap-3 rounded-md bg-blue-800 p-3 text-xl text-blue-50 hover:bg-blue-700">
        {isLoading && (
          <img
            src="src/assets/loading.png"
            className={`h-8 w-8 ${isLoading && "animate-spin"}`}
            alt="loading"
          />
        )}{" "}
        <span>Sign Up</span>{" "}
      </button>
    </form>
  );
}

function Input({ placeholder, value, type, name, onChange }) {
  return (
    <input
      className="w-64 rounded-md p-2 pl-4"
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      required
    />
  );
}

function Select({ onChange, name, value }) {
  return (
    <select
      onChange={onChange}
      className="h-10 w-64 rounded-md px-4 text-stone-400"
      value={value}
      name={name}
    >
      <option value="">Gender</option>
      <option value="female">Female</option>
      <option value="male">Male</option>
    </select>
  );
}
