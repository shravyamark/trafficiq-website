(() => {
  const init = () => {

  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  const navLinks = nav ? [...nav.querySelectorAll('a')] : [];
  const form = document.querySelector('[data-contact-form]');
  const formStatus = document.querySelector('[data-form-status]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 18);
  };

  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  const closeNav = () => {
    if (!navToggle || !nav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  };

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('nav-open', !isOpen);
    });

    navLinks.forEach((link) => link.addEventListener('click', closeNav));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeNav();
    });
  }

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const revealNodes = [...document.querySelectorAll('.reveal')];
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealNodes.forEach((node) => node.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' }
    );

    revealNodes.forEach((node, index) => {
      node.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      observer.observe(node);
    });
  }

  const eventTime = document.querySelector('[data-event-time]');
  const eventCopy = document.querySelector('[data-event-copy]');
  const confidence = document.querySelector('[data-confidence]');
  const behavior = document.querySelector('[data-behavior]');
  const eventStates = [
    { time: '14:32:08', copy: 'candidate AV · confidence 0.94', confidence: '94%', behavior: 'Right turn' },
    { time: '14:32:10', copy: 'behavior classified · right turn', confidence: '92%', behavior: 'Right turn' },
    { time: '14:32:12', copy: 'track complete · trajectory 10 Hz', confidence: '96%', behavior: 'Track complete' },
    { time: '14:32:14', copy: 'privacy policy · raw buffer released', confidence: '95%', behavior: 'Redacted' }
  ];

  if (!reducedMotion && eventTime && eventCopy && confidence && behavior) {
    let eventIndex = 0;
    window.setInterval(() => {
      eventIndex = (eventIndex + 1) % eventStates.length;
      const current = eventStates[eventIndex];
      eventTime.textContent = current.time;
      eventCopy.textContent = current.copy;
      confidence.textContent = current.confidence;
      behavior.textContent = current.behavior;
    }, 3500);
  }

  if (reducedMotion) {
    const animatedSvg = document.querySelector('.traffic-map');
    if (animatedSvg && typeof animatedSvg.pauseAnimations === 'function') {
      animatedSvg.pauseAnimations();
    }
  }

  if (form && formStatus) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      const originalLabel = button ? button.innerHTML : '';

      if (button) {
        button.disabled = true;
        button.textContent = 'Message captured';
      }

      formStatus.textContent = 'Demo submission received — connect this form to your preferred endpoint before launch.';
      formStatus.classList.add('is-success');

      window.setTimeout(() => {
        form.reset();
        if (button) {
          button.disabled = false;
          button.innerHTML = originalLabel;
        }
      }, 1400);
    });
  }

  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
