import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";

export default function AllProjects() {
  const [isLogged, setIsLogged] = useState(
    () => !!localStorage.getItem("token"),
  );

  const [isloading, setIsLoading] = useState(false);
  const [project, setProject] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(3); // Set the number of projects per page

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

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
      fetchProjects(); // Refresh the project list
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  async function fetchProjects() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/project/getprojects",
      );
      const data = response.data;
      setProject(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = project.slice(
    indexOfFirstProject,
    indexOfLastProject,
  );
  const totalPages = Math.ceil(project.length / projectsPerPage);

  if (!isLogged) navigate("/login");
  const printTable = () => {
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Print</title>");
    printWindow.document.write(
      "<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #ddd; padding: 8px; } th { background-color: #f2f2f2; } </style>",
    );
    printWindow.document.write("</head><body >");
    printWindow.document.write("<h1>SSGI Projects</h1>");
    printWindow.document.write("<table>");
    printWindow.document.write(
      "<thead><tr><th>#</th><th>Project Code</th><th>Title</th><th>Summary</th><th>LEO</th><th>Start date</th><th>Status (%)</th><th>End date</th></tr></thead>",
    );
    printWindow.document.write("<tbody>");
    project.forEach((pro, index) => {
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

  return (
    <div className="flex flex-col items-center justify-center mt-20 ml-52">
      {isloading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="m-3 text-2xl font-bold text-center text-teal-400">
            SSGI Projects
          </h1>
          <h2 className="m-3 text-xl font-bold text-center text-teal-400">
            All Projects
          </h2>
          <div className="flex justify-end w-full p-3">
            {project.length ? (
              <button
                className="px-3 py-1 rounded-md bg-sky-500 text-sky-50 hover:bg-sky-400"
                onClick={printTable}
              >
                Print
              </button>
            ) : (
              ""
            )}
          </div>
          {Array.isArray(project) && project.length ? (
            <>
              <table className="p-5 overflow-auto">
                <thead className="p-2">
                  <tr className="m-3">
                    <th className="p-1 border">#</th>
                    <th className="p-1 border">Project Code</th>
                    <th className="p-1 border">Title</th>
                    <th className="p-1 border">Summary</th>
                    <th className="p-1 border">LEO</th>
                    <th className="p-1 border">Start date</th>
                    <th className="p-1 border">Status (%)</th>
                    <th className="p-1 border">End date</th>
                    <th className="p-1 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProjects.map((pro, index) => (
                    <tr key={pro._id} className="mx-3">
                      <td className="px-3 py-4 border">
                        {indexOfFirstProject + index + 1}
                      </td>
                      <td className="px-1 py-4 border">{pro.projectCode}</td>
                      <td className="px-1 py-4 border">{pro.name}</td>
                      <td
                        className="px-1 py-4 border scroll-container"
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
                      <td className="px-1 py-4 border">{pro.leo}</td>
                      <td className="px-1 py-4 border">
                        {formatDate(pro.startDate)}
                      </td>
                      <td className="px-1 py-4 border">{pro.status}</td>
                      <td className="px-1 py-4 border">
                        {formatDate(pro.endDate)}
                      </td>
                      <td className="flex flex-wrap items-center justify-center px-3 py-4 space-x-3 border gap-y-2">
                        <button
                          className="p-1 text-sm text-red-600 bg-transparent border rounded-md hover:bg-sky-50"
                          aria-label="Delete"
                          onClick={() => handleDelete(pro._id)}
                        >
                          &#x1F5D1; Delete
                        </button>
                        <button
                          className="p-1 px-2 space-x-2 text-sm text-green-600 bg-transparent border rounded-md hover:bg-sky-50"
                          aria-label="Edit"
                          onClick={() => navigate(`/project/edit/${pro._id}`)}
                        >
                          &#9998; Edit
                        </button>
                        <button
                          className="p-1 px-2 space-x-2 text-sm text-green-600 bg-transparent border rounded-md hover:bg-sky-50"
                          aria-label="View"
                          onClick={() => navigate(`/project/view/${pro._id}`)}
                        >
                          &#128065; View
                        </button>
                        <button
                          className="p-1 px-2 space-x-2 text-sm text-green-600 bg-transparent border rounded-md hover:bg-sky-50"
                          aria-label="Add PDF"
                        >
                          &#128196; Add PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
              <span className="m-5">
                {" "}
                {currentPage} of {totalPages}
              </span>
            </>
          ) : (
            <span className="text-2xl text-red-600">No project found</span>
          )}
        </>
      )}
    </div>
  );
}
