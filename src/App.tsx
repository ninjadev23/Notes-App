import Routes from './Routes'
import { NavLink } from 'react-router-dom'
import { NoteListBar } from './components/NoteListBar'
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
        <Routes/>
      </main>
    </div>
    </>
  )
}

export default App