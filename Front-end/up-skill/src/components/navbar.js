import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // hamburger icons

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if JWT token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Menu links array for easier mapping
  const links = [
    { name: "Home", to: "/" },
    { name: "Courses", to: "/courses" },
    { name: "Certifications", to: "/certifications" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <nav className="bg-blue-600 px-6 py-4 flex justify-between items-center relative">
      <h1 className="logo text-2xl font-bold text-white">UpSkill</h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 items-center text-white">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end
              className={({ isActive }) =>
                isActive ? "underline" : "hover:underline"
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}

        <li>
          {isLoggedIn ? (
            <NavLink
              to="/profile"
              className="ml-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Profile
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="ml-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Login
            </NavLink>
          )}
        </li>
      </ul>

      {/* Hamburger Icon */}
      <div className="md:hidden text-white text-2xl cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <HiX /> : <HiMenu />}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="absolute top-full left-0 w-full bg-blue-600 flex flex-col gap-4 p-4 md:hidden text-white">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end
                className={({ isActive }) =>
                  isActive ? "underline block" : "hover:underline block"
                }
                onClick={() => setIsMobileMenuOpen(false)} // close menu on click
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          <li>
            {isLoggedIn ? (
              <NavLink
                to="/profile"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
}
