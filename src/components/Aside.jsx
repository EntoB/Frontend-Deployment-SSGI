import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Sidebar({ user }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    function callBack(e) {
      if (e.code === "Escape") setIsOpen((isOpen) => !isOpen);
    }

    document.addEventListener("keydown", callBack);
    return () => document.removeEventListener("keydown", callBack);
  }, []);
  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="fixed left-4 top-4 rounded p-2 text-3xl hover:text-black"
      >
        {isOpen ? "" : "☰ "}
      </button>

      <aside
        className={`bg-gray-00 fixed left-0 top-0 h-full w-28 transform bg-sky-900 font-mono text-sm text-white shadow-lg transition-transform duration-300 xs:w-32 sm:w-40 md:w-52 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="grid grid-cols-2 items-center justify-between bg-sky-800 pb-6">
          <div className="flex min-h-fit items-center justify-center space-x-3 py-3">
            <img
              className="h-5 w-5 md:h-8 md:w-8"
              src=".\src\assets\small-logo.png"
              alt="SSGI img"
            />
            <h1 className="xl:text-3x mx-1 text-xs font-semibold text-yellow-500 xs:text-lg sm:text-xl md:text-2xl">
              SSGI
            </h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="ml-8 flex w-full justify-items-end text-2xl font-bold hover:text-red-500"
          >
            &times;
          </button>
        </div>
        <nav className="mt-4 p-4 font-semibold">
          <ul className="flex flex-col space-y-4">
            <li className="flex items-center rounded-md px-2 hover:bg-sky-800">
              <img
                className="h-5 w-5 md:h-8 md:w-8"
                src="./src/assets/dashboard.png"
                alt="dashboard"
              />
              <Link to="/dashboard" className="block rounded px-2 py-1">
                DashBoard
              </Link>
            </li>
            <li className="flex items-center rounded-md px-2 hover:bg-sky-800">
              <img
                className="h-5 w-5 md:h-8 md:w-8"
                src="./src/assets/home.png"
                alt="home"
              />
              <Link to="/" className="block rounded px-2 py-1">
                Home
              </Link>
            </li>
            <li className="flex items-center rounded-md px-2 hover:bg-sky-800">
              <img
                className="h-5 w-5 md:h-8 md:w-8"
                src="./src/assets/layer.png"
                alt="yourproject"
              />
              <Link to="yourProjects" className="block rounded px-2 py-1">
                Your &apos;s Projects
              </Link>
            </li>
            {user.role === "Admin" && (
              <>
                {" "}
                <li className="flex items-center rounded-md px-2 hover:bg-sky-800">
                  <img
                    className="h-5 w-5 md:h-8 md:w-8"
                    src="./src/assets/ssg.png"
                    alt="ssgi project"
                  />
                  <Link to="/allprojects" className="block rounded px-2 py-1">
                    SSGI Projects
                  </Link>
                </li>
                <li className="flex items-center hover:bg-sky-800">
                  <img
                    className="h-5 w-5 md:h-8 md:w-8"
                    src="./src/assets/leo.png"
                    alt="leo"
                  />
                  <Link to="/leo" className="block space-x-3 rounded px-3 py-1">
                    LEO
                  </Link>
                </li>
                <li className="flex items-center hover:bg-sky-800">
                  <img
                    className="h-5 w-5 md:h-8 md:w-8"
                    src="./src/assets/users.png"
                    alt="users"
                  />
                  <Link to="/users" className="block rounded px-2 py-1">
                    Users
                  </Link>
                </li>
                <li className="flex items-center hover:bg-sky-800">
                  <img
                    className="h-5 w-5 md:h-8 md:w-8"
                    src="./src/assets/bell.png"
                    alt="reminders"
                  />
                  <Link
                    to="/user/sendreminder"
                    className="block rounded px-2 py-1"
                  >
                    Reminders
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
