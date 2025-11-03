import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Links to show
  const links = [
    { name: "Home", to: "/" },
    { name: "Courses", to: "/courses" },
    { name: "Certifications", to: "/certifications" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <nav className="bg-blue-600 px-6 py-4 flex justify-between items-center relative z-50">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-white">UpSkill</h1>

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

      {/* Hamburger Icon (mobile only) */}
      <div
        className="md:hidden text-white text-3xl cursor-pointer"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      >
        {isMobileMenuOpen ? <HiX /> : <HiMenu />}
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-blue-600 text-white flex flex-col gap-4 p-4 md:hidden shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 max-h-96"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            onClick={() => setIsMobileMenuOpen(false)} // close menu on click
            className={({ isActive }) =>
              isActive ? "underline block" : "hover:underline block"
            }
          >
            {link.name}
          </NavLink>
        ))}

        {isLoggedIn ? (
          <NavLink
            to="/profile"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition block"
          >
            Profile
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition block"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}
