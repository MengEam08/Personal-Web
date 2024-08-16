import React, { useEffect, useState } from "react";
import { fetchLessonById } from "../../services/fetchLessonById";
import { useParams } from "react-router-dom";
const LessonDetail = () => {
  const { id } = useParams();
  const bookId = decodeURIComponent(id);
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchlessonData = async () => {
      try {
        const bookData = await fetchLessonById(encodeURIComponent(bookId));
        setLesson(bookData);
      } catch (error) {
        console.error("Error fetching lesson data:", error);
      }
    };
    fetchlessonData();
  }, []);

  if (!lesson) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {" "}
      <section className="w-[90%] h-auto mx-auto mt-8 grid grid-cols-1 lg:grid-cols-[69%_29%] gap-[2%] font-suwannaphum">
      <div className="w-full max-w-[950px] bg-[#F5F5F5] rounded-xl mx-auto">
  {/* <h3 className="text-[24px] mt-10 font-semibold text-black">
    {lesson.lesson_title}
  </h3> */}

  {lesson.sections.flatMap((section) =>
    section.contents.map(
      (content) =>
        content.video_url &&
        (content.video_url.includes("youtube.com") ? (
          <div className="p-5 md:p-10 lg:p-10 mx-auto">
            <div className="text-[18px] md:text-[20px] lg:text-[20px] text-center font-bold mb-5">
              {content.video_title || "No Title"}
            </div>
            <iframe
              className="w-full h-[400px] md:h-[400px] lg:h-[400px] rounded-md mx-auto"
              src={`https://www.youtube.com/embed/${new URL(
                content.video_url
              ).searchParams.get("v")}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Video"
            ></iframe>
          </div>
        ) : null)
    )
  )}

  {/* <h3 className="p-8 text-center text-black ">ត្រីកោណប៉ុនគ្នា</h3> */}
</div>


        <div className=" bg-[#F5F5F5] p-5 md:p-8 rounded-lg">
          {lesson.sections.map((sections) => (
            <ul key={sections.id} className="leading-5">
              {" "}
              <li className="text-lg font-bold mt-5">
                {sections.title || "No Title"}
              </li>
            </ul>
          ))}

          <ul className="leading-8 pt-5">
            <li>ចំនួនកុំផ្លិច</li>
            <li>ភាពជាប់នៃអនុគមន៍</li>
            <li>អនុវត្តន៍ដេរីវេ</li>
            <li>ព្រីមីទីវនិងអាំងតេក្រាលមិនកំណត់</li>
            <li>អាំងតេក្រាលកំណត់</li>
            <li>អនុគមន៍អុិចស្ប៉ូណង់ស្យែល</li>
            <li>អនុគមន៍លោការីត</li>
            <li>អាំងតេក្រាលមិនកំណត់</li>
            <li>សមីការឌីផេរ៉ង់ស្យែល</li>
          </ul>
        </div>
      </section>
      <section className="mt-8 w-[90%] mx-auto h-auto bg-[#F5F5F5] p-4 font-suwannaphum rounded-lg">
        <ul>
          <li className="text-lg font-bold">អំពីមេរៀន</li>
          <li className="p-5">
            គណិតវិទ្យាថ្នាក់ទី១២ បង្រៀនដោយលោកគ្រូ ថុល ចាន់ថន ។
            នៅក្នុងវីដេអូមានលក្ខណៈកែលំហាត់ ហ្វឹកហាត់ ។
            សិស្សអាចធ្វើការស្វ័យសិក្សាតាមរយៈវីដេអូ ។របៀបរៀនតាមវីដេអូ៖ មើលវីដេអូ
            ហ្វឹកហាត់លំហាត់តាមរយៈឧទាហរណ៍ដែលបានដោះស្រាយ ។
          </li>
        </ul>
      </section>
    </>
  );
};

export default LessonDetail;
