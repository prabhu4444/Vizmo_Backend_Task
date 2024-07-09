import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({_id, title, summary, image, content, createdAt, author }) {
  console.log(image);
  return (
    <div className=" shadow-xl bg-red-100 border border-red-200 post grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="image">
        <Link to={`/post/${_id}`}>
        <img src={`http://localhost:4000/${image}`} alt={title} className="max-w-80 max-h-80" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2 className="text-xl font-bold mb-2 flex text-blue-900 justify-center ">Title : {title}</h2>
        </Link>
        <p className="info flex flex-row items-center justify-around text-gray-600 mb-2">
          <span className="mr-2">Author : {author.username}</span>
          <time className="text-xs">Date of Creation: { format(new Date(createdAt), " dd MMM yyyy")}</time>
        </p>
        <p className="summary">Summary : {summary}</p>
      </div>
    </div>
  );
}
