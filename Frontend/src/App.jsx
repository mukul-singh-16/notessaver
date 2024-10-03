import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import MyNotes from './components/MyNotes';
import SavedNotes from './components/SavedNotes';
import Profile from './components/Profile';
import './App.css';
// import CreateNote from './components/CreateNote';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/mynotes" element={<MyNotes />} />
          <Route path="/savednotes" element={<SavedNotes />} />
          {/* <Route path="/create-note" component={<CreateNote/>}/> */}
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="*" element={<Profile />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
