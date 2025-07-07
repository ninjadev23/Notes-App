import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useFetch, ApiUrl, isNote } from "../utils";
import Loading from "../components/Loading";
import axios from "axios";
import type { Note } from "../types";
import TextareaAutosize from "react-textarea-autosize";
import { MoreHorizontal, X } from "lucide-react";
import Button from "../components/Button";
const NoteComponent: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [savingMessage, setSavingMessage] = useState("");
  const [savingError, setSavingError] = useState<null | Error>(null);
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [deleted, setDeleted] = useState(false);
  const [panelOptions, setPanelOptions] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [displayInputTag, setDisplayInputTag] = useState(false);
  if (typeof id !== "string") navigate("/404");

  const { data, loading, error } = useFetch({
    url: `${ApiUrl}/notes/${id}`,
    method: "GET",
    autoFetch: true,
  });
  useEffect(() => {
    if (isNote(data)) setNote({ ...data });
  }, [data]);

  const updateNote = async (updated: Note) => {
    try {
      setSavingMessage("Saving...");
      await axios.put(`${ApiUrl}/notes/${id}`, updated, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setSavingMessage("");
    } catch (err) {
      setSavingError(err as Error);
    }
  };

  const handleInput = (key: "title" | "content", value: string) => {
    if (!note) return;
    const update = { ...note, [key]: value };
    setNote(update);
    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(() => {
      updateNote(update);
    }, 2000);
    setTypingTimeout(timeout);
  };

  const { refetch: deleteNote, loading: deleting } = useFetch({
    url: `${ApiUrl}/notes/${id}`,
    method: "DELETE",
    autoFetch: false,
  });
  const handleDelete = async () => {
    await deleteNote();
    setDeleted(true);
  };
  const handleTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!note) return;
    const noteUpdated = note;
    note?.tags.push(newTag);
    setNote(noteUpdated);
    updateNote(noteUpdated);
    setDisplayInputTag(false);
    setNewTag("");
  };
  const handleTagDelete = (tag: string) => {
    if (!note) return;
    const noteUpdated = note;
    noteUpdated.tags = noteUpdated.tags.filter((tg) => tg !== tag);
    setNote(noteUpdated);
    updateNote(noteUpdated);
  };
  if (error === "User Not Authenticated") return <Navigate to="/login" />;
  if (error && error !== "User Not Authenticated")
    return <p className="text-red-500 px-4">{error as string}</p>;
  if (loading) return <Loading />;
  return (
    <main className="mt-20 flex flex-col h-screen items-center">
      {note && (
        <>
          {savingMessage && (
            <span className="w-[80%] p-3 text-white/40 text-xl">
              {savingMessage}
            </span>
          )}
          {savingError && (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
                />
              </svg>
              <span>{savingError.message}</span>
            </div>
          )}
          <div
            ref={titleRef}
            className="p-4 pt-10 sm:pt-4 text-2xl break-words sm:text-3xl outline-0 bg-black/30 w-[80%] rounded-tl-lg rounded-tr-lg"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              handleInput("title", e.currentTarget.textContent || "")
            }
          >
            {note.title}
          </div>
          <MoreHorizontal
            onClick={() => setPanelOptions(!panelOptions)}
            className="hover:cursor-pointer hover:text-white/30 w-6 h-6 text-white absolute right-15 sm:right-30 top-22"
          />
          {panelOptions && (
            <ul className="right-20 top-30 shadow-2xl shadow-gray-900 p-1 m-2 rounded-lg gap-2 fixed z-index bg-sky-950 w-32 h-24 flex flex-col items-center justify-center">
              <li>
                <button
                  onClick={handleDelete}
                  className="hover:text-white/40 hover:cursor-pointer"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </li>
              <li
                onClick={() => setDisplayInputTag(!displayInputTag)}
                className="hover:text-white/40 hover:cursor-pointer"
              >
                Add Tag
              </li>
            </ul>
          )}
          <TextareaAutosize
            value={note.content}
            className="bg-black/30 p-4 resize-none outline-0 w-[80%] rounded-bl-lg rounded-br-lg"
            onChange={(e) => handleInput("content", e.target.value)}
          />
          {deleted && <Navigate to="/home" />}
          <div className="flex gap-2 m-2">
            {note.tags.map((tag, i) => (
              <div
                key={i}
                className="flex items-center bg-cyan-700/70 rounded-xs p-1"
              >
                {tag}
                <X
                  onClick={() => handleTagDelete(tag)}
                  className="hover: cursor-pointer"
                  size={20}
                />
              </div>
            ))}
            {displayInputTag && (
              <form onSubmit={handleTag}>
                <input
                  className="outline-0 w-20 bg-gray-600/30 p-2"
                  type="text"
                  placeholder="New Tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
              </form>
            )}
            <Button onClick={() => setDisplayInputTag(!displayInputTag)}>
              Add Tag
            </Button>
          </div>
        </>
      )}
    </main>
  );
};

export default NoteComponent;
