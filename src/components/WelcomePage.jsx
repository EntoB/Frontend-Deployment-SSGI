import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Popup from "./Popup";

export default function WelcomePage() {
  const [projects, setProject] = useState([]);
  const [leo, setLeo] = useState([]);
  const location = useLocation();
  const { state } = location;

  async function fetchProjects() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/project/getprojects",
      );
      const data = response.data;
      setProject(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    async function fetchLeo() {
      const response = await axios.get("http://localhost:5000/api/leo/getleos");

      const data = response.data;
      setLeo(data);
    }
    fetchLeo();
  }, []);
  return (
    <div className="mt-[3.4rem] flex min-w-fit flex-col bg-sky-100">
      {state?.message && <Popup visible={true} message={state.message} />}

      <WelcomeNote />
      <Project projects={projects} leo={leo} />
    </div>
  );
}
function WelcomeNote() {
  return (
    <div className="flex flex-col items-center justify-around bg-blue-900 pr-4 text-blue-50 shadow-md shadow-stone-600 sm:h-48">
      <h1 className="pt-3 font-serif text-xs font-semibold sm:text-2xl md:text-3xl">
        SSGI Project Monitoring System
      </h1>
      <h2 className="text-sm sm:text-xl md:text-2xl">
        Experiance Excellence with SSGI&apos;s In-House Project Monitoring
        System.
      </h2>
      <Link
        to="/signup"
        className="round m-3 rounded-2xl bg-sky-800 px-3 py-2 text-center text-xs hover:bg-sky-700 xs:text-lg sm:w-52 sm:p-3 sm:text-xl"
      >
        Get Started
      </Link>
    </div>
  );
}

function Project({ projects, leo }) {
  const [selectedLeo, setSelectedLeo] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  useEffect(() => {
    async function fetchProjects(query) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/project/search?title=${query}`,
        );
        if (response.data.length === 0) {
          setErrorMessage("No projects found with the given title.");
          setFilteredProjects([]);
        } else {
          setFilteredProjects(response.data);
          setErrorMessage(""); // Clear any previous error message
        }
      } catch (error) {
        setErrorMessage("No result");
        console.log(error);
      }
    }

    if (searchTitle) {
      fetchProjects(searchTitle);
    } else {
      // Use the initial projects if no search title is provided
      setFilteredProjects(projects);
      setErrorMessage(""); // Clear any previous error message
    }
  }, [searchTitle, projects]);

  const handleSearchChange = (e) => {
    setSearchTitle(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleLeoChange = (e) => {
    setSelectedLeo(e.target.value);
    setCurrentPage(1); // Reset to the first page when changing the filter
  };

  const displayedProjects = selectedLeo
    ? filteredProjects.filter((proj) => proj.leo === selectedLeo)
    : filteredProjects;

  // Calculate the index of the first and last project for the current page
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = displayedProjects.slice(
    indexOfFirstProject,
    indexOfLastProject,
  );

  const totalPages = Math.ceil(displayedProjects.length / projectsPerPage);

  return (
    <div className="mt-6 flex flex-col items-center gap-2 border py-3">
      <div className="m mb-5 flex min-w-full justify-around rounded-md bg-sky-700 p-3">
        <div className="gap-2] flex flex-col gap-2">
          <input
            type="text"
            value={searchTitle}
            onChange={handleSearchChange}
            className="ml-10 w-max rounded-md p-2"
            placeholder="Search by title"
          />
          <span className="h-10 text-red-500">{errorMessage}</span>
        </div>
        <div className="flex h-full rounded-full bg-slate-50">
          <select
            name=""
            id=""
            className="w-72 rounded-full border-stone-500 p-2"
            value={selectedLeo}
            onChange={handleLeoChange}
          >
            <option value="">All Projects</option>
            {leo.map((l, index) => (
              <option key={index} value={l.leoName}>
                {l.leoName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {currentProjects.length ? (
        errorMessage ? (
          errorMessage
        ) : (
          <ul
            className={`grid w-max grid-cols-1 items-center justify-items-center gap-2 rounded-lg p-5 xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3`}
          >
            {currentProjects.map((proj, index) => (
              <ProjectList project={proj} key={index} />
            ))}
          </ul>
        )
      ) : (
        <p className="ml-20 bg-sky-50 p-7 text-2xl text-red-500">
          No project found for
          <span className="text-violet-800"> &ldquo;{selectedLeo} &ldquo;</span>
        </p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <span className="m-3">
        {currentPage} of {totalPages}
      </span>
    </div>
  );
}

function ProjectList({ project }) {
  const navigate = useNavigate();
  return (
    <li
      className={`grid h-40 w-60 items-center justify-center justify-items-center gap-1 rounded-md border bg-sky-50 p-3 py-5 text-center shadow-md`}
    >
      <h1 className="text-sm font-bold capitalize text-blue-500">
        {project.name}
      </h1>
      <p>
        {project.description.length > 10
          ? project.description.slice(0, 25) + "..."
          : project.description}
      </p>
      <button
        onClick={() => navigate(`/project/view/${project._id}`)}
        className="w-max justify-items-center rounded-md bg-blue-800 px-2 py-1 text-center text-xs text-blue-50 hover:bg-blue-700"
      >
        Read More
      </button>
    </li>
  );
}
