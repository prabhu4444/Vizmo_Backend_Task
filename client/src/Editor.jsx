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
    <div >
      <ReactQuill
        value={value}
        theme="snow"
        onChange={onChange}
        modules={modules}
        className="bg-white shadow-md rounded px-4 py-2 mt-2 mb-4"
        style={{ minHeight: "300px" }} // Set a minimum height for the editor
      />
    </div>
  );
}
