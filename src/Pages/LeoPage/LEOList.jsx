import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
export default function Leo() {
  const [leoName, setLeoName] = useState("");
  const [authorizedPerson, setAuthorizedPerson] = useState("");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [leo, setLeo] = useState([]);
  async function fetchLeo() {
    try {
      const response = await axios.get("http://localhost:5000/api/leo/getleos");

      const data = response.data;
      setLeo(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchLeo();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/leo/createleo",
        {
          leoName,
          authorizedPerson,
        },
      );

      setMessage("LEO registered successfully!");
      fetchLeo();
    } catch (error) {
      setMessage(
        `Failed to register LEO: ${error.response?.data?.message || error.message}`,
      );
    }
  }

  return (
    <div className="ml-52 mt-20 flex flex-col items-center justify-center gap-4 p-5">
      <div className="flex w-full justify-end">
        <button onClick={() => setShowForm((prev) => !prev)}>
          <span className="h-8 w-8 bg-black text-white">➕</span> Add LEO
        </button>
      </div>

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md"
        >
          <h2 className="mb-6 text-center text-2xl font-bold">Register LEO</h2>

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
            Register
          </button>

          {message && (
            <p className="mt-4 text-center text-sm font-bold text-emerald-400">
              {message}
            </p>
          )}
        </form>
      ) : (
        <LeoList leo={leo} />
      )}
    </div>
  );
}

function LeoList({ leo }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [leosPerPage] = useState(5); // Set the number of LEOs per page
  const navigate = useNavigate();

  // Pagination logic
  const indexOfLastLeo = currentPage * leosPerPage;
  const indexOfFirstLeo = indexOfLastLeo - leosPerPage;
  const currentLeos = leo.slice(indexOfFirstLeo, indexOfLastLeo);

  const totalPages = Math.ceil(leo.length / leosPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <table className="w-full overflow-auto p-5">
        <thead className="bg-gray-100 p-2">
          <tr className="m-3">
            <th className="border p-1">#</th>
            <th className="border p-1">LEO</th>
            <th className="border p-1">Authorized Person</th>
            <th className="border p-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentLeos.map((leo, index) => (
            <tr key={leo._id} className="mx-3">
              <td className="border px-3 py-4">
                {index + 1 + indexOfFirstLeo}
              </td>
              <td className="border px-3 py-4">{leo.leoName}</td>
              <td className="border px-3 py-4">{leo.authorizedPerson}</td>
              <td className="border px-3 py-4">
                <button
                  className="space-x-2 rounded-md border bg-transparent p-1 px-2 text-sm text-green-600 hover:bg-sky-50"
                  aria-label="Edit"
                  onClick={() => navigate(`/leo/edit/${leo._id}`)}
                >
                  &#9998; Edit
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
    </>
  );
}
