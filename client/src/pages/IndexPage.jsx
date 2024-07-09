import Post from "../Post";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"; 

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPosts = () => {
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
  };

  const searchPosts = (searchQuery) => {
    let url = `/api/search`;
    if (searchQuery) {
      url += `?query=${encodeURIComponent(searchQuery)}`;
    }

    fetch(url)
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
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    if (query) {
      searchPosts(query);
    } else {
      fetchPosts();
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search by title or author" 
          value={search} 
          onChange={handleSearchChange} 
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      {posts.length > 0 ? (
        posts.map(post => <Post key={post._id} {...post} />)
      ) : (
        <p className="text-center">
          {search ? "No posts match your search." : "No posts available."}
        </p>
      )}
    </div>
  );
}
