import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo text-2xl font-bold text-white">UpSkill</h1> {/* logo color unchanged */}
      <ul className="nav-links flex gap-6">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/courses" className={({ isActive }) => isActive ? "active" : ""}>
            Courses
          </NavLink>
        </li>
        <li>
          <NavLink to="/certifications" className={({ isActive }) => isActive ? "active" : ""}>
            Certifications
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
