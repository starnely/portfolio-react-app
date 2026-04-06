import { useEffect, useState } from "react";

export default function Header({ isDarkMode, setIsDarkMode }) {

    // HANDLE DARK MODE TOGGLE
    function handleThemeToggle() {
        // Use previous state
        setIsDarkMode(prevMode => {
            const newTheme = prevMode ? 'light' : 'dark';
            // Save to localStorage
            localStorage.setItem('theme', newTheme);
            return !prevMode;
        });
    }

    
    // Stores whether mobile menu is open or closed
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // HANDLE MOBILE MENU TOGGLE
    function handleMenuToggle() {
        setIsMenuOpen(prev => !prev);
    }

    // Close menu function(used for scrolling or clicking a menu link)
    function closeMenu() {
        setIsMenuOpen(false);
    }

    // CLOSE MENU WHEN USER SCROLLS
    useEffect(() => {
        window.addEventListener('scroll', closeMenu);
        return () => window.removeEventListener('scroll', closeMenu);
    }, []);// only run once on mount


    // ------------------------------
    // RENDER
    // ------------------------------
    return (
        // ✅ APPLY CLASS BASED ON STATE 
        // // If dark mode is ON → add "dark-mode"
        <header>
            <div className="header-container">

                {/* LOGO */}
                <a href="index.html" className="nav-logo">
                    <svg className="logo-mark" viewBox="0 0 80 80">
                        <defs>
                            <linearGradient id="gr" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#FAC775" />
                                <stop offset="40%" stopColor="#EF9F27" />
                                <stop offset="100%" stopColor="#BA7517" />
                            </linearGradient>
                            <linearGradient id="gf" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#2C2C2A" />
                                <stop offset="100%" stopColor="#1a1a18" />
                            </linearGradient>
                        </defs>
                        <circle cx="40" cy="40" r="37" stroke="url(#gr)" fill="none" strokeWidth="2" />
                        <circle cx="40" cy="40" r="30" stroke="#EF9F27" fill="none" strokeWidth="0.5"
                            strokeDasharray="3 5" opacity="0.5" />
                        <circle cx="40" cy="40" r="29" fill="url(#gf)" />
                        <rect x="22" y="22" width="7" height="36" fill="#EF9F27" rx="0.5" />
                        <rect x="51" y="22" width="7" height="36" fill="#EF9F27" rx="0.5" />
                        <polygon points="22,22 29,22 58,58 51,58" fill="#FAC775" />
                    </svg>
                    <div className="logo-text">
                        <span className="logo-name">NTHIGA MUKUNDI</span>
                        <span className="logo-sub">Portfolio · Creative</span>
                    </div>
                </a>

                {/* <NAVIGATION> */}
                <nav className={isMenuOpen ? 'nav-menu active' : 'nav-menu'} aria-label="Main navigation">
                    <ul>
                        <li><a href="#hero" onClick={closeMenu}>Home</a></li>
                        <li><a href="#about" onClick={closeMenu}>About</a></li>
                        <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
                        <li><a href="#contact" onClick={closeMenu}>Contacts</a></li>
                    </ul>
                </nav>

                {/* HAMBURGER BUTTON */}
                <button className="hamburger" aria-label="Toggle Mobile Menu" aria-expanded={isMenuOpen} onClick={handleMenuToggle}>
                    <i className={isMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
                </button>

                {/* THEME TOGGLE BUTTON */}
                <button className="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" onClick={handleThemeToggle}>
                    {/* Icon changes based on state */}
                    <i className={isDarkMode ?
                        "fa-solid fa-sun"
                        : "fa-solid fa-moon"
                    }
                        id="theme-icon"></i>
                </button>
            </div>
        </header>
    );
}