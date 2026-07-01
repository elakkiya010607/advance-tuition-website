/**
 * S S Tuition Center - Main JavaScript
 * Handles Sticky Nav, Mobile Menu, Active Navigation, Scroll Reveal Animations,
 * Animated Stats Counter, and Testimonials Slider.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNavbar();
  initMobileMenu();
  initActiveNavLinkOnScroll();
  initScrollReveal();
  initStatsCounter();
  initTestimonialSlider();
});

/* --- STICKY NAVBAR --- */
function initStickyNavbar() {
  const navbar = document.querySelector('.header-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  });
}

/* --- MOBILE MENU --- */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when clicking a link
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* --- ACTIVE NAVIGATION ON SCROLL --- */
function initActiveNavLinkOnScroll() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150; // offset for sticky navbar
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      // Only highlight section IDs for home navigation on the homepage
      if (href.startsWith('#') && href === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --- SCROLL REVEAL ANIMATIONS --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    reveals.forEach(reveal => {
      const windowHeight = window.innerHeight;
      const elementTop = reveal.getBoundingClientRect().top;
      const elementVisible = 120; // threshold in px

      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  // Run once initially to catch elements already in viewport
  revealOnScroll();
}

/* --- STATS COUNTER --- */
function initStatsCounter() {
  const statsSection = document.getElementById('stats');
  const counters = document.querySelectorAll('.stat-count');
  let started = false;

  if (!statsSection) return;

  const startCounting = (entries, observer) => {
    const [entry] = entries;
    if (entry.isIntersecting && !started) {
      started = true;
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const duration = 2000; // 2 seconds
        const stepTime = Math.max(Math.floor(duration / target), 15);
        let currentCount = 0;

        const timer = setInterval(() => {
          currentCount += Math.ceil(target / (duration / stepTime));
          if (currentCount >= target) {
            counter.innerText = target;
            clearInterval(timer);
          } else {
            counter.innerText = currentCount;
          }
        }, stepTime);
      });
      // Stop observing once counts start
      observer.unobserve(statsSection);
    }
  };

  const observerOptions = {
    root: null,
    threshold: 0.3
  };

  const statsObserver = new IntersectionObserver(startCounting, observerOptions);
  statsObserver.observe(statsSection);
}

/* --- TESTIMONIAL SLIDER --- */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.querySelector('.testimonial-dots');
  
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  let slideInterval;

  // Create dot indicators
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetSlideTimer();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function startSlideTimer() {
    slideInterval = setInterval(nextSlide, 5000); // changes slide every 5 seconds
  }

  function resetSlideTimer() {
    clearInterval(slideInterval);
    startSlideTimer();
  }

  // Start slider auto-play
  startSlideTimer();
}
