import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns"; // Changed from formatISO9075 to format for simplicity
import { UserContext } from "../UserContext";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`api/post/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch post.");
      })
      .then(postInfo => {
        setPostInfo(postInfo);
      })
      .catch(error => {
        console.error("Error fetching post:", error);
      });
  }, [id]);

  if (!postInfo) return null; // Return early if postInfo is null or undefined

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">{postInfo.title}</h1>
      <time className="text-sm text-gray-500 mb-2">
        {format(new Date(postInfo.createdAt), "dd MMM yyyy")}
      </time>
      <div className="text-sm text-gray-600 mb-4">by @{postInfo.author.username}</div>

      {userInfo.id === postInfo.author._id && (
        <div className="mb-4">
          <Link
            to={`/edit/${postInfo._id}`}
            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit this post
          </Link>
        </div>
      )}

      <div className="mb-4">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="" className="w-full" />
      </div>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: postInfo.content }} // Using prose for rich text content
      />
    </div>
  );
}
