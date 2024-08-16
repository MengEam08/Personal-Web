import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiLogoutBoxLine } from "react-icons/ri";
import Swal from "sweetalert2"; // Import SweetAlert2
import { AUTH_HEADER } from "../../services/constants";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [profile, setProfile] = useState(null);

  // Check if the user has an access token
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    setHasAccessToken(!!access_token); // Set hasAccessToken based on presence of access token

    if (access_token) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            "http://136.228.158.126:50001/api/profile/",
            {
              headers: {
                ...AUTH_HEADER,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const data = await response.json();
          setProfile(data);
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: data.username,
            })
          );
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
    }
  }, []);

  const handleNavigate = (path) => {
    if (!hasAccessToken) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to sign out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        localStorage.removeItem("access_token");
        delete AUTH_HEADER.Authorization;
        setHasAccessToken(false); // Update state on sign out
        await Swal.fire(
          "Signed Out!",
          "You have been successfully signed out.",
          "success"
        );
        navigate("/login");
      } catch (error) {
        await Swal.fire(
          "Error!",
          "There was an error signing you out. Please try again.",
          "error"
        );
        console.error(error);
      }
    }
  };

  if (!profile && hasAccessToken) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="w-full bg-[#16A1DF] sticky top-0 z-50">
      <Navbar fluid rounded className="bg-[#16A1DF] w-[95%] mx-auto">
        <Navbar.Brand>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            <Link to="/">
              <img
                className="md:w-[100px] md:h-[60px] object-cover"
                src="../src/assets/STEM_TOTUR.jpg"
                alt="STEM Logo"
              />
            </Link>
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 items-center space-x-4">
          {!hasAccessToken && (
            <Link to="/login" className="hidden sm:block">
              <Button className="border-1 hover:bg-blue-500 text-white font-suwannaphum">
                ចូលគណនី
              </Button>
            </Link>
          )}
          {hasAccessToken && profile && (
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" img={profile.image} rounded />}
            >
              <Dropdown.Header className="font-suwannaphum text-md">
                User Actions
              </Dropdown.Header>
              <Dropdown.Item onClick={() => handleNavigate("/dashboard")}>
                <LuLayoutDashboard className="m-3 text-blue-600" />
                <span className="font-suwannaphum">Dashboard</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>
                <RiLogoutBoxLine className="m-3 text-blue-600" />
                <span>Sign Out</span>
              </Dropdown.Item>
            </Dropdown>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <NavLink
            to="/book"
            className={({ isActive }) =>
              `font-suwannaphum text-md px-4 md:text-2xl font-normal text-white ${
                isActive ? "bg-cyan-400  md:text-[#FF9900] md:bg-[#16A1DF]" : ""
              }`
            }
          >
            សៀវភៅ
          </NavLink>
          <NavLink
            to="/lesson"
            className={({ isActive }) =>
              `font-suwannaphum text-xl px-4 md:px-0 md:text-2xl font-medium text-white ${
                isActive ? "bg-cyan-400  md:text-[#FF9900] md:bg-[#16A1DF]" : ""
              }`
            }
          >
            មេរៀន
          </NavLink>
          <NavLink
            to="/forum"
            className={({ isActive }) =>
              `font-suwannaphum text-xl px-4 md:px-0 md:text-2xl font-medium text-white ${
                isActive ? "bg-cyan-400  md:text-[#FF9900] md:bg-[#16A1DF]" : ""
              }`
            }
          >
            វេទិកា
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `font-suwannaphum text-xl px-4 md:px-0 md:text-2xl font-medium text-white ${
                isActive ? "bg-cyan-400  md:text-[#FF9900] md:bg-[#16A1DF]" : ""
              }`
            }
          >
            ប្លុក
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `font-suwannaphum text-xl px-4 md:px-0 md:text-2xl font-medium text-white ${
                isActive ? "bg-cyan-400  md:text-[#FF9900] md:bg-[#16A1DF]" : ""
              }`
            }
          >
            អំពីយើង
          </NavLink>
        </Navbar.Collapse>
      </Navbar>
    </nav>
  );
};

export default NavbarComponent;
