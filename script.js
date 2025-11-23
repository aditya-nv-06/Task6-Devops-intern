// ==================================
// Mobile Menu Toggle Functionality
// ==================================

/**
 * Toggle mobile navigation menu visibility
 * Handles hamburger menu animation and menu display on small screens
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // Toggle active class on menu
            navMenu.classList.toggle('active');
            
            // Update ARIA attribute for accessibility
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking on a navigation link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = menuToggle.contains(event.target) || navMenu.contains(event.target);
            if (!isClickInside && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// ==================================
// Form Validation and Submission
// ==================================

/**
 * Validate email format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Display error message for a form field
 * @param {string} fieldId - ID of the form field
 * @param {string} message - Error message to display
 */
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field && errorElement) {
        field.classList.add('error');
        errorElement.textContent = message;
    }
}

/**
 * Clear error message for a form field
 * @param {string} fieldId - ID of the form field
 */
function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field && errorElement) {
        field.classList.remove('error');
        errorElement.textContent = '';
    }
}

/**
 * Clear all form errors
 */
function clearAllErrors() {
    clearError('name');
    clearError('email');
    clearError('message');
}

/**
 * Validate contact form fields
 * @returns {boolean} - True if all fields are valid
 */
function validateForm() {
    let isValid = true;
    clearAllErrors();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate name
    if (name === '') {
        showError('name', 'Please enter your name');
        isValid = false;
    } else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }

    // Validate email
    if (email === '') {
        showError('email', 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate message
    if (message === '') {
        showError('message', 'Please enter a message');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }

    return isValid;
}

/**
 * Show success message after form submission
 */
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.add('show');
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
}

/**
 * Initialize contact form validation and submission handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // Handle form submission
        contactForm.addEventListener('submit', function(event) {
            // Prevent default form submission
            event.preventDefault();

            // Validate form
            if (validateForm()) {
                // Form is valid - show success message
                showSuccessMessage();
                
                // Reset form after successful submission
                contactForm.reset();
                clearAllErrors();
                
                // Log success (in production, this would send data to server)
                console.log('Form submitted successfully!');
            }
        });

        // Real-time validation on blur (when field loses focus)
        const formFields = ['name', 'email', 'message'];
        formFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', function() {
                    // Only validate if field has been touched
                    if (this.value.trim() !== '') {
                        validateForm();
                    }
                });

                // Clear error on input
                field.addEventListener('input', function() {
                    clearError(fieldId);
                });
            }
        });
    }
}

// ==================================
// Smooth Scrolling for Navigation Links
// ==================================

/**
 * Enable smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================================
// Initialize All Functionality
// ==================================

/**
 * Initialize all scripts when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    console.log('Website initialized successfully!');
});
