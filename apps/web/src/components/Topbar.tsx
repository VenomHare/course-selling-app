import { Link } from "react-router-dom";
import { useState } from "react";

const Topbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="m-4 w-[95%] relative">
        <nav className="navbar rounded-box shadow-base-300/20 shadow-sm">
          <div className="navbar-start">
            <Link
              className="text-white link-neutral text-2xl font-bold no-underline"
              to="/dashboard"
            >
              VxCourses 
            </Link>
          </div>
          <div className="navbar-center max-md:hidden">
            <ul className="menu menu-horizontal gap-2 p-0 text-base rtl:ml-20">
              <li>
                <Link to="/courses">Courses</Link>
              </li>
              <li>
                <Link to="/purchased">Purchases</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end items-center gap-4">
            <button
              id="dropdown-default"
              type="button"
              className="dropdown-toggle btn btn-text btn-secondary btn-square md:hidden"
              aria-haspopup="menu"
              aria-expanded={isDropdownOpen}
              aria-label="Dropdown"
              onClick={toggleDropdown}
            >
              <span className={`icon-[tabler--menu-2] ${isDropdownOpen ? 'hidden' : 'block'} size-5`}></span>
              <span className={`icon-[tabler--x] ${isDropdownOpen ? 'block' : 'hidden'} size-5`}></span>
            </button>
            <Link className="btn btn-primary" to={"/login"} onClick={()=>{
              localStorage.removeItem("csr_admin_auth");
            }}>
              Logout
            </Link>
          </div>
        </nav>
        <ul
          className={`dropdown-menu absolute top-full left-0 w-full mt-2 ${isDropdownOpen ? 'opacity-100 block' : 'opacity-0 hidden'} bg-base-100 shadow-lg rounded-box z-50 md:hidden`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdown-default"
        >            
          <li>
            <Link className="dropdown-item" to="/courses">
              Courses
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/purchased">
              Purchases
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Topbar;
