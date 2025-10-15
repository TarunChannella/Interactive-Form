document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('interactive-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone'); // Added for Phone Number
    const passwordInput = document.getElementById('password');

    // --- HELPER FUNCTIONS FOR DISPLAYING VALIDATION STATE ---
    const setValidationState = (input, isValid, message = '') => {
        const inputGroup = input.parentElement;
        const errorMessage = inputGroup.querySelector('.error-message');

        inputGroup.classList.toggle('success', isValid);
        inputGroup.classList.toggle('error', !isValid);
        
        if (errorMessage) {
            errorMessage.textContent = message;
        }
    };

    // --- REAL-TIME VALIDATION FUNCTIONS ---
    const validateName = () => {
        const value = nameInput.value.trim();
        if (value.length === 0) {
            setValidationState(nameInput, false, 'Full name is required.');
        } else if (value.length < 3) {
            setValidationState(nameInput, false, 'Name must be at least 3 characters.');
        } else {
            setValidationState(nameInput, true);
        }
    };

    const validateEmail = () => {
        const value = emailInput.value.trim();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (value.length === 0) {
            setValidationState(emailInput, false, 'Email is required.');
        } else if (!emailRegex.test(value)) {
            setValidationState(emailInput, false, 'Please enter a valid email.');
        } else {
            setValidationState(emailInput, true);
        }
    };

    // Added for Phone Number
    const validatePhone = () => {
        const value = phoneInput.value.trim();
        const phoneRegex = /^[0-9]{10}$/; // Validates a 10-digit number
        if (value.length === 0) {
            setValidationState(phoneInput, false, 'Phone number is required.');
        } else if (!phoneRegex.test(value)) {
            setValidationState(phoneInput, false, 'Enter a valid 10-digit number.');
        } else {
            setValidationState(phoneInput, true);
        }
    };

    const validatePassword = () => {
        const value = passwordInput.value;
        const strengthBar = document.getElementById('strength-bar');
        
        let strength = 0;
        if (value.length >= 8) strength++;
        if (value.match(/[a-z]/)) strength++;
        if (value.match(/[A-Z]/)) strength++;
        if (value.match(/[0-9]/)) strength++;
        if (value.match(/[^a-zA-Z0-9]/)) strength++;

        strengthBar.className = 'strength-bar';
        if (value.length > 0) {
            if (strength <= 2) {
                strengthBar.style.width = '33%';
            } else if (strength <= 4) {
                strengthBar.classList.add('medium');
                strengthBar.style.width = '66%';
            } else {
                strengthBar.classList.add('strong');
                strengthBar.style.width = '100%';
            }
        } else {
           strengthBar.style.width = '0%';
        }

        if (value.length === 0) {
             setValidationState(passwordInput, false, 'Password is required.');
        } else if (value.length < 8) {
            setValidationState(passwordInput, false, 'Password must be at least 8 characters.');
        } else {
            setValidationState(passwordInput, true);
        }
    };

    // --- EVENT LISTENERS FOR INTERACTIVITY ---
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', validatePhone); // Added for Phone Number
    passwordInput.addEventListener('input', validatePassword);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        validateName();
        validateEmail();
        validatePhone(); // Added for Phone Number
        validatePassword();

        // Check if all FOUR fields are valid
        if (form.querySelectorAll('.input-group.success').length === 4) {
            console.log('Form Submitted Successfully!');
            alert('Registration Successful!');
            form.reset();
            document.querySelectorAll('.input-group').forEach(group => {
                group.classList.remove('success', 'error');
            });
            document.getElementById('strength-bar').style.width = '0%';

        } else {
            console.log('Form validation failed.');
        }
    });
});