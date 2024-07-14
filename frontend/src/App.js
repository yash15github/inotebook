import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}

  return (
    <NoteState>
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Alert alert = {alert}/>
      <div className="Container my-3 mx-5">
        <Routes>
          <Route exact path="/" element={<Home  showAlert={showAlert}/>} />
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/login" element={<Login showAlert = {showAlert}/>}/>
          <Route exact path="/signup" element={<Signup showAlert = {showAlert}/>}/>
        </Routes>
        </div>
      </BrowserRouter>
    </div>
    </NoteState>
  );
}

export default App;
