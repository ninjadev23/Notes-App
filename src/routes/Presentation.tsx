import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
export default function HomePresentation() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const images = ["example1.png", "example2.png", "example3.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev >= images.length - 1 ? 0 : prev + 1));
        setFade(true);
      }, 600);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center w-full mt-20">
      <header className="flex gap-3 flex-wrap p-3 justify-center">
        <div className="w-80 text-center mb-10">
          <h1 className="text-2xl mb-3">Notes App</h1>
          <p className="mb-3">
            Small modern web application where you can create notes, edit them
            like a rich-text editor, delete them, organize them with tags,
            search them, and manage everything directly from the web.
          </p>
          <Link className="p-2 bg-cyan-700 m-2 rounded-md hover:bg-cyan-900" to="/login">Login</Link>
          <Link className="rounded-md p-2 hover:bg-black/60 bg-black/40 text-white" to="/signup">Signup</Link>
        </div>
        <img
          className={`rounded-2xl shadow-2xl shadow-gray-900 w-lg object-cover transition-opacity duration-1000 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          src={`/${images[current]}`}
          alt="Notes App Image"
        />
      </header>
    </div>
  );
}
