/* ==========================================================================
   FIGHTBOX BANDUNG - INTERACTIVE JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Sticky Navigation Bar & Header Scroll Effect
  const header = document.querySelector('.header');
  const navMenu = document.querySelector('.nav-menu');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 2. Mobile Menu Toggle
  function openNav() {
    navMenu.classList.add('open');
    document.body.classList.add('nav-open');
    document.body.style.overflow = 'hidden';
    if (mobileToggle) mobileToggle.querySelector('i').className = 'fas fa-times';
  }

  function closeNav() {
    navMenu.classList.remove('open');
    document.body.classList.remove('nav-open');
    document.body.style.overflow = '';
    if (mobileToggle) mobileToggle.querySelector('i').className = 'fas fa-bars';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  // Close nav when clicking the backdrop overlay
  document.addEventListener('click', (e) => {
    if (document.body.classList.contains('nav-open')) {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeNav();
      }
    }
  });

  // Close mobile menu via the in-panel close button
  const navCloseBtn = document.getElementById('nav-close-btn');
  if (navCloseBtn) {
    navCloseBtn.addEventListener('click', closeNav);
  }

  // Close mobile menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        closeNav();
      }
    });
  });

  // Close nav on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeNav();
    }
  });

  // 3. Pricelist Tab Switcher (Regular vs Private)
  const tabBtns = document.querySelectorAll('.price-tab-btn');
  const pricePanels = document.querySelectorAll('.price-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      pricePanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(targetTab);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // 4. FAQ Accordion Logic
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');

      // Close all active FAQs
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 5. Scroll Reveal Animations (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatableElements = document.querySelectorAll(
    '.section-title, .facility-card, .coach-card, .class-card, .price-card, .note-banner, .cta-box'
  );

  animatableElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // Add observer target class handler
  document.addEventListener('scroll', () => {
    document.querySelectorAll('.animate-in').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });

  // 6. Automatic Hero Wallpaper Slideshow Switcher (Black Faded - No Blur)
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 4500);
  }
});

