import { useEffect, useState } from "react";

function Popup({ message, visible }) {
  const [isVisible, setIsVisible] = useState(visible);
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setIsVisible(false); // Hide the popup after 3 seconds
      }, 3000); // 3000ms = 3 seconds

      // Cleanup timer on unmount or when `visible` changes
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <div
      className={`fixed right-5 top-5 rounded-md bg-green-500 p-3 text-white shadow-md transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      style={{ zIndex: 1000 }}
    >
      {message}
    </div>
  );
}

export default Popup;
