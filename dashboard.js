/**
 * S S Tuition Center - Student Dashboard Scripts
 * Checks sessions, handles logins/logouts, displays toasts, and launches help modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Session validation
  const studentName = sessionStorage.getItem('studentName');
  if (!studentName) {
    // If not logged in, redirect to login page immediately
    window.location.href = 'login.html';
    return;
  }

  // Populate Student Name in Dashboard fields
  populateStudentData(studentName);

  // Initialize interactive widgets
  initLogout();
  initDashboardActions();
  initNoticeBoardInteractions();
});

/* --- POPULATE STUDENT FIELDS --- */
function populateStudentData(name) {
  const welcomeSpan = document.getElementById('welcome-student-name');
  const avatarDiv = document.getElementById('user-avatar-initials');
  const profileName = document.getElementById('profile-student-name');

  // Welcome banner greeting
  if (welcomeSpan) welcomeSpan.innerText = name;
  if (profileName) profileName.innerText = name;

  // Profile avatar initials (first letters of name, up to 2 characters)
  if (avatarDiv) {
    const initials = name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
    avatarDiv.innerText = initials || 'ST';
  }
}

/* --- LOGOUT LOGIC --- */
function initLogout() {
  const logoutBtns = document.querySelectorAll('.logout-trigger');

  logoutBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Clear session values
      sessionStorage.removeItem('studentName');
      
      // Redirect back to login
      window.location.href = 'login.html';
    });
  });
}

/* --- DASHBOARD ACTION BUTTONS & MODALS --- */
function initDashboardActions() {
  const downloadTriggers = document.querySelectorAll('.download-trigger');
  const contactTrigger = document.getElementById('contact-teacher-btn');
  
  const contactModalOverlay = document.getElementById('contact-modal-overlay');
  const closeContactBtn = document.getElementById('close-contact-modal');
  const contactOkBtn = document.getElementById('contact-modal-dismiss');

  // Download Action (Toast success popup simulator)
  downloadTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const fileName = trigger.getAttribute('data-file') || 'Revision_Notes.pdf';
      showToastNotification(`Downloaded file: ${fileName} successfully!`);
    });
  });

  // Contact Teacher Modal Trigger
  if (contactTrigger) {
    contactTrigger.addEventListener('click', () => {
      contactModalOverlay.classList.add('active');
    });
  }

  // Close Contact Modal
  const closeContact = () => contactModalOverlay.classList.remove('active');
  if (closeContactBtn) closeContactBtn.addEventListener('click', closeContact);
  if (contactOkBtn) contactOkBtn.addEventListener('click', closeContact);
  if (contactModalOverlay) {
    contactModalOverlay.addEventListener('click', (e) => {
      if (e.target === contactModalOverlay) closeContact();
    });
  }
}

/* --- SHOW TOAST NOTIFICATION --- */
function showToastNotification(message) {
  // Create dynamic toast elements if not present in HTML, or reuse existing one
  let toast = document.getElementById('dashboard-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'dashboard-toast';
    toast.className = 'toast-success';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span id="toast-text"></span>`;
    document.body.appendChild(toast);
  }

  const toastText = document.getElementById('toast-text');
  toastText.innerText = message;

  // slide in
  toast.classList.add('show');

  // slide out after 3.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* --- NOTICE BOARD BOARD LOGS --- */
function initNoticeBoardInteractions() {
  const notices = document.querySelectorAll('.notice-item');

  notices.forEach(notice => {
    notice.addEventListener('click', () => {
      const heading = notice.querySelector('h4').innerText;
      const details = notice.getAttribute('data-details') || 'Regular schedule details apply.';
      
      showToastNotification(`Notice: ${heading} - ${details}`);
    });
  });
}
