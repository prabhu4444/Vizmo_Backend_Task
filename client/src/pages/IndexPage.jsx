import Post from "../Post";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"; 

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/post')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        toast.error("Network response was not ok.");
        throw new Error("Network response was not ok.");
      })
      .then(posts => {
        setPosts(posts);
      })
      .catch(error => {
        toast.error("Error fetching posts");

        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {posts.length > 0 ? (
        posts.map(post => <Post key={post.id} {...post} />)
      ) : (
        <p className="text-center">No posts available.</p>
      )}
    </div>
  );
}
