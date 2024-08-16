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
                className="w-[80px] h-[50px] md:w-[100px] md:h-[60px] object-cover"
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

// import { useEffect, useState } from "react";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
// import { LuLayoutDashboard } from "react-icons/lu";
// import { RiLogoutBoxLine } from "react-icons/ri";
// import Swal from "sweetalert2"; // Import SweetAlert2
// import { AUTH_HEADER } from "../../services/constants";

// const NavbarComponent = () => {
//   const navigate = useNavigate();
//   const [hasAccessToken, setHasAccessToken] = useState(false);
//   const [profile, setProfile] = useState(null);
//   const [searchTerm, setSearchTerm] = useState(""); // Search term state
//   const [searchResults, setSearchResults] = useState([]); // Search results state

//   // Check if the user has an access token
//   useEffect(() => {
//     const access_token = localStorage.getItem("access_token");
//     setHasAccessToken(!!access_token); // Set hasAccessToken based on presence of access token

//     if (access_token) {
//       const fetchProfile = async () => {
//         try {
//           const response = await fetch(
//             "http://136.228.158.126:50001/api/profile/",
//             {
//               headers: {
//                 ...AUTH_HEADER,
//                 "Content-Type": "multipart/form-data",
//               },
//             }
//           );
//           const data = await response.json();
//           setProfile(data);
//           localStorage.setItem(
//             "user",
//             JSON.stringify({
//               name: data.username,
//             })
//           );
//         } catch (error) {
//           console.error("Error fetching profile:", error);
//         }
//       };

//       fetchProfile();
//     }
//   }, []);

//   const handleNavigate = (path) => {
//     if (!hasAccessToken) {
//       navigate("/login");
//     } else {
//       navigate(path);
//     }
//   };

//   const handleSignOut = async () => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you really want to sign out?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, sign out!",
//       cancelButtonText: "No, cancel",
//     });

//     if (result.isConfirmed) {
//       try {
//         localStorage.removeItem("access_token");
//         delete AUTH_HEADER.Authorization;
//         setHasAccessToken(false); // Update state on sign out
//         await Swal.fire(
//           "Signed Out!",
//           "You have been successfully signed out.",
//           "success"
//         );
//         navigate("/login");
//       } catch (error) {
//         await Swal.fire(
//           "Error!",
//           "There was an error signing you out. Please try again.",
//           "error"
//         );
//         console.error(error);
//       }
//     }
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       try {
//         const [blogsResponse, booksResponse, lessonsResponse, forumsResponse] =
//           await Promise.all([
//             fetch(
//               `http://136.228.158.126:50001/api/articles/?search=${searchTerm}`,
//               {
//                 headers: {
//                   ...AUTH_HEADER,
//                   "Content-Type": "application/json",
//                 },
//               }
//             ),
//             fetch(
//               `http://136.228.158.126:50001/api/courses/?search=${searchTerm}`,
//               {
//                 headers: {
//                   ...AUTH_HEADER,
//                   "Content-Type": "application/json",
//                 },
//               }
//             ),
//             fetch(
//               `http://136.228.158.126:50001/api/lessons/?search=${searchTerm}`,
//               {
//                 headers: {
//                   ...AUTH_HEADER,
//                   "Content-Type": "application/json",
//                 },
//               }
//             ),
//             fetch(
//               `http://136.228.158.126:50001/api/forums/?search=${searchTerm}`,
//               {
//                 headers: {
//                   ...AUTH_HEADER,
//                   "Content-Type": "application/json",
//                 },
//               }
//             ),
//           ]);

//         const [blogs, books, lessons, forums] = await Promise.all([
//           blogsResponse.json(),
//           booksResponse.json(),
//           lessonsResponse.json(),
//           forumsResponse.json(),
//         ]);

//         // Combine results from all APIs
//         const combinedResults = [
//           ...blogs.results.map((item) => ({ ...item, type: "blog" })),
//           ...books.results.map((item) => ({ ...item, type: "book" })),
//           ...lessons.results.map((item) => ({ ...item, type: "lesson" })),
//           ...forums.results.map((item) => ({ ...item, type: "forum" })),
//         ];

//         // Filter results to show only those that match the beginning of the search term
//         const filteredResults = combinedResults.filter((result) =>
//           result.title.toLowerCase().startsWith(searchTerm.toLowerCase())
//         );

//         setSearchResults(filteredResults);
//       } catch (error) {
//         console.error("Error searching:", error);
//       }
//     }
//   };

//   const handleResultClick = (id, type) => {
//     switch (type) {
//       case "blog":
//         navigate(`/blogDetail/${id}`);
//         break;
//       case "book":
//         navigate(`/bookDetail/${id}`);
//         break;
//       case "lesson":
//         navigate(`/lessonDetail/${id}`);
//         break;
//       case "forum":
//         navigate(`/forumDetail/${id}`);
//         break;
//       default:
//         break;
//     }
//     setSearchResults([]); // Clear search results after navigating
//   };

//   if (!profile && hasAccessToken) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <nav className="w-full bg-[#16A1DF] sticky top-0 z-50">
//       <Navbar fluid rounded className="bg-[#16A1DF]">
//         <Navbar.Brand>
//           <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
//             <Link to="/">
//               <img
//                 className="w-[80px] h-[50px] md:w-[100px] md:h-[60px] object-cover"
//                 src="../src/assets/STEM_LOGO_TUTOR.png"
//                 alt="STEM Logo"
//               />
//             </Link>
//           </span>
//         </Navbar.Brand>
//         <div className="flex md:order-2 items-center space-x-4">
//           {/* Search Input */}
//           <form onSubmit={handleSearch} className="relative">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="px-4 py-2 rounded-md"
//               placeholder="Search books, blogs, forums..."
//             />
//             <button
//               type="submit"
//               className="absolute right-0 top-0 h-full px-4 text-white bg-blue-500 rounded-r-md"
//             >
//               Search
//             </button>
//             {searchResults.length > 0 && (
//               <div className="absolute bg-white shadow-md rounded-md w-full mt-1 z-10">
//                 {searchResults.map((result) => (
//                   <div
//                     key={result.id}
//                     className="p-2 cursor-pointer hover:bg-gray-200"
//                     onClick={() => handleResultClick(result.id, result.type)}
//                   >
//                     {result.title} ({result.type})
//                   </div>
//                 ))}
//               </div>
//             )}
//           </form>
//           {!hasAccessToken && (
//             <Link to="/login" className="hidden sm:block">
//               <Button className="border-1 hover:bg-blue-500 text-white font-suwannaphum">
//                 ចូលគណនី
//               </Button>
//             </Link>
//           )}
//           {hasAccessToken && profile && (
//             <Dropdown
//               arrowIcon={false}
//               inline
//               label={<Avatar alt="User settings" img={profile.image} rounded />}
//             >
//               <Dropdown.Header className="font-suwannaphum text-sm">
//                 User Actions
//               </Dropdown.Header>
//               <Dropdown.Item onClick={() => handleNavigate("/dashboard")}>
//                 <LuLayoutDashboard className="m-3 text-blue-600" />
//                 <span className="font-suwannaphum">Dashboard</span>
//               </Dropdown.Item>
//               <Dropdown.Divider />
//               <Dropdown.Item onClick={handleSignOut}>
//                 <RiLogoutBoxLine className="m-3 text-blue-600" />
//                 <span>Sign Out</span>
//               </Dropdown.Item>
//             </Dropdown>
//           )}
//           <Navbar.Toggle />
//         </div>
//         <Navbar.Collapse>
//           <NavLink
//             to="/book"
//             className={({ isActive }) =>
//               `font-suwannaphum text-xl px-4 md:text-2xl font-medium text-white ${
//                 isActive ? "bg-cyan-400  md:text-[#FF9900] md:bg-[#16A1DF]" : ""
//               }`
//             }
//           >
//             សៀវភៅ
//           </NavLink>
//           <NavLink
//             to="/lesson"
//             className={({ isActive }) =>
//               `font-suwannaphum text-xl px-4 md:px-0 md:text-2xl font-medium text-white ${
//                 isActive ? "bg-cyan-400  md:text-[#FF9900] md:bg-[#16A1DF]" : ""
//               }`
//             }
//           >
//             មេរៀន
//           </NavLink>
//           <NavLink
//             to="/forum"
//             className={({ isActive }) =>
//               `font-suwannaphum text-xl px-4 md:px-0 md:text-2xl font-medium text-white ${
//                 isActive ? "bg-cyan-400  md:text-[#FF9900] md:bg-[#16A1DF]" : ""
//               }`
//             }
//           >
//             វេទិកា
//           </NavLink>
//           <NavLink
//             to="/blog"
//             className={({ isActive }) =>
//               `font-suwannaphum text-xl px-4 md:px-0 md:text-2xl font-medium text-white ${
//                 isActive ? "bg-cyan-400  md:text-[#FF9900] md:bg-[#16A1DF]" : ""
//               }`
//             }
//           >
//             ប្លុក
//           </NavLink>
//           <NavLink
//             to="/about-us"
//             className={({ isActive }) =>
//               `font-suwannaphum text-xl px-4 md:px-0 md:text-2xl font-medium text-white ${
//                 isActive ? "bg-cyan-400  md:text-[#FF9900] md:bg-[#16A1DF]" : ""
//               }`
//             }
//           >
//             អំពីយើង
//           </NavLink>
//         </Navbar.Collapse>
//       </Navbar>
//     </nav>
//   );
// };

// export default NavbarComponent;
