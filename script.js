// ===== Navbar: scrolled state + mobile burger =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const burger = document.getElementById('nav-burger');
    const links = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    if (burger && links) {
        burger.addEventListener('click', () => {
            const open = links.classList.toggle('open');
            burger.setAttribute('aria-expanded', String(open));
        });

        links.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                links.classList.remove('open');
                burger.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// ===== Menu tabs =====
function initMenuTabs() {
    const tabs = document.querySelectorAll('.menu-tab');
    const panes = document.querySelectorAll('.menu-pane');

    if (!tabs.length || !panes.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => {
                const active = t === tab;
                t.classList.toggle('active', active);
                t.setAttribute('aria-selected', String(active));
            });

            panes.forEach(p => {
                const show = p.dataset.pane === target;
                p.hidden = !show;
                p.classList.toggle('active', show);
            });
        });
    });
}

// ===== Scroll reveal =====
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// ===== Smooth anchor offset (fixed navbar) =====
function initAnchorOffset() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const id = anchor.getAttribute('href');
            if (id === '#' || id.length < 2) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 72;
            window.scrollTo({ top, behavior: 'smooth' });
            history.replaceState(null, '', id);
        });
    });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMenuTabs();
    initScrollReveal();
    initAnchorOffset();
});
