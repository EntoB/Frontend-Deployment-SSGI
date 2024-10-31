
export function Drawer({ isOpen, toggleDrawer }) {
  return (
    <div
      className={`fixed left-0 top-0 z-40 h-screen w-48 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }  shadow-md`}
      tabIndex="-1"
      aria-labelledby="drawer-label"
    >
      <h5
        id="drawer-label"
        className="text-base font-semibold uppercase text-gray-500 dark:text-gray-400"
      >
        Menu
      </h5>
      <button
        type="button"
        onClick={toggleDrawer}
        aria-controls="drawer-label"
        className="absolute end-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          className="h-3 w-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
          />
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <div className="overflow-y-auto py-4">
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <span>Profile</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
