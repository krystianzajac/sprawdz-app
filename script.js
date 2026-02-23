// =============================================
// Sprawdź.app — Language Toggle & Interactions
// =============================================

(function () {
    'use strict';

    // --- Language Toggle ---

    const STORAGE_KEY = 'sprawdz_lang';
    let currentLang = detectLanguage();

    function detectLanguage() {
        // Check localStorage first
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'pl' || saved === 'en') return saved;

        // Auto-detect from browser
        const browserLang = navigator.language || navigator.userLanguage || '';
        return browserLang.startsWith('pl') ? 'pl' : 'en';
    }

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem(STORAGE_KEY, lang);

        // Update html lang attribute
        document.documentElement.lang = lang;

        // Update all [data-pl] / [data-en] elements
        document.querySelectorAll('[data-pl][data-en]').forEach(function (el) {
            el.innerHTML = el.getAttribute('data-' + lang);
        });

        // Update toggle button
        var flag = document.getElementById('langFlag');
        var label = document.getElementById('langLabel');
        if (flag) flag.textContent = lang === 'pl' ? '🇵🇱' : '🇬🇧';
        if (label) label.textContent = lang === 'pl' ? 'PL' : 'EN';

        // Update page title
        document.title = lang === 'pl'
            ? 'Sprawdź — Wykrywanie wpływu alkoholu na podstawie głosu'
            : 'Sprawdź — Voice-Based Sobriety Check';

        // Update meta description
        var metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.content = lang === 'pl'
                ? 'Sprawdź analizuje Twój głos i czas reakcji, by oszacować wpływ alkoholu. Na podstawie badań Uniwersytetu Stanforda. Darmowa, prywatna, natychmiastowa.'
                : 'Sprawdź analyses your voice and reaction time to estimate alcohol impairment. Based on Stanford University research. Free, private, instant.';
        }
    }

    // Toggle handler
    var toggleBtn = document.getElementById('langToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            applyLanguage(currentLang === 'pl' ? 'en' : 'pl');
        });
    }

    // Apply on load
    applyLanguage(currentLang);

    // --- Navbar scroll effect ---

    var nav = document.getElementById('nav');
    var lastScrollY = 0;

    function handleScroll() {
        var scrollY = window.scrollY || window.pageYOffset;
        if (scrollY > 20) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // --- Smooth scroll for anchor links ---

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var navHeight = nav ? nav.offsetHeight : 64;
                var targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    // --- Fade-in on scroll (Intersection Observer) ---

    if ('IntersectionObserver' in window) {
        // Tag elements for animation
        var animatableSelectors = [
            '.problem__card',
            '.stat',
            '.step',
            '.feature',
            '.transformation__before',
            '.transformation__after',
            '.guide__badge',
            '.guide__inner h2',
            '.guide__lead',
            '.stakes__inner',
            '.download__inner'
        ];

        animatableSelectors.forEach(function (selector) {
            document.querySelectorAll(selector).forEach(function (el) {
                el.classList.add('fade-up');
            });
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Stagger children in the same parent
                    var parent = entry.target.parentElement;
                    var siblings = parent ? parent.querySelectorAll('.fade-up') : [];
                    var index = Array.prototype.indexOf.call(siblings, entry.target);
                    var delay = Math.max(0, index) * 80;

                    setTimeout(function () {
                        entry.target.classList.add('visible');
                    }, delay);

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('.fade-up').forEach(function (el) {
            observer.observe(el);
        });
    }

    // --- Gauge animation on hero phone mockup ---

    function animateGaugeOnLoad() {
        var gaugeFill = document.querySelector('.gauge-fill');
        if (!gaugeFill) return;

        // Animate the stroke-dasharray after a delay
        gaugeFill.style.strokeDasharray = '0 200';
        gaugeFill.style.transition = 'stroke-dasharray 1.2s ease-out';

        setTimeout(function () {
            gaugeFill.style.strokeDasharray = '45 200';
        }, 800);
    }

    // Run after page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', animateGaugeOnLoad);
    } else {
        animateGaugeOnLoad();
    }

})();
