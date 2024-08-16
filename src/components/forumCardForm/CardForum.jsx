import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function CardForum({ forums }) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const date = new Date(forums.updated_at);
    setFormattedDate(
      date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    );
  }, [forums.updated_at]);

  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => setIsExpanded(!isExpanded);

  return (
    <div className="card bg-white shadow rounded-lg hover:shadow-md transition-shadow duration-300 xl:w-[95%]">
      <Link to={`/createComment/${forums.id}`} className="block">
        <div className="flex items-center mb-3">
          <img
            src={
              forums.profileUser ||
              "https://cdna.artstation.com/p/assets/images/images/034/807/864/large/gil-lagziel-oggy-artstation1.jpg?1613299994"
            }
            alt="Avatar"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex flex-col ml-3">
            <p className="text-gray-600 font-semibold hover:text-indigo-600 font-suwannaphum text-[14px]">
              {forums.author}
            </p>
            <p className="text-gray-600 font-suwannaphum text-xs mt-1">
              {formattedDate}
            </p>
          </div>
        </div>
        <h2
          className="card-title"
          dangerouslySetInnerHTML={{ __html: forums.title || "No title" }}
        ></h2>
        <p
          className={`text-base text-gray-700 font-suwannaphum ${
            isExpanded ? "" : "line-clamp-2"
          }`}
          dangerouslySetInnerHTML={{
            __html: forums.description || "No description",
          }}
        ></p>
        <button
          onClick={handleToggle}
          className="mt-2 text-indigo-600 hover:underline focus:outline-none text-sm"
        >
          {isExpanded ? "See less" : "See more"}
        </button>
      </Link>
    </div>
  );
}
