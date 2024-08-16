import { useEffect, useState, useRef } from "react";
import { Button, Label, Textarea } from "flowbite-react";
import { useParams } from "react-router-dom";
import { fetchForumByid } from "../../services/fetchForumByid";
import FooterCard from "../footer/FooterCard";
import ReplyCard from "../rpCrad/ReplyCard";
import axios from "axios";
import { AUTH_HEADER } from "../../services/constants";

const CreateComment = () => {
  const { id } = useParams();
  const bookId = decodeURIComponent(id);
  const [forum, setForum] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const replyFormRef = useRef(null);

  const [formData, setFormData] = useState({
    forum_id: id,
    content: "",
  });

  useEffect(() => {
    const fetchForumData = async () => {
      try {
        const bookData = await fetchForumByid(encodeURIComponent(bookId));
        setForum(bookData);
        const date = new Date(bookData.updated_at);
        setFormattedDate(
          date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })
        );
      } catch (error) {
        console.error("Error fetching forums data:", error);
      }
    };

    fetchForumData();
  }, [bookId]);

  const handleReplyClick = () => {
    setShowReplyForm(true);
    replyFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReplyTextChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://136.228.158.126:50001/api/comments/",
        {
          forum_id: id,
          content: replyText,
        },
        {
          headers: {
            ...AUTH_HEADER,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        setReplyText("");
        setShowReplyForm(false);
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://136.228.158.126:50001/api/comments/",
        formData,
        {
          headers: {
            ...AUTH_HEADER,
            "Content-Type": "application/json",
          },
        }
      );
      location.reload();
    } catch (error) {
      console.error(
        `Error creating post: ${error.response.status} - ${error.response.data}`
      );
    }
  };

  const handleFormDataChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  if (!forum) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className="max-w-screen-xl mx-auto mt-10 px-4 sm:px-0">
        <div className="w-full max-w-screen-lg mx-auto h-auto relative bg-white rounded-xl border border-black/30 p-5 sm:p-8 flex flex-col sm:flex-row sm:items-center">
          <div className="sm:flex-1">
            <h1 className="text-zinc-800 text-2xl sm:text-3xl font-semibold font-suwannaphum mb-3">
              ចូលរួមជាមួយយើងដើម្បីបង្កើតសហគមន៍សិក្សា
            </h1>
            <p className="text-zinc-800 text-base sm:text-lg font-normal font-suwannaphum">
              រីករាយក្នុងការសួរ
              និងឆ្លើយសំណួរទាក់ទងនឹងជំនាញផ្សេងៗដើម្បីចែករំលែកចំណេះដឹងឲ្យគ្នាទៅវិញទៅមក
            </p>
          </div>
          <div className="sm:w-[255px] sm:ml-8 mt-5 sm:mt-0">
            <img
              className="w-full h-auto rounded-xl object-cover"
              src="../src/assets/Online learning (2).gif"
              alt="Learing by yourself "
            />
          </div>
        </div>
        <section className="max-w-screen-xl mx-auto mt-10 px-4 sm:px-0 shadow-md rounded-xl font-suwannaphum">
          <div className="w-[80%] mx-auto">
            <div className="flex items-center mb-6">
              <img
                src={
                  forum.profileUser ||
                  "https://wallpapers.com/images/hd/smiling-close-up-oggy-and-the-cockroaches-71njhqoakbau7nbm.jpg"
                }
                alt="Avatar"
                className="w-12 h-12 rounded-full mr-4 ml-5"
              />
              <div>
                <div className="text-lg font-medium text-gray-800 ml-5">
                  {forum.author}
                </div>
                <div className="text-gray-500 ml-5"> {formattedDate}</div>
              </div>
            </div>
            <h3
              className="text-[20px] leading-relaxed mb-6 font-bold ml-5 text-gray-500"
              dangerouslySetInnerHTML={{ __html: forum.title || "No title" }}
            ></h3>
            <p
              className="text-lg leading-relaxed mb-6 ml-5  text-gray-500"
              dangerouslySetInnerHTML={{
                __html: forum.description || "No description",
              }}
            ></p>
            <div className="flex justify-center items-center hover:scale-95 transition-shadow duration-300">
              <img
                className="w-full max-w-screen-lg my-5 rounded-lg shadow-xl dark:shadow-gray-800 mt-7"
                src={forum.image}
                alt="image description"
              />
            </div>
            <div className="flex justify-end items-center mr-5">
              <div className="ml-5 mb-5">
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 mr-4 mb-2"
                >
                  <i className="far fa-thumbs-up"></i> Like
                </a>

                <a
                  className="text-gray-500 hover:text-gray-700"
                  onClick={handleReplyClick}
                >
                  <i className="far fa-comment-alt "></i> Reply
                </a>
              </div>
            </div>
          </div>
        </section>
        <div
          ref={replyFormRef}
          className={`mt-4 ${showReplyForm ? "" : "hidden"}`}
        >
          <form
            onSubmit={handleReplySubmit}
            className="max-w-2xl bg-white rounded-lg border p-2 mx-auto "
          >
            <Label className="font-suwannaphum">Your Reply</Label>
            <Textarea
              type="text"
              name="replyText"
              value={replyText}
              onChange={handleReplyTextChange}
              className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-10 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button type="submit" color="indigo">
                Submit
              </Button>
              <Button
                type="button"
                color="gray"
                onClick={() => setShowReplyForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
        <div>
          <ReplyCard forumId={id} />
        </div>
      </main>
      <FooterCard />
    </>
  );
};

export default CreateComment;
