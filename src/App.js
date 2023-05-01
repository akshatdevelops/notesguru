
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './Components/Navbar';
import About from './Components/About';
import Home from './Components/Home';
import NoteState from './Context/noteState';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  return (
    <>
      <NoteState>
        <div className="App">
          {/* /* <Navbar></Navbar>
      <h1>This is NotesGuru</h1> */ }
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/About' element={<About />}></Route>
              <Route path='/Login' element={<Login />}></Route>
              <Route path='/Signup' element={<Signup />}></Route>
              
            </Routes>
          </BrowserRouter>
        </div>
      </NoteState>
    </>

  );
}

export default App;
