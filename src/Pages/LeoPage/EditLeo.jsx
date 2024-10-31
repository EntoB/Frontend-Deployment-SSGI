import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditLeo() {
  const { id } = useParams(); // Extract the LEO ID from the URL parameters
  const navigate = useNavigate(); // Use navigate for redirection
  const [leoName, setLeoName] = useState("");
  const [authorizedPerson, setAuthorizedPerson] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch the existing LEO details when the component mounts
    const fetchLeo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leo/getleo/${id}`,
        );
        console.log("Fetched LEO data:", response.data); // Log the fetched data
        setLeoName(response.data.leoName);
        setAuthorizedPerson(response.data.authorizedPerson);
      } catch (error) {
        console.error("Error fetching LEO:", error); // Log any errors
        setMessage(`Failed to fetch LEO details: ${error.message}`);
      }
    };

    fetchLeo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leo/updateteleo/${id}`,
        {
          leoName,
          authorizedPerson,
        },
      );
      console.log("Update response:", response.data);
      alert("updated seccuefully");
      navigate("/leo"); // Redirect to the list page after successful update
    } catch (error) {
      console.error("Error updating LEO:", error); // Log any errors
      setMessage(`Failed to update LEO: ${error.message}`);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Edit LEO</h2>

        {message && <p className="mb-4 text-center text-red-500">{message}</p>}

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="leoName"
          >
            LEO Name
          </label>
          <input
            type="text"
            id="leoName"
            value={leoName}
            onChange={(e) => setLeoName(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter LEO Name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="authorizedPerson"
          >
            Authorized Person
          </label>
          <input
            type="text"
            id="authorizedPerson"
            value={authorizedPerson}
            onChange={(e) => setAuthorizedPerson(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Authorized Person"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 py-2 text-white transition duration-300 hover:bg-blue-600"
        >
          Update LEO
        </button>
      </form>
    </div>
  );
}
