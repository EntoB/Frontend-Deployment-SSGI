import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProject({ isLogged }) {
  const { id } = useParams(); // Extract the Project ID from the URL parameters
  const navigate = useNavigate(); // Use navigate for redirection

  // Initial state
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
    taskStatus: "",
    pi: "", // Principal Investigator
    projectReports: [], // Initialize as empty array
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/project/getproject/${id}`
        );
        console.log("Fetched project data:", response.data);
        const {
          name,
          description,
          startDate,
          taskStatus,
          endDate,
          status,
          principalInvestigator,
          projectReports,
        } = response.data;

        setFormState({
          taskStatus,
          name,
          description,
          startDate: startDate.slice(0, 10), // Format date for input
          endDate: endDate.slice(0, 10), // Format date for input
          status,
          pi: principalInvestigator,
          projectReports: projectReports || [], // Use empty array if no reports
        });
      } catch (error) {
        console.error("Error fetching project:", error);
        setMessage(`Failed to fetch project details: ${error.message}`);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleReportChange = (index, e) => {
    const updatedReports = [...formState.projectReports];
    updatedReports[index].report = e.target.value;
    updatedReports[index].updatedAt = new Date().toISOString(); // Update timestamp
    setFormState((prevState) => ({
      ...prevState,
      projectReports: updatedReports,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/project/updateproject/${id}`,
        formState
      );
      console.log("Update response:", response.data);
      alert("Project updated successfully");
      navigate("/yourProjects"); // Redirect to the list page after successful update
    } catch (error) {
      console.error("Error updating project:", error);
      setMessage(`Failed to update project: ${error.message}`);
    }
  };

  useEffect(() => {
    if (!isLogged) navigate("/login");
  }, [isLogged, navigate]);

  // Helper function to format date to local time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div className="ml-40 mt-20 flex min-w-full justify-center p-5">
      <form
        onSubmit={handleSubmit}
        className="grid w-full max-w-2xl grid-cols-2 gap-2 rounded-lg bg-white p-8 shadow-md"
      >
        <h2 className="col-span-2 mb-6 text-center text-2xl font-bold">
          Edit Project
        </h2>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Project Name
          </label>
          <input
            type="text"
            id="name"
            value={formState.name}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Project Name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            value={formState.description}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Project Description"
            rows="2"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="startDate"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={formState.startDate}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
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
            id="taskStatus"
            className="m-3 rounded-md p-3"
            value={formState.taskStatus}
            onChange={handleChange}
            required
          >
            <option value="">Task Status</option>
            <option value="inprogress">Inprogress</option>
            <option value="completed">Completed</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="endDate"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={formState.endDate}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="status"
          >
            Status
          </label>
          <select
            id="status"
            value={formState.status}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value=" ">Project Status in %</option>
            {[...Array(21).keys()].map((i) => (
              <option key={i} value={i * 5}>
                {i * 5}%
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="pi"
          >
            Principal Investigator (PI)
          </label>
          <input
            type="text"
            id="pi"
            value={formState.pi}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Principal Investigator"
          />
        </div>

        <h2 className="col-span-2 mb-2 text-xl font-bold">Project Reports</h2>

        {formState.projectReports.length === 0 ? (
          <p>No reports found.</p>
        ) : (
          formState.projectReports.map((report, index) => (
            <div key={index} className="col-span-2 mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Report {index + 1} (Last updated: {formatDate(report.updatedAt)}
                )
              </label>
              <textarea
                value={report.report}
                onChange={(e) => handleReportChange(index, e)}
                className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>
          ))
        )}

        <div className="col-span-2 flex justify-center">
          <button
            type="submit"
            className="w-full max-w-xs rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
