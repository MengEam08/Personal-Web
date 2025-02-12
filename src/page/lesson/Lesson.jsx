import React, { useState, useEffect } from "react";
import FooterCard from "../../components/footer/FooterCard";
import LessonAllCard from "../../components/lessonAllCard/LessonAllCard";
import Spinner from "../../components/appSpinner/Spinner";
import NavbarComponent from "../../components/navbar/NavbarComponent";

const categories = [
  "ទាំងអស់",
  "Google",
  "គណិតវិទ្យា",
  "វិទ្យាសាស្រ្តពិត",
  "វិទ្យាសាស្រ្តសង្គម",
  "ប្រវត្តវិទ្យា",
  "ជីវះវិទ្យា",
  "រូបវិទ្យា",
  "គីមីវិទ្យា",
  "បច្ចេកវិទ្យា",
  "អក្ខរកម្មឌីជីថល",
  "ទស្សនវិទ្យា",
  "ស្នេហា",
  "កម្រងវិញ្ញាសារ",
  "ផ្សេងៗទៀត",
];

const filterKeywords = {
  Google: ["google"],
  គណិតវិទ្យា: ["គណិតវិទ្យា", "math", "mathematics"],
  វិទ្យាសាស្រ្តពិត: ["វិទ្យាសាស្រ្តពិត", "វិទ្យាសាស្រ្ត", "science"],
  វិទ្យាសាស្រ្តសង្គម: ["វិទ្យាសាស្រ្តសង្គម", "វិទ្យាសាស្រ្ត", "science"],
  ប្រវត្តវិទ្យា: ["ប្រវត្តវិទ្យា", "history", "his", "ប្រវត្តិ"],
  ជីវះវិទ្យា: ["ជីវះវិទ្យា", "biology", "bio"],
  រូបវិទ្យា: ["រូបវិទ្យា", "physics", "phys"],
  គីមីវិទ្យា: ["គីមីវិទ្យា", "chemistry", "chem", "គ្រឹះនៃការសិក្សាគីមី"],
  បច្ចេកវិទ្យា: ["បច្ចេកវិទ្យា", "technology", "tech"],
  អក្ខរកម្មឌីជីថល: ["អក្ខរកម្មឌីជីថល", "digital literacy", "digital"],
  ទស្សនវិទ្យា: ["ទស្សនវិទ្យា", "philosophy", "psychology", "ចិត្តវិទ្យា"],
  ស្នេហា: ["love", "ស្នេហា", "សេច"],
  កម្រងវិញ្ញាសារ: ["exam preparation book", "វិញ្ញាសា", "ប្រឡង"],
  ផ្សេងៗទៀត: ["other", "ផ្សេងៗ"],
};

const Lesson = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("ទាំងអស់");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchLessons(1);
  }, []);

  const fetchLessons = (page) => {
    setIsLoading(true);
    fetch(`http://136.228.158.126:50001/api/lessons/?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
        setFilteredData(data.results); // Initialize filtered data
        setCurrentPage(page);
        setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 lessons per page
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching lessons:", error);
        setIsLoading(false);
      });
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    fetchLessons(pageNumber);
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    if (filter === "ទាំងអស់") {
      setFilteredData(data);
    } else {
      const keywords = filterKeywords[filter] || [filter.toLowerCase()];
      const filtered = data.filter((item) =>
        keywords.some((keyword) =>
          item.lesson_title.toLowerCase().includes(keyword)
        )
      );
      setFilteredData(filtered);
    }
  };

  return (
    <>
      <div className="bg-gray-100">
        <div className="ml-10 justify-center">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-2 py-1 sm:px-3 sm:py-2 md:px-3 md:py-2 lg:px-5 lg:py-3 xl:px-6 xl:py-3 rounded-full text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[15px] font-suwannaphum gap-1 mt-5 ${
                  activeFilter === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleFilterClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <section
            id="Projects"
            className="p-10 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-5"
          >
            {filteredData.length > 0 ? (
              filteredData.map((lesson) => (
                <LessonAllCard key={lesson.id} lesson={lesson} />
              ))
            ) : (
              <p>No lessons found</p>
            )}
          </section>
        )}

        <div className="flex justify-center mt-4">
          <div className="bg-white p-4 flex items-center flex-wrap">
            <button
              className="px-4 py-2 text-green-600 transition-colors duration-150 bg-white border border-r-0 border-green-600 rounded-l-lg focus:shadow-outline hover:bg-green-100"
              disabled={currentPage === 1 || isLoading}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 text-green-600 transition-colors duration-150 bg-white border border-r-0 border-green-600 focus:shadow-outline ${
                    currentPage === pageNumber ? "bg-green-100" : ""
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}
            <button
              className="px-4 py-2 text-green-600 transition-colors duration-150 bg-white border border-green-600 rounded-r-lg focus:shadow-outline hover:bg-green-100"
              disabled={currentPage === totalPages || isLoading}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
        <FooterCard />
      </div>
    </>
  );
};

export default Lesson;
