import { useContext, useEffect, useState } from "react";
import { Navigate,useParams, Link } from "react-router-dom";
import { format } from "date-fns"; // Changed from formatISO9075 to format for simplicity
import { UserContext } from "../UserContext";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  //const history = useHistory();


  useEffect(() => {
    fetch(`/api/post/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch post.");
      })
      .then(postInfo => {
        console.log(postInfo);
        setPostInfo(postInfo);
      })
      .catch(error => {
        console.error("Error fetching post:", error);
      });
  }, [id]);

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/post/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setRedirect(true);
        //history.push("/"); // Redirect to home page after successful deletion
      } else {
        throw new Error("Failed to delete post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!postInfo) return null; // Return early if postInfo is null or undefined

  return (
    <div className="max-w-4xl bg-red-100 mx-auto h-screen mt-10">
      
      <h1 className="text-3xl flex justify-center items-center font-bold p-6">Title : {postInfo.title}</h1>
     <div className="flex flex-row items-center mb-4 justify-around">
     <div className="text-base text-gray-600">Auther : {postInfo.author.username}</div>
      <time className="text-base text-gray-500">
      Date of Creation :  
        { format(new Date(postInfo.createdAt), " dd MMM yyyy")}
      </time>
     </div>
      

      {userInfo.id === postInfo.author._id && (
        <div className="mb-4 flex justify-end">
          <Link
            to={`/edit/${postInfo._id}`}
            className="inline-flex items-center mx-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none"
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
          <button
            onClick={handleDelete}
            className="inline-flex items-center mx-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md focus:outline-none"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Delete this post
          </button>
        </div>
      )}

      <div className=" flex justify-center m-4">
        <img src={`http://localhost:4000/${postInfo.image}`} alt="" className="max-w-80 max-h-80" />
      </div>

      <div
        className="p-8 border border-red-200 m-4 prose"
        dangerouslySetInnerHTML={{ __html: postInfo.content }} // Using prose for rich text content
      />
    </div>
  );
}
