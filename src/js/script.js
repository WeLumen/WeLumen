/* =========================
   HERO SLIDER
========================= */
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const nextHero = document.getElementById('next');
const prevHero = document.getElementById('prev');

let heroIndex = 0;
let heroInterval;

function showHeroSlide(i){
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[i].classList.add('active');
  dots[i].classList.add('active');
  heroIndex = i;
}

function nextHeroSlide(){
  showHeroSlide((heroIndex + 1) % slides.length);
}

function prevHeroSlide(){
  showHeroSlide((heroIndex - 1 + slides.length) % slides.length);
}

function startHeroInterval(){
  heroInterval = setInterval(nextHeroSlide, 5000);
}

function resetHeroInterval(){
  clearInterval(heroInterval);
  startHeroInterval();
}

if (slides.length) {
  startHeroInterval();
}

if (nextHero && prevHero) {
  nextHero.onclick = () => {
    nextHeroSlide();
    resetHeroInterval();
  };

  prevHero.onclick = () => {
    prevHeroSlide();
    resetHeroInterval();
  };
}

dots.forEach(dot => {
  dot.onclick = () => {
    showHeroSlide(Number(dot.dataset.slide));
    resetHeroInterval();
  };
});

/* =========================
   MOBILE MENU
========================= */
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('siteNav');
const navBackdrop = document.querySelector('.nav-backdrop');

function openNav(){
  document.body.classList.add('nav-open');
  if (navToggle) {
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Fechar menu');
  }
}

function closeNav(){
  document.body.classList.remove('nav-open');
  if (navToggle) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
  }
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    if (document.body.classList.contains('nav-open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });
}

if (navBackdrop) {
  navBackdrop.addEventListener('click', closeNav);
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeNav();
  }
});


/* =========================
   PORTFOLIO FILTER
========================= */
const filters = document.querySelectorAll('.portfolio-filter li');
const items = document.querySelectorAll('.portfolio-item');

filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('active'));
    filter.classList.add('active');

    const category = filter.dataset.filter;

    items.forEach(item => {
      const itemCategory = item.dataset.category || '';

      item.style.display =
        category === 'all' || itemCategory.includes(category)
          ? 'block'
          : 'none';
    });
  });
});


/* =========================
   TESTIMONIALS SLIDER (2 POR VEZ)
========================= */
const testimonialTrack = document.querySelector('.testimonials-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const nextTestimonial = document.querySelector('.testimonials-nav .next');
const prevTestimonial = document.querySelector('.testimonials-nav .prev');

let testimonialIndex = 0;
let testimonialInterval;

function updateTestimonialSlide(){
  if (!testimonialCards.length) return;

  const cardWidth = testimonialCards[0].offsetWidth + 30;
  testimonialTrack.style.transform =
    `translateX(-${testimonialIndex * cardWidth}px)`;
}

function startTestimonialInterval(){
  testimonialInterval = setInterval(() => {
    if (testimonialIndex < testimonialCards.length - 2) {
      testimonialIndex++;
    } else {
      testimonialIndex = 0;
    }
    updateTestimonialSlide();
  }, 5000);
}

function resetTestimonialInterval(){
  clearInterval(testimonialInterval);
  startTestimonialInterval();
}

if (nextTestimonial && prevTestimonial) {
  nextTestimonial.onclick = () => {
    if (testimonialIndex < testimonialCards.length - 2) {
      testimonialIndex++;
    } else {
      testimonialIndex = 0;
    }
    updateTestimonialSlide();
    resetTestimonialInterval();
  };

  prevTestimonial.onclick = () => {
    if (testimonialIndex > 0) {
      testimonialIndex--;
    } else {
      testimonialIndex = testimonialCards.length - 2;
    }
    updateTestimonialSlide();
    resetTestimonialInterval();
  };
}

if (testimonialTrack && testimonialCards.length > 1) {
  startTestimonialInterval();
}
/* =========================
   CTA PARALLAX SCROLL
========================= */
const cta = document.querySelector('.cta-lumen');

window.addEventListener('scroll', () => {
  if (!cta) return;

  const rect = cta.getBoundingClientRect();
  const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

  const move = Math.max(-30, Math.min(30, scrollProgress * 60 - 30));

  cta.style.backgroundPosition = `center ${50 + move}%`;
});

/* =========================
   BACK TO TOP
========================= */
const backToTop = document.querySelector('.back-to-top');

function toggleBackToTop(){
  if (!backToTop) return;
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
}

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.addEventListener('scroll', toggleBackToTop);
toggleBackToTop();
