import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ReplyCard = ({ forumId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [replySuccess, setReplySuccess] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://136.228.158.126:50001/api/forums/${forumId}/`
        );
        if (response.ok) {
          const data = await response.json();
          setComments(data.comments);
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "Error fetching comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [forumId]);

  const handleReplyContentChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();

    if (!replyContent.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Reply content cannot be empty.",
      });
      return;
    }

    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(
        `http://136.228.158.126:50001/api/forums/${forumId}/comments/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: replyContent,
            replying_to: replyingToCommentId,
          }),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your reply has been submitted.",
        }).then(() => {
          setReplyContent("");
          setShowReplyForm(false);
          setReplyingToCommentId(null);
          setReplySuccess(true);
          // Re-fetch comments to include the new reply
          fetchComments();
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: errorData.message || "Error submitting reply",
        });
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message,
      });
    }
  };

  const handleReplyClick = (commentId) => {
    setReplyingToCommentId(commentId);
    setShowReplyForm(true);
  };

  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="mx-auto my-8 flex max-w-screen-sm rounded-xl border border-gray-100 p-4 text-left text-black shadow-lg sm:p-8"
          >
            <img
              className="block max-w-full text-left align-middle sm:h-16 sm:w-16 w-12 h-12 rounded-full mr-4 ml-5"
              src="https://wallpapers.com/images/hd/smiling-close-up-oggy-and-the-cockroaches-71njhqoakbau7nbm.jpg"
              alt="Profile Picture"
            />
            <div className="w-full text-left">
              <div className="mb-2 flex flex-col justify-between text-black sm:flex-row">
                <h3 className="text-lg text-black">{comment.author}</h3>
                <div className="text-black ml-5">
                  {new Date(comment.created_at).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </div>
              </div>
              <p className="text-sm text-black">{comment.content}</p>
              <div className="mt-5 flex items-center justify-between text-black">
                <button
                  onClick={() => handleReplyClick(comment.id)}
                  className="cursor-pointer border py-2 px-8 text-center text-xs leading-tight transition-colors duration-150 ease-in-out hover:border-gray-500 rounded-lg"
                >
                  Reply
                </button>
                <a
                  title="Likes"
                  href="#"
                  className="group flex cursor-pointer items-center justify-around"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 rounded-full p-1 group-hover:bg-red-200 group-hover:text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  12
                </a>
              </div>
            </div>
          </div>
        ))
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486754.png"
              width="100"
              height="100"
              alt="Empty Box"
              className="mx-auto mb-4"
            />
            <p className="text-gray-500 font-suwannaphum">
              មិនមានទាន់ការឆ្លើយតបទេ
            </p>
          </div>
        </div>
      )}

      {showReplyForm && !replySuccess && (
        <form
          onSubmit={handleReplySubmit}
          className="my-8 p-4 border border-gray-200 rounded-lg shadow-lg"
        >
          <h4 className="text-xl font-semibold mb-4">Reply</h4>
          <textarea
            value={replyContent}
            onChange={handleReplyContentChange}
            rows="4"
            className="w-full px-3 py-2 border rounded mb-4"
            placeholder="Write your reply..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit Reply
          </button>
          <button
            type="button"
            onClick={() => setShowReplyForm(false)}
            className="ml-4 px-4 py-2 bg-gray-300 text-black rounded"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ReplyCard;
