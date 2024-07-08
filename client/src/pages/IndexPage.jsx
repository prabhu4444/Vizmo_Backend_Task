import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/post')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(posts => {
        setPosts(posts);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      {posts.length > 0 ? (
        posts.map(post => <Post key={post.id} {...post} />)
      ) : (
        <p className="text-center">No posts available.</p>
      )}
    </div>
  );
}
