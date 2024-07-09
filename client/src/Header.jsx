import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("/api/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("/api/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-gray-800 text-white">
      <Link to="/" className="text-2xl font-bold tracking-wider">
        MyBlog
      </Link>
      <nav>
        {username ? (
          <>
            <Link
              to="/create"
              className="inline-block mx-4 py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 text-white"
            >
              Create new post
            </Link>
            <button
              onClick={logout}
              className="inline-block py-2 px-4 rounded bg-red-500 hover:bg-red-600 text-white"
            >
              Logout ({username})
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="inline-block mx-2 py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-block mx-2 py-2 px-4 rounded bg-green-500 hover:bg-green-600 text-white"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
