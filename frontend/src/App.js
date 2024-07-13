import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';


function App() {
  return (
    <NoteState>
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Alert message="This is amazing React course" />
      <div className="Container my-3 mx-5">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
    </NoteState>
  );
}

export default App;
