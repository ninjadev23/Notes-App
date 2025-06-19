import type { Note } from "../types";
import { useFetch, ApiUrl } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { FileText, X, Menu, Plus } from "lucide-react";
import { useState } from "react";

import Button from "./Button";

export const NoteListBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useFetch({
    url: `${ApiUrl}/notes`,
    method: "GET",
    autoFetch: true,
  });

  if (error && error !== "User Not Authenticated") return <p className="text-red-500 px-4">{error as string}</p>;
  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(!open)}
          className="fixed -mt-7 ml-3 border border-white/30 p-1 hover:cursor-pointer"
        >
          <Menu className="size-7 hover:cursor-pointer"></Menu>
        </button>
      )}
      {open && (
        <aside className="fixed top-0 left-0 h-full w-60 z-50 p-5 shadow-2xl shadow-gray-900 bg-gradient-to-tl from-black to-sky-950">
          <div className="pt-4">
            <button
              onClick={() => setOpen(!open)}
              className="absolute top-3 right-3 size-7 hover:cursor-pointer"
            >
              <X className="size-7 text-white" />
            </button>
            <h2 className="text-white/70 text-xl">Your Notes</h2>
            {loading && <p className="text-white">Loading...</p>}
            <Button styles="bg-transparent hover:bg-sky-700" onClick={() => navigate("/createnote")}>
              <Plus size={25} />
            </Button>
            <ul>
              {Array.isArray(data) &&
                data.map((note: Note) => (
                  <li
                    key={note._id}
                    className="flex gap-1 p-2 hover:text-cyan-500 text-white/70"
                  >
                    <FileText className="w-6 h-6" />
                    <Link to={`/notes/${note._id}`} title={note.title}>
                      {note.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      )}
    </>
  );
};
