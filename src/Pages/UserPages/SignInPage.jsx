import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignInPage({ onLogIn }) {
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Import and use useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/user/signin",
        formData,
      );

      console.log(response.data);
      localStorage.setItem("token", response.data.token); // Store the token in localStorage
      console.log("Token created successfully");

      setLoading(false);
      // navigate("/");
      navigate("/", { state: { message: "Logged In successfully" } });
      onLogIn();
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 403) {
        alert("Not verified. Please contact support.");
      } else {
        alert("Login failed. Please check your credentials and try again."); // Provide user feedback
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto mt-40 flex w-max grid-cols-1 flex-col items-center justify-items-center gap-5 rounded-md bg-sky-100 p-5 shadow-md"
    >
      <div className="flex flex-col items-center justify-items-center gap-x-2">
        <img
          className={`h-5 w-5 ${isLoading}`}
          src="icons8-user-50.png"
          alt="user"
        />
        <h1>LogIn</h1>
      </div>
      <input
        type="email"
        placeholder=" Email"
        name="email"
        required
        value={formData.email}
        onChange={handleChange}
        className="w-96 rounded-md py-2 pl-4"
      />
      <input
        type="password"
        required
        autoComplete="true"
        className="w-96 rounded-md py-2 pl-5"
        placeholder="Password" // Corrected spelling here
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button className="font-semibol col-span m-3 flex w-full items-center justify-center gap-5 rounded-md bg-blue-800  p-2 font-sans text-2xl text-blue-50 hover:bg-blue-700">
        {isLoading && (
          <img
            src="src/assets/loading.png"
            className={`h-5 w-5 ${isLoading && "animate-spin"}`}
            alt="loading"
          />
        )}
        <span>Log In</span>
      </button>
      <div>
        Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </form>
  );
}
