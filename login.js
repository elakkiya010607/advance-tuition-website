/**
 * S S Tuition Center - Login Form Validation
 * Handles verification of form fields and simulated successful entry transitions.
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const nameInput = document.getElementById('student-name');
  const emailInput = document.getElementById('student-email');
  const passwordInput = document.getElementById('student-password');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');

  const successOverlay = document.getElementById('success-overlay');
  const successName = document.getElementById('success-student-name');

  // Submit Handler
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // stop browser reload

    // Reset previous errors
    resetErrors();

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const passwordVal = passwordInput.value;

    let isValid = true;

    // 1. Name Check
    if (nameVal === '') {
      showError(nameInput, nameError, 'Student Name cannot be empty.');
      isValid = false;
    }

    // 2. Email Check
    if (emailVal === '') {
      showError(emailInput, emailError, 'Email cannot be empty.');
      isValid = false;
    } else if (!validateEmail(emailVal)) {
      showError(emailInput, emailError, 'Please enter a valid email address.');
      isValid = false;
    }

    // 3. Password Check
    if (passwordVal === '') {
      showError(passwordInput, passwordError, 'Password cannot be empty.');
      isValid = false;
    } else if (passwordVal.length < 6) {
      showError(passwordInput, passwordError, 'Password must be at least 6 characters.');
      isValid = false;
    }

    // Redirect on Validation Pass
    if (isValid) {
      // Save name for Dashboard display
      sessionStorage.setItem('studentName', nameVal);

      // Display Success Animation Overlay
      successName.innerText = nameVal;
      successOverlay.classList.add('show');

      // Redirect to Dashboard Page after delay
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 2000);
    }
  });

  // Reset Handler
  loginForm.addEventListener('reset', () => {
    resetErrors();
    // remove highlights
    [nameInput, emailInput, passwordInput].forEach(input => {
      input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    });
  });

  // Help functions
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  function showError(input, errorElement, message) {
    input.style.borderColor = '#FF4D4D';
    errorElement.innerText = message;
    errorElement.style.display = 'block';
  }

  function resetErrors() {
    [nameError, emailError, passwordError].forEach(err => {
      err.style.display = 'none';
      err.innerText = '';
    });
    [nameInput, emailInput, passwordInput].forEach(input => {
      input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    });
  }

  // Active validation styling on focus
  [nameInput, emailInput, passwordInput].forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      }
    });
  });
});
