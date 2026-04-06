
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
    /* ============================================
        1. STATE (Form Data + Errors + Animation)
       ============================================ */
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [isVisible, setIsVisible] = useState(false); // fade-in on scroll
    const contactRef = useRef(null);

    /* ============================================
      2. HANDLE INPUT CHANGE (Replaces manual DOM value grabbing)
      ============================================ */
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    /* ============================================
       3. FORM VALIDATION
       ============================================ */
    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        }
        return newErrors;
    };

    /* ============================================
       4. HANDLE FORM SUBMISSION
       ============================================ */
    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();

        // (Replaces manual DOM value grabbing)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

            // ❗ Show error toast if form invalid
            toast.error("Please fix the errors in the form");
            return;
        }
        setErrors({}); // Clear errors if validation passes

        /* ============================================
          EMAILJS SEND
          ============================================ */
        emailjs.send(
            "service_y36hdd4", // Your EmailJS service ID   
            "template_wt5o9oq", // Your EmailJS template ID
            formData, // The form data to send
            "hL_7tItH7i7LgIGOM" // Your EmailJS user ID  t
        ).then(
            (response) => {
                console.log("SUCCESS", response);
                // ❗ Show success toast if form is valid
                toast.success("Message sent successfully!");

                setFormData({
                    name: "",
                    email: "",
                    message: ""
                }); // Clear form after successful submission
            },
            (error) => {
                console.error("Failed to send email. Error:", error);
                // ❗ Show error toast if form is invalid
                toast.error("Failed to send message. Please try again later.");
            }
        );
    };

    /* ============================================
       5. SCROLL FADE-IN (Intersection Observer)
    ============================================ */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

        if (contactRef.current) {
            observer.observe(contactRef.current);
        }
        return () => observer.disconnect();
    }, []);



    /* ============================================
      6. JSX (UI)
      ============================================ */
    return (
        <section
            id="contact"
            className={`contact ${isVisible ? 'fade-in' : 'hidden'}`}
            ref={contactRef}
        >
            <div className="contact-container">
                <h2>Let's Work Together</h2>
                <p className="contact-subtitle">Have a project in mind? I'd love to hear from you.</p>

                <div className="contact-content">
                    <div className="contact-info">
                        {/* <!-- ============================================
                        LEFT SIDE: Contact Information
                         ============================================ --> */}
                        <h3>Contact Information</h3>
                        <p>
                            <a
                                href="mailto:nthigamukundi5@gmail.com?subject=I need Website"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fa-solid fa-envelope"></i>
                            </a>

                            <a
                                href="mailto:nthigamukundi5@gmail.com?subject=I need Website"
                                target="_blank"
                                rel="noopener noreferrer" className="email"
                            >
                                nthigamukundi5@gmail.com
                            </a>
                        </p>

                        <p>
                            <a
                                href="https://wa.me/254702136998" target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fa-brands fa-whatsapp"></i>
                            </a>

                            <a
                                href="https://wa.me/254702136998" target="_blank"
                                rel="noopener noreferrer"
                                className="whatsapp"
                            >
                                Whatsapp
                            </a>
                        </p>

                        <div className="social-links">
                            <a
                                href="https://github.com/starnely" className="github"
                                target="_blank"
                                rel="noopener noreferrer" aria-label="Visit my GitHub profile"
                            >
                                <i className="fa-brands fa-github"></i>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/mukundi-nthiga"
                                className="linkedin"
                                target="_blank"
                                rel="noopener noreferrer" aria-label="Visit my linkedin profile"
                            >
                                <i className="fa-brands fa-linkedin"></i>
                            </a>

                            <a
                                href="https://x.com/nthigastano" className="twitter"
                                target="_blank"
                                rel="noopener noreferrer" aria-label="Visit my Twitter profile"
                            >
                                <i className="fa-brands fa-x-twitter"></i>
                            </a>

                            <a
                                href="https://www.facebook.com/nthiga.stano" className="facebook"
                                target="_blank"
                                rel="noopener noreferrer" aria-label="Visit my Facebook page"
                            >
                                <i className="fa-brands fa-facebook"></i>
                            </a>

                            <a href="https://www.instagram.com/nthigamukundi5"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit my Instagram profile"
                            >
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                        </div>
                    </div>

                    {/* <!-- ============================================
                    RIGHT SIDE: Contact Form for users to send messages
                         ============================================ --> */}
                    <form
                        id="contact-form"
                        className="contact-form"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <div className="input-group">
                            <label
                                htmlFor="name-input"
                                className="sr-only"
                            >
                                Enter your Name:
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name-input"
                                placeholder="Your Name...." required
                                value={formData.name}
                                onChange={handleChange}
                                autoComplete="name"
                                aria-required="true"
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>

                        <div className="input-group">
                            <label
                                htmlFor="email-input"
                                className="sr-only"
                            >
                                Enter your Email:
                            </label>

                            <input
                                type="email"
                                name="email"
                                id="email-input"
                                placeholder="Your Email..." required
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email" aria-required="true"
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>

                        {/* MESSAGE */}
                        <div className="input-group">
                            <label
                                htmlFor="message-input" className="sr-only"
                            >
                                Your Message
                            </label>

                            <textarea
                                rows="5"
                                name="message"
                                id="message-input"
                                placeholder="Your Message" required
                                value={formData.message}
                                onChange={handleChange}
                                aria-required="true"
                            />
                            {errors.message && <span className="error">{errors.message}</span>}
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            id="submit"
                            className="btn btn-submit"
                        >
                            Send Message
                        </button>
                    </form>

                </div>
            </div>

            {/* Toast Container for notifications */}
            <ToastContainer
                position="top-right"
                autoClose={3000} // 3 seconds
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </section>
    );
}