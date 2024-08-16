import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { LuLayoutDashboard } from "react-icons/lu";
import { GrArticle } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { AUTH_HEADER } from "../../services/constants";
import Background from "../../components/background/Background";
import BookCard from "../../components/bookCard/BookCard";
import FooterCard from "../../components/footer/FooterCard";
import LessonCard from "../../components/lessonCard/LessonCard";
import BlogCard from "../../components/blogCard/BlogCard";
import ForumCard from "../../components/forumCard/ForumCard";
import NavbarComponent from "../../components/navbar/NavbarComponent";
import GeminiChat from "../../components/gemini/gemini";

const Home = () => {
  const navigate = useNavigate();
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const handleNavigate = (path) => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };
  const handleSignOut = () => {
    try {
      localStorage.removeItem("access_token");
      delete AUTH_HEADER.Authorization;
      alert("You have been successfully signed out.");
      navigate("/login");
    } catch (error) {
      alert("There was an error signing you out. Please try again.");
      console.error(error);
    }
  };
  return (
    <div className="w-full h-auto mx-auto bg-gray-100">
      <Background />
      <section className="mt-[10px] m-3">
        <BookCard />
      </section>
      <section className="mt-[10px]">
        <LessonCard />
      </section>
      <section className="mt-[10px]">
        <ForumCard />
      </section>
      {/* gemini chat AI */}
      <GeminiChat className=" absolute left-0 top-3 " />
      <section className="mt-[10px] ">
        <BlogCard />
      </section>
      <FooterCard />
    </div>
  );
};

export default Home;
