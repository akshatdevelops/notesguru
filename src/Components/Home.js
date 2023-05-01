
import React, { useContext, useState, useEffect } from 'react';
import noteContext from '../Context/noteContext';
import Notes from './Notes';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

export const Home = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;

  const [darkMode, setDarkMode] = useState(false);
  const [transcript, setTranscript] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (recognition) {
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("this is running ")
        setTranscript(transcript);
      };
    }
  }, []);

  const handleSpeechRecognition = () => {
    if (recognition) {
      recognition.start();
    }
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className='container'>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Disable' : 'Enable'} Dark Mode
      </button>
      <button onClick={handleSpeechRecognition}>Speak</button>
      </div>
      <Notes transcript={transcript} />
    </div>
  );
};

export default Home;



