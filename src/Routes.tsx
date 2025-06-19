import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import NoteComponent from "./routes/NoteComponent";
import NotFound from "./routes/NotFound";
import Logout from "./routes/Logout";
import CreateNote from "./routes/CreateNote";
import { useRoutes } from "react-router-dom";
export default function Routes() {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/notes/:id",
      element: <NoteComponent />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/createnote",
      element: <CreateNote />,
    },
  ]);
}
