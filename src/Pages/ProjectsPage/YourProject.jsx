import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Pagination from "../../components/Pagination";

export default function YourProject({ isLogged }) {
  const [showForm, setShowForm] = useState(false);
  const [storedLeo, setStoredLeo] = useState([]);
  const [formData, setFormData] = useState({
    projectCode: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: 0,
    budget: "",
    attachments: "",
    projectReports: [],
    principalInvestigator: "",
    leo: "",
    teamMembers: "",
    taskStatus: "",
  });
  const [projectList, setProjectList] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please sign in again.");
      return;
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const dataToSend = {
      ...formData,
      budget: parseFloat(formData.budget),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/project/createproject",
        dataToSend,
        { headers },
      );
      alert("Project created successfully");
      navigate("/"); // Redirect or handle successful submission
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  useEffect(() => {
    async function fetchLeo() {
      try {
        const resp = await axios.get("http://localhost:5000/api/leo/getleos");
        setStoredLeo(resp.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchLeo();
  }, []);

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  const printTable = () => {
    const printWindow = window.open("", "", "height=600,width=1000");
    printWindow.document.write("<html><head><title>Print</title>");
    printWindow.document.write(
      "<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #ddd; padding: 8px; } th { background-color: #f2f2f2; } </style>",
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write("<h1>SSGI Projects</h1>");
    printWindow.document.write("<table>");
    printWindow.document.write(
      "<thead><tr><th>#</th><th>Project Code</th><th>Title</th><th>Summary</th><th>LEO</th><th>Start date</th><th>Status (%)</th><th>End date</th></tr></thead>",
    );
    printWindow.document.write("<tbody>");
    projectList.forEach((pro, index) => {
      printWindow.document.write(
        `<tr><td>${index + 1}</td><td>${pro.projectCode}</td><td>${pro.name}</td><td>${pro.description}</td><td>${pro.leo}</td><td>${formatDate(pro.startDate)}</td><td>${pro.status}</td><td>${formatDate(pro.endDate)}</td></tr>`,
      );
    });
    printWindow.document.write("</tbody></table>");
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  return (
    <div className="mt-20 grid grid-cols-2 grid-rows-[10rem_fr] justify-items-center p-4 sm:ml-36 lg:ml-48">
      <div className="col-span-2 w-full space-y-3 text-center">
        <h1 className="text-2xl font-bold text-orange-500">Your Project</h1>
        <p className="col-span-2 mb-4 text-xl text-green-500">
          List of Your Projects
        </p>
        <div className="flex flex-col items-end">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex h-10 items-center justify-center gap-3 bg-transparent px-4 py-2 text-black"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-black p-2 text-xl text-white">
              {showForm ? " -" : "+"}
            </span>
            {showForm ? " Collapse form" : "Add project"}
          </button>
          <button
            onClick={printTable}
            className="rounded-md bg-sky-500 px-3 py-1 text-sky-50 hover:bg-sky-400"
          >
            Print
          </button>
        </div>
      </div>
      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="col-span-2 grid grid-cols-2 items-center gap-x-2 rounded-lg bg-white p-6 shadow-lg"
        >
          <div className="mb-2">
            <label
              htmlFor="projectCode"
              className="block text-sm font-medium text-gray-700"
            >
              Project Code
            </label>
            <input
              type="text"
              id="projectCode"
              name="projectCode"
              value={formData.projectCode}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block p-1 text-sm font-medium text-gray-700"
            >
              Project Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status (%)
            </label>
            <input
              type="number"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              min="0"
              max="100"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-gray-700"
            >
              Budget (ETB)
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="attachments"
              className="block text-sm font-medium text-gray-700"
            >
              Attachments (comma-separated file names)
            </label>
            <input
              type="text"
              id="attachments"
              name="attachments"
              value={formData.attachments}
              onChange={handleArrayChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="design-mockup.pdf, wireframe.jpg"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="projectReports"
              className="block text-sm font-medium text-gray-700"
            >
              Project Reports
            </label>
            <textarea
              id="projectReports"
              name="projectReports"
              value={formData.projectReports}
              onChange={handleArrayChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              rows="3"
              placeholder="Initial design meeting complete."
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="principalInvestigator"
              className="block text-sm font-medium text-gray-700"
            >
              Principal Investigator (PI)
            </label>
            <input
              type="text"
              id="principalInvestigator"
              name="principalInvestigator"
              value={formData.principalInvestigator}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="leo"
              className="block text-sm font-medium text-gray-700"
            >
              LEO
            </label>
            <select
              id="leo"
              name="leo"
              value={formData.leo || ""}
              onChange={handleInputChange}
              className="mt-1 block w-max rounded-md border-gray-300 px-3 py-1 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            >
              <option value="">Select LEO</option>
              {storedLeo.map((leo) => (
                <option key={leo._id} value={leo.leoName}>
                  {leo.leoName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="teamMembers"
              className="block text-sm font-medium text-gray-700"
            >
              Team Members (comma-separated )
            </label>
            <input
              type="text"
              id="teamMembers"
              name="teamMembers"
              value={formData.teamMembers}
              onChange={handleArrayChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="John,Micheal"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="taskStatus"
              className="block text-sm font-medium text-gray-700"
            >
              Task Status
            </label>

            <select
              name="taskStatus"
              className="m-3 rounded-md p-3"
              value={formData.taskStatus}
              onChange={handleInputChange}
            >
              <option value="">Task Status</option>
              <option value="inprogress">Inprogress</option>
              <option value="completed">Completed</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <button
            type="submit"
            className="col-span-2 rounded-md bg-green-500 px-4 py-2 text-center text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit
          </button>
        </form>
      ) : (
        <ProjectList setProjectList={setProjectList} />
      )}
    </div>
  );
}

function ProjectList({ setProjectList }) {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(3);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const userToken = localStorage.getItem("token");
      if (userToken) {
        const decodedToken = jwtDecode(userToken);
        const userId = decodedToken.id;

        const response = await axios.get(
          `http://localhost:5000/api/project/getbycreator/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          },
        );
        setProjects(response.data);
        setProjectList(response.data); // Update project list in parent
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (projectId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please sign in again.");
      return;
    }
    try {
      await axios.delete(
        `http://localhost:5000/api/project/deleteproject/${projectId}`,
      );
      alert("Project deleted successfully");
      fetchData(); // Refresh the project list
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject,
  );

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="col-span-2 mt-3 flex flex-col items-center gap-6 text-xs">
      {!projects.length ? (
        <p className="text-2xl text-red-500">No project found</p>
      ) : (
        <>
          <table className="overflow-auto">
            <thead className="p-2">
              <tr className="m-3">
                <th className="border p-1">#</th>
                <th className="border p-1">Project Code</th>
                <th className="border p-1">Title</th>
                <th className="border p-1">Summary</th>
                <th className="border p-1">LEO</th>
                <th className="border p-1">Start date</th>
                <th className="border p-1">Status (%)</th>
                <th className="border p-1">End date</th>
                <th className="border p-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((pro, index) => (
                <tr key={pro._id} className="mx-3">
                  <td className="border px-3 py-4">
                    {index + 1 + indexOfFirstProject}
                  </td>
                  <td className="border px-1 py-4">{pro.projectCode}</td>
                  <td className="border px-1 py-4">{pro.name}</td>
                  <td
                    className="scroll-container border px-1 py-4"
                    style={{
                      width: "150px",
                      maxWidth: "150px", // Ensures the content doesn't exceed 150px
                      overflowX: "auto", // Allows horizontal scrolling if content exceeds the width
                      whiteSpace: "nowrap", // Prevents text wrapping to new lines
                      textOverflow: "ellipsis", // Adds '...' if the text overflows
                    }}
                  >
                    {pro.description}
                  </td>

                  <td className="max-w-2xs scroll-container overflow-y-auto whitespace-nowrap border px-1 scrollbar-track-green-400">
                    {pro.leo}
                  </td>
                  <td className="border px-1 py-4">
                    {formatDate(pro.startDate)}
                  </td>
                  <td className="border px-1 py-4">{pro.status}</td>
                  <td className="border px-1 py-4">
                    {formatDate(pro.endDate)}
                  </td>
                  <td className="flex flex-wrap justify-center gap-2 border px-1 py-4">
                    <button
                      className="rounded-md border bg-transparent p-1 text-sm text-red-600 hover:bg-sky-50"
                      aria-label="Delete"
                      onClick={() => handleDelete(pro._id)}
                    >
                      &#x1F5D1; Delete
                    </button>
                    <button
                      className="space-x-2 rounded-md border bg-transparent p-1 px-2 text-sm text-green-600 hover:bg-sky-50"
                      aria-label="Edit"
                      onClick={() => navigate(`/project/edit/${pro._id}`)}
                    >
                      &#9998; Edit
                    </button>
                    <button
                      className="space-x-2 rounded-md border bg-transparent p-1 px-2 text-sm text-green-600 hover:bg-sky-50"
                      aria-label="View"
                      onClick={() => navigate(`/project/view/${pro._id}`)}
                    >
                      &#128065; View
                    </button>
                    <button
                      className="space-x-2 rounded-md border bg-transparent p-1 px-2 text-sm text-green-600 hover:bg-sky-50"
                      aria-label="Add PDF"
                    >
                      &#128196; Add PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Use Pagination component here */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
