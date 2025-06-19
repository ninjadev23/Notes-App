import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import NoteComponent from "./routes/NoteComponent";
import NotFound from "./routes/NotFound";
import Logout from "./routes/Logout";
import CreateNote from "./routes/CreateNote";
import { useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
export default function Routes() {
  return useRoutes([
    {
      element: <Layout/>,
      children: [
          { path: "/", element: <Home />},
          { path: "/createnote", element: <CreateNote />},
          { path: "/notes/:id", element: <NoteComponent />}  
      ]
    },
    { path: "/signup", element: <Signup />},
    { path: "/login", element: <Login />},
    { path: "*", element: <NotFound />},
    { path: "/logout", element: <Logout />}
  ]);
}
