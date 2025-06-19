import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFetch, ApiUrl } from "../utils";
import { Plus } from "lucide-react";
import type { Note } from "../types";
import NoteForHome from "./NoteForHome";
import Loading from "../components/Loading";

import Button from "../components/Button";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [url, setUrl] = useState("");
  const [tagSelect, setTagSelect] = useState<string[]>([]);
  const [tagsSelectStyle, setTagSelectStyle] = useState<number[]>([]);
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (tagSelect.length !== 0) {
      const tags = tagSelect.join(",");
      setUrl(`${ApiUrl}/notes/tags?tags=${tags}`);
    } else {
      timeout = setTimeout(() => {
        setUrl(
          search.trim()
            ? `${ApiUrl}/notes?title=${encodeURIComponent(search)}`
            : `${ApiUrl}/notes`
        );
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [search, tagSelect]);
  const { data, loading, error } = useFetch({
    url,
    method: "GET",
    autoFetch: true,
  });
  const tagFetch = useFetch({
    method: "GET",
    url: `${ApiUrl}/notes/get-tags`,
    autoFetch: true,
  });
  const handleTag = (tag: string, index: number) => {
    if (!tagSelect.includes(tag)) setTagSelect([...tagSelect, tag]);
    else setTagSelect(tagSelect.filter((n) => n !== tag));

    if (!tagsSelectStyle.includes(index))
      setTagSelectStyle([...tagsSelectStyle, index]);
    else setTagSelectStyle(tagsSelectStyle.filter((n) => n !== index));
  };
  if (error === "User Not Authenticated") return <Navigate to="/signup" />;
  if (error) return <p className="error-message">{error as string}</p>;
  if (loading) return <Loading />;
  return (
    <>
      {data && (
        <main className="mt-20 flex flex-col justify-center items-center">
          <h1 className="text-2xl m-3 text-center text-white/70">
            Welcome, Capture your new ideas, so you don't forget them.
          </h1>
          <div className="flex w-full justify-center items-center pb-6">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="outline-0 p-2 m-4  border-b-1 border-b-white/30 w-[60%] mb-8"
            />
            <Button onClick={() => navigate("/createnote")}>
                         <Plus size={25} />
                          Agregar
              </Button>
            
          </div>
          <div className="flex gap-1 m-10 -mt-3 flex-wrap">
            {Array.isArray(tagFetch.data) &&
              tagFetch.data.map((tag, index) => (
                <p
                  onClick={() => handleTag(tag, index)}
                  className={`${
                    tagsSelectStyle.includes(index)
                      ? "border-2 border-sky-600"
                      : "border border-transparent"
                  } p-2 bg-black/30 hover:cursor-pointer`}
                  key={index}
                >
                  {tag}
                </p>
              ))}
          </div>
          <div className="flex justify-center gap-6 flex-wrap">
            {Array.isArray(data) &&
              data.map((note: Note) => (
                <NoteForHome key={note._id} {...note} />
              ))}
          </div>
          {Array.isArray(data) && data.length === 0 && (
            <h2 className="bg-gradient-to-r from-cyan-400/40 via-sky-500 to-white bg-clip-text text-transparent text-3xl">
              Create new ideas, notes, expectations and whatever you want.
            </h2>
          )}
        </main>
      )}
    </>
  );
}
