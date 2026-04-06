import React from 'react';
import './App.css';
import './styles/responsive.css';
import './styles/normalize.css';

import Header from './components/Header';
import Hero from './components/Hero';
import Abouts from './components/Abouts';
import Projects from './components/Projects';
import Contact from './components/Contact';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from 'react';


function App() {

   // ------------------------------
  // GLOBAL THEME STATE
  // ------------------------------
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Loads saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    // If user previously chose dark mode → restore it
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []); // empty dependency array means this runs only once on mount



  useEffect(() => {
    // Add or remove "dark-mode" class on body based on state
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <>
      {/* PASS PROPS TO HEADER */}
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main>
        <Hero />
        <Abouts />
        <Projects />
        <Contact />
      </main>
    </>
  )
}

export default App
