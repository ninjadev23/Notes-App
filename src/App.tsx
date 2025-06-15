import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import NoteComponent from './Components/NoteComponent'
import NotFound from './Components/NotFound'
import { Route, Routes, NavLink } from 'react-router-dom'
import { NoteListBar } from './Components/NoteListBar'
import Logout from './Components/Logout'
import CreateNote from './Components/CreateNote'
function App() {
  return (
    <>
    <header>
       <nav className="fixed z-50 top-0 w-full border-b-1 p-2 border-b-gray-700 backdrop-blur">
            <ul className="flex justify-between font-mono">
                <li className="hover:text-cyan-700 border-b-2 border-transparent hover:border-cyan-700" ><NavLink to="/">Home</NavLink></li>
                <div className="flex gap-1">
                    <li className="hover:text-cyan-700 border-b-2 border-transparent mr-3 hover:border-cyan-700"><a href='https://github.com/ninjadev23/Notes-App' target="_blank" rel="noopener noreferrer">About</a></li>
                    <li className="hover:text-cyan-700 border-b-2 border-transparent hover:border-cyan-700"><NavLink to="/logout">Logout</NavLink></li>
                </div>
            </ul>
        </nav>
      </header>

    <div>
      <NoteListBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notes/:id" element={<NoteComponent />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/createnote" element={<CreateNote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    <footer className='border-t flex items-center py-10 mt-10 flex-col'>
        <p>Web Created By Jansel Roa 🔥</p>
        <a href="https://github.com/ninjadev23/Notes-App" target="_blank" rel="noopener noreferrer" className='text-sky-500'>Repo Of Code</a>
    </footer>
    </div>
    </>
  )
}

export default App