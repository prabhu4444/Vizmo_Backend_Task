import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({_id, title, summary, cover, content, createdAt, author }) {
  return (
    <div className="post grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:4000/${cover}`} alt={title} className="w-full h-auto" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
        </Link>
        <p className="info flex items-center text-gray-500 mb-2">
          <span className="mr-2">{author.username}</span>
          <time className="text-xs">{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
