import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ViewProject() {
  const [isLogged, setIsLogged] = useState(() => {
    const found = localStorage.getItem("token");
    return !!found;
  });
  console.log(setIsLogged);
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [newReport, setNewReport] = useState("");
  const [showReportInput, setShowReportInput] = useState(false);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  const formatDateWithTime = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString(undefined, options);
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/project/getproject/${id}`,
        );
        setProject(response.data);
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        alert(error.response ? error.response.data.message : error.message);
      }
    };

    fetchProject();
  }, [id, navigate]);

  const handleAddReport = async () => {
    if (newReport.trim()) {
      const updatedReports = [
        ...project.projectReports,
        {
          report: newReport,
          createdAt: new Date().toISOString(),
        },
      ];

      try {
        await axios.put(
          `http://localhost:5000/api/project/updateproject/${id}`,
          { projectReports: updatedReports },
        );

        setProject((prevProject) => ({
          ...prevProject,
          projectReports: updatedReports,
        }));
        setNewReport("");
        setShowReportInput(false);
        alert("New report added successfully");
      } catch (error) {
        console.error(error);
        alert("Failed to add new report.");
      }
    } else {
      alert("Please enter a report before submitting.");
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ml-52 mt-12 flex flex-col gap-4 bg-sky-50 py-6">
      <div className="h-max w-full">
        <img
          src="/src/assets/projec-logs.png"
          className="h-40 w-full object-cover shadow-lg"
          alt="big logo"
        />
      </div>
      <div className="txet-sm flex w-full p-3 shadow-md">
        <table className="overflow- w-full p-8">
          <thead className="p-2">
            <tr className="m-3">
              <th className="p-3 text-xl text-green-700">Title</th>
              <th className="p-3 text-xl text-green-700">Summary</th>
              <th className="p-3 text-xl text-green-700">Start date</th>
              <th className="p-3 text-xl text-green-700">Status (%)</th>
              <th className="p-3 text-xl text-green-700">End date</th>
              <th className="p-3 text-xl text-green-700">PI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center text-xl text-sky-600">
                {project.name}
              </td>
              <td className="text-center text-xl text-sky-600">
                {project.description}
              </td>
              <td className="text-center text-xl text-sky-600">
                {formatDate(project.startDate)}
              </td>
              <td className="text-center text-xl text-sky-600">
                {project.status}
              </td>
              <td className="text-center text-xl text-sky-600">
                {formatDate(project.endDate)}
              </td>
              <td className="text-center text-xl text-sky-600">
                {project.principalInvestigator}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-center font-sans text-2xl font-semibold text-sky-500">
          Project Reports
        </h1>
        <div className="flex h-96 w-[50rem] flex-col items-center gap-1 overflow-y-auto rounded-md bg-sky-100 p-3">
          {project.projectReports.length ? (
            project.projectReports.map((pro, index) => (
              <div key={index} className="w-full p-5 text-center">
                <h1 className="text-2xl text-sky-400"> Report #{index + 1}</h1>
                <p className="text-justify">{pro.report}</p>
                <span>⏰ {formatDateWithTime(pro.createdAt)}</span>
              </div>
            ))
          ) : (
            <p>No project report found</p>
          )}
        </div>
        {isLogged && (
          <button
            onClick={() => setShowReportInput(!showReportInput)}
            className="mt-4 rounded-lg border border-blue-500 bg-transparent px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Add New Report
          </button>
        )}
        {showReportInput && (
          <div className="mt-4 w-[50rem]">
            <textarea
              value={newReport}
              onChange={(e) => setNewReport(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your report here..."
              rows="4"
            />
            <button
              onClick={handleAddReport}
              className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            >
              Submit Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
