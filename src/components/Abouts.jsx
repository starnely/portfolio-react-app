import { useState, useEffect, useRef } from "react";
import developer from '../assets/web-developers.png';


export default function Abouts() {
    /* ============================================
     1. DATA (REPLACES HARD-CODED HTML)
     ============================================ */
    const skills = [
        { name: "HTML", level: 100 },
        { name: "CSS", level: 90 },
        { name: "JavaScript", level: 80 },
        { name: "Git", level: 70 },
        { name: "Responsive Design", level: 60 }
    ];

    /* ============================================
       2. STATE (REPLACES classList.add("show"))
       ============================================ */
    const [isVisible, setIsVisible] = useState(false);

    /* ============================================
    3. REF (REPLACES querySelector(".about"))
    ============================================ */
    const aboutRef = useRef(null);

    /* ============================================
    4. INTERSECTION OBSERVER
    (REPLACES window scroll event)
    ============================================ */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target); // Stop observing after it becomes visible
                    }
                });
            },
            { threshold: 0.3 } // Trigger when 30% of the element is visible
        );

        // Start observing the section
        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }

        // Cleanup (important in React)
        return () => {
            observer.disconnect();
        };
    }, []);


    /* ============================================
    5. JSX (UI)
    ============================================ */
    return (
        <section id="about" className={`about ${isVisible ? 'fade-in' : 'hidden'}`} ref={aboutRef}>
            <div className="about-me-container">

                {/* LEFT SIDE IMAGE */}
                <div className="left-side">
                    <div className="about-image">
                        <img src={developer} alt="profile" />
                    </div>
                </div>

                {/* RIGHT SIDE CONTENT */}
                <div className="right-side">
                    <div>
                        <h2 className="about-tag">About Me</h2>
                        <h4 className="role">Frontend Developer · HTML · CSS · JavaScript</h4>
                    </div>

                    <div className="divider"></div>

                    <div className="about-text">
                        <p>I am a passionate frontend developer who enjoys building
                            clean and interactive user interfaces.</p>
                    </div>

                    {/* ============================================
                        6. SKILLS (REPLACES querySelectorAll + dataset)
                    ============================================ */}
                    <div className="about-skills">
                        <h4>SKILLS</h4>
                        <div className="skills">
                            {skills.map((skill, index) => (
                                <div className="skill-item" key={index}>
                                    <span>{skill.name}</span>

                                    <div className="skill-bar">
                                        <div
                                            className="skill-fill"
                                            style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                                        ></div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}