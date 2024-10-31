import { useState } from "react";
import { Link } from "react-router-dom";
const Dropdown = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex h-16 w-16 justify-center">
        <button
          type="button"
          className="flex max-h-full min-h-full items-center justify-center rounded-full text-sm font-medium text-gray-700 shadow-sm focus:outline-none"
          onClick={toggleDropdown}
        >
          <img
            src="./src/assets/profile.png"
            alt="User Profile"
            className="max-h-14 min-w-14 rounded-full border-2 bg-gray-50 p-[1px]"
          />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute left-2 right-0 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={() => setIsOpen(false)}

            >
              Profile
            </Link>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
