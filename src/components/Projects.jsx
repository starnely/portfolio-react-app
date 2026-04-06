import { useState, useEffect, useRef } from "react";

export default function Projects() {
    /* ============================================
       1. PROJECT DATA
    ============================================ */
    const projects = [
        {
            title: "Manage Bank Landing Page",
            description: "A modern banking landing page with responsive design and smooth animations.",
            image: "/images/manageLanding-page.jpg",
            link: "projects/manage-landing-page-master-main/index.html"
        },
        {
            title: "Easy Bank Landing Page",
            description: "A clean and professional banking interface with interactive features.",
            image: "/images/easybank.jpg",
            link: "projects/easybank-landing-page-master-main/index.html"
        },
        {
            title: "Super Simple Math Calculator",
            description: "A functional calculator built with vanilla JavaScript.",
            image: "/images/calculator.jpg",
            link: "projects/calc-html-css-js/index.html"
        },
        {
            title: "YouTube Web Learning",
            description: "A simple YouTube-like web application for learning purposes.",
            image: "/images/youtube.jpg",
            link: "projects/youtube_web_learning-main/index.html"
        },
        {
            title: "Professional Portfolio",
            description: "Turning ideas into impactful results.",
            image: "/images/portfolio.jpg",
            link: "/projects/my-portfolio/index.html"
        },
        {
            title: "E-Commerce Solutions",
            description: "From product to purchase—optimized for results at every step.",
            image: "/images/E-commerce.png",
            link: "/projects/nthiga-hub/nthigaHub.html"
        }
    ];

    /* ============================================
       2. STATE
    ============================================ */
    const [currentSlide, setCurrentSlide] = useState(0);
    const [perPage, setPerPage] = useState(window.innerWidth <= 768 ? 1 : 3);
    const [isPaused, setIsPaused] = useState(false);

    /* ============================================
       3. SLIDER REF (for touch)
    ============================================ */
    const sliderRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    /* ============================================
       4. RESPONSIVE HANDLER
    ============================================ */
    useEffect(() => {
        const handleResize = () => {
            setPerPage(window.innerWidth <= 768 ? 1 : 3);
            setCurrentSlide(0);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    /* ============================================
       5. GROUP PROJECTS INTO SLIDES
    ============================================ */
    const groupedProjects = [];
    for (let i = 0; i < projects.length; i += perPage) {
        groupedProjects.push(projects.slice(i, i + perPage));
    }
    const totalPages = groupedProjects.length;

    /* ============================================
       6. AUTO-SLIDE
    ============================================ */
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused) next();
        }, 2000);
        return () => clearInterval(interval);
    }, [isPaused, perPage, currentSlide]);

    /* ============================================
       7. NAVIGATION
    ============================================ */
    const goTo = (index) => setCurrentSlide(index);
    const next = () => setCurrentSlide((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
    const prev = () => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalPages - 1));

    /* ============================================
       8. TOUCH HANDLERS
    ============================================ */
    const handleTouchStart = (e) => touchStartX.current = e.touches[0].clientX;
    const handleTouchEnd = (e) => {
        touchEndX.current = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) < 50) return;
        diff > 0 ? next() : prev();
    };

    /* ============================================
       9. SLIDE TRANSLATION
    ============================================ */
    const translateX = -(currentSlide * 100);

    /* ============================================
       10. RENDER
    ============================================ */
    return (
        <section id="projects" className="projects">
            <h2>My Projects</h2>
            <p className="proj-subtitle">A selection of things I've built</p>

            <div
                className="slider-wrap"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="my-projects"
                    style={{ transform: `translateX(${translateX}%)` }}
                >
                    {groupedProjects.map((group, idx) => (
                        <div key={idx} className="card-group">
                            {group.map((project, i) => (
                                <article key={i} className="card">
                                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                                        <div className="image-wrapper">
                                            <img src={project.image} alt={project.title} className="image" />
                                        </div>
                                    </a>
                                    <h3>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                                            {project.title}
                                        </a>
                                    </h3>
                                    <p className="card-description">
                                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                                            {project.description}
                                        </a>
                                    </p>
                                </article>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Slider Controls */}
                <div className="slider-controls">
                    <button className="slider-arrow" onClick={prev}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <div className="slider-dots">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                className={i === currentSlide ? "dot active" : "dot"}
                                onClick={() => goTo(i)}
                            ></button>
                        ))}
                    </div>
                    <button className="slider-arrow" onClick={next}>
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                    <span className="slide-counter">{currentSlide + 1} / {totalPages}</span>
                </div>
            </div>
        </section>
    );
}