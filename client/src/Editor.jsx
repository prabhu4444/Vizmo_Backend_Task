import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

export default function Editor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="h-full border border-gray-300 rounded-md overflow-hidden">
      <ReactQuill
        value={value}
        theme="snow"
        onChange={onChange}
        modules={modules}
        className="bg-white px-4 py-2 h-full"
        style={{ height: "100%" }}
      />
    </div>
  );
}
