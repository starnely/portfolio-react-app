// Toggling the hamburger
const navLinks = document.querySelector('.js-nav-links');

const hamburger = document.querySelector('.js-hamburger');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');

    if (navLinks.classList.contains('open')) {
        hamburger.textContent = '✕';
    } else {
        hamburger.textContent = '☰';
    }
});

/*
//-----------------
// Typing Animation
//------------------
const phrases = ['beautiful websites.', 'clean code.', 'fast experiences.'];

let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

// Get the element to type into
const typedText = document.querySelector('.js-typed-text');



function type() {
    // Get the current phrase
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
        typedText.textContent = currentPhrase.slice(0, letterIndex); //Typing
        letterIndex++;

        // After finishing typing the whole phrase
        if (letterIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(type, 1500); //Pause before start deleting
            return;
        }
    } else {
        // Delete/remove one letter
        typedText.textContent = currentPhrase.slice(0, letterIndex);
        letterIndex--;

        // After deleting every letter in that phrase
        if (letterIndex === 0) {
            isDeleting = false;
            phraseIndex++; // Move to the next phrase

            // Now if i run all phrases, go back to the first phrase
            if (phraseIndex === phrases.length) {
                phraseIndex = 0;
            }
        }
    }

    // Run this function again after a short delay
    const speed = isDeleting ? 60 : 120; // delete faster than typing
    setTimeout(type, speed);
}

type(); // call the function:Simply run the animation

*/

// Declare and array of phrases i word to be typing 
const sentences = ['beautiful and responsive websites.', 'clean and clear code easy to read  and understand'];

let sentenceIndex = 0;
let letterIndex = 0;
let isTyping = true;

// Get the element to type into
const typedText = document.querySelector('.js-typed-text');

if (typedText) {
    function type() {
        let currentSentence = sentences[sentenceIndex];

        // Typing here
        if (isTyping) {
            letterIndex++;
            typedText.textContent = currentSentence.slice(0, letterIndex);


            // If finished with the first word
            if (letterIndex === currentSentence.length) {
                isTyping = false;
                setTimeout(type, 1000); //Pause before deleting
                return;
            }
        } else {
            // delete the first sentence letter by letter
            typedText.textContent = currentSentence.slice(0, letterIndex);
            letterIndex--;

            // After finish dleting the first sentence
            if (letterIndex === 0) {
                isTyping = true;
                sentenceIndex++; //Move to the next phrase

                // After finish all sentences
                if (sentenceIndex === sentences.length) {
                    sentenceIndex = 0;
                    // currentSentence = sentences[sentenceIndex];
                }
            }
        }

        // Run this function again after a short delay
        const speed = isTyping ? 100 : 50; // delete faster than typing
        setTimeout(type, speed);
    }

    type(); // call the function:Simply run the animation
}



//--------
// ABOUT
//---------
// 1. Select all skill bars
const skillBars = document.querySelectorAll('.js-skill-fill');

if (skillBars.length > 0) {
    // 2. Create the observer
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {

            // 3. When a bar scrolls into view
            if (entry.isIntersecting) {
                const bar = entry.target; // the specific bar that appeared

                // 4. Read its data-level and set the width
                const level = bar.dataset.level;
                bar.style.width = level + '%'; // hint: level + '%'

                // 5. Stop watching it — animation should only happen once
                observer.unobserve(bar);
            }
        });
    });

    // 6. Tell the observer to watch each bar
    skillBars.forEach(function (bar) {
        observer.observe(bar); // hint: what are we watching?
    });
}


//MY PROJECTS
const filterButtons = document.querySelectorAll('.js-filter-btn');
const projectCards = document.querySelectorAll('.js-project-card');

if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Get filter value from the clicked button
            const filter = button.dataset.filter;

            //Remove 'active' from all-button first
            filterButtons.forEach((button) => {
                button.classList.remove('active');
            });

            //Add  'active' to the clicked button only
            button.classList.add('active');

            // Loop through every card
            projectCards.forEach((card) => {
                const category = card.dataset.category;

                // Decide to show or hide based on filter
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}



// --CONTACT--//
const contactForm = document.querySelector('.js-contact-form');

if (contactForm) {

    // Validate name
    function validateName() {
        // Get values
        const name = document.querySelector('.js-name-input').value.trim();

        //Get error elements
        const nameError = document.querySelector('#nameError');
        nameError.textContent = '';

        if (name === '') {
            nameError.textContent = 'Enter your Full names';
            return false;
        }
        return true;
    }


    // Validate Email
    function validateEmail() {
        //Get values
        const email = document.querySelector('.js-email-input').value.trim();

        //Get error elements
        const emailError = document.querySelector('#emailError');
        emailError.textContent = '';

        if (email === '') {
            emailError.textContent = 'Enter your Email address';
            return false;
        } else if (!email.includes('@') || !email.includes('.')) {
            emailError.textContent = 'Use the correct email format';
            return false;
        }
        return true;
    }


    // Validate message
    function validateMessage() {
        // Get values
        const message = document.querySelector('.js-text-area').value.trim();

        //Get error elements
        const messageError = document.querySelector('#messageError');
        messageError.textContent = '';

        if (message === '') {
            messageError.textContent = 'Type the correct message';
            return false;
        }
        return true;
    }

    // ---- Real-time Validation (blur) ----
    document.querySelector('.js-name-input').addEventListener('blur', validateName);
    document.querySelector('.js-email-input').addEventListener('blur', validateEmail);
    document.querySelector('.js-text-area').addEventListener('blur', validateMessage);

    //--SUBMIT--//
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Run all validations — if ALL return true, form is valid
        const isValid = validateName() & validateEmail() & validateMessage();

        if (isValid) {
            const successMessage = document.querySelector('#successMsg'); successMessage.textContent = 'Message sent successfully';
            contactForm.reset();

            setTimeout(() => {
                successMessage.textContent = '';
            }, 2000);
        }
    });
}