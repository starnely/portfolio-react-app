import { useState, useEffect } from 'react';
import profile from '../assets/profile.jpeg';

export default function Hero() {

    // ------------------------------
    // STATIC TEXT CONTENT
    // ------------------------------
    const intro = "Bonjour! 👋, I'm";
    const name = "Nthiga Mukundi";
    const description = 'I build modern, responsive and interactive web applications.';

    // Words that will appear in the typing effect
    const toRotate = ["a Software Engineer.", "a Web Developer.", "a Tech Enthusiast."];

    // ------------------------------
    // TYPING STATE
    // ------------------------------
    const [typingText, setTypingText] = useState(''); // Text currently displayed
    const [isDeleting, setIsDeleting] = useState(false); // True = deleting, False = typing
    const [loopNum, setLoopNum] = useState(0);          // Index of current word
    const [speed, setSpeed] = useState(150);           // Typing speed in ms per letter

    // ------------------------------
    // TYPING EFFECT LOGIC
    // ------------------------------
    useEffect(() => {
        // Current word to display
        const currentIndex = loopNum % toRotate.length;
        const fullText = toRotate[currentIndex];

        // Determine next text: add one letter or remove one letter
        const updatedText = isDeleting
            ? fullText.substring(0, typingText.length - 1)
            : fullText.substring(0, typingText.length + 1);

        // Calculate speed: faster when deleting
        const nextSpeed = isDeleting ? 75 : 150;

        // Schedule update for next character
        const timer = setTimeout(() => {
            setTypingText(updatedText);

            // If finished typing the full word → start deleting after a pause
            if (!isDeleting && updatedText === fullText) {
                setTimeout(() => setIsDeleting(true), 1000); // 1s pause
            }

            // If finished deleting the word → move to next word
            if (isDeleting && updatedText === '') {
                setIsDeleting(false);
                setLoopNum(prev => prev + 1); // Next word
            }
        }, nextSpeed);

        // Cleanup timeout on unmount or dependency change
        return () => clearTimeout(timer);

    }, [typingText, isDeleting, loopNum]);

    // ------------------------------
    // SCROLL FUNCTION
    // ------------------------------
    function scrollToSection(id) {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    }

    // ------------------------------
    // RENDER
    // ------------------------------
    return (
        <section className="hero" id="hero">
            <div className="hero-content">
                {/* PROFILE IMAGE */}
                <img src={profile} className="profile-image" alt="profile" />

                {/* INTRO TEXT */}
                <p className="intro">{intro}</p>

                {/* NAME */}
                <h1>{name}</h1>

                {/* TYPING EFFECT */}
                <h4>
                    {typingText}
                    {/* Blinking cursor */}
                    <span className="cursor" aria-hidden="true">|</span>
                </h4>

                {/* DESCRIPTION */}
                <p className="description">{description}</p>

                {/* BUTTONS */}
                <div className="hero-buttons">
                    <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                        View My Work
                    </button>

                    <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
                        Get In Touch
                    </button>
                </div>
            </div>
        </section>
    );
}