import { useFetch, ApiUrl, isNote } from "../utils";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";
export default function CreateNote() {
  const { data, error, loading, refetch } = useFetch({
    url: ApiUrl + "/notes",
    method: "POST",
    autoFetch: false,
    body: {
      title: "New Note",
      content: "Your Content....",
      important: false,
      tags: [],
    },
  });
  useEffect(() => {
    refetch();
  }, []);
  if (error === "User Not Authenticated") return <Navigate to="/login" />;
  if (error && error !== "User Not Authenticated")
    return <p className="text-red-500 px-4">{error as string}</p>;
  if (loading) return <Loading />;
  return <div>{isNote(data) && <Navigate to={`/notes/${data._id}`} />}</div>;
}
