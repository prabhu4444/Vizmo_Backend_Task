import Post from "../Post";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"; 

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        toast.error("Error fetching posts");
        setLoading(false); // Set loading to false even if there is an error
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {loading ? (
        <p className="text-center">Loading...</p> // Show loading message while fetching data
      ) : (
        posts.length > 0 ? (
          posts.map(post => <Post key={post.id} {...post} />)
        ) : (
          <p className="text-center">No posts available.</p> // Show this message only after fetching is complete and no posts are found
        )
      )}
    </div>
  );
}
