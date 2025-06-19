import { useNavigate } from "react-router-dom";
import type { Note } from "../types";

const NoteForHome: React.FC<Note> = ({
  _id,
  title,
  important,
  content,
  tags,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-sky-950/60 flex flex-col justify-center rounded-xl hover:cursor-pointer hover:scale-95 transition-transform w-3xs shadow-2xl shadow-gray-900 p-4"
      onClick={() => navigate(`/notes/${_id}`)}
    >
      <h2 className="text-2xl p-2 text-center overflow-hidden">{title}</h2>
      <p className="note-content max-h-20 overflow-hidden">{content}</p>
      {important && <p className="text-white/60 p-1">Important Note</p>}
      <div className="flex gap-2 mt-2 flex-wrap justify-center">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-cyan-700/70 rounded-xs p-1 text-[0.8rem]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
export default NoteForHome;
