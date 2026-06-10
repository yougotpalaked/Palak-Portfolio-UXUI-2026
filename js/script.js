/**
 * Main JavaScript file for Palak Agrawal's Portfolio
 * This file handles animations, navigation, and interactivity
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize elements
    const pupils = document.querySelectorAll('.pupil');
    const eyeWrappers = document.querySelectorAll('.eye-wrapper');
    const eyeContainer = document.querySelector('.eye-container');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const projectCards = document.querySelectorAll('.project-card');
    const uxProcessSection = document.querySelector('.ux-process');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Eye movement tracking
    function moveEyes(event) {
        // Get mouse or touch position
        const mouseX = event.clientX || (event.touches && event.touches[0] ? event.touches[0].clientX : 0);
        const mouseY = event.clientY || (event.touches && event.touches[0] ? event.touches[0].clientY : 0);

        // Move each pupil to follow cursor
        pupils.forEach((pupil) => {
            // Get the eye element (parent of pupil)
            const eye = pupil.parentElement;
            const eyeRect = eye.getBoundingClientRect();
            
            // Calculate eye center position
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;

            // Calculate angle and distance for pupil movement
            const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
            const maxDistance = eye.offsetWidth / 4; // Limit how far pupil can move
            const distance = Math.min(
                Math.hypot(mouseX - eyeCenterX, mouseY - eyeCenterY),
                maxDistance
            );

            // Calculate pupil movement
            const moveX = Math.cos(angle) * distance * 0.4;
            const moveY = Math.sin(angle) * distance * 0.4;

            // Apply transformation to pupil
            pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;

            // Update shadow position and intensity
            const eyeWrapper = eye.closest('.eye-wrapper');
            const shadow = eyeWrapper ? eyeWrapper.querySelector('.shadow') : null;
            
            if (shadow) {
                const shadowAngle = Math.atan2(eyeCenterY - mouseY, eyeCenterX - mouseX);
                const shadowDistance = Math.min(distance / 8, 12); /* Increased max distance for more pronounced shadow movement */
                const shadowX = Math.cos(shadowAngle) * shadowDistance;
                const shadowY = Math.sin(shadowAngle) * shadowDistance;

                const maxWindowDistance = Math.max(window.innerWidth, window.innerHeight) / 2;
                const normalizedDistance = Math.min(distance / maxWindowDistance, 1);
                const shadowIntensity = 0.5 + (0.5 * (1 - normalizedDistance)); /* Further increased base intensity for deeper shadow */
                const blurAmount = 8 + (normalizedDistance * 8); /* Increased blur effect for more pronounced shadow */
                
                shadow.style.transform = `translate(${shadowX}px, ${shadowY}px)`;
                shadow.style.background = `rgba(32, 31, 31, ${shadowIntensity})`;
                shadow.style.filter = `blur(${blurAmount}px)`;
                shadow.style.boxShadow = `0 ${4 + normalizedDistance * 8}px ${8 + normalizedDistance * 8}px rgba(0, 0, 0, 0.5)`; /* Dynamic shadow depth */
            }
        });
    }

    // Initialize eye position on page load
    moveEyes({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });

    // Mouse tracking with throttling for better performance
    let ticking = false;
    document.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                moveEyes(e);
                ticking = false;
            });
            ticking = true;
        }
    });

    // Touch tracking
    document.addEventListener('touchmove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                moveEyes(e);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Dark Mode Toggle
    if (darkModeToggle) {
        const moonIcon = darkModeToggle.querySelector('i');
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'enabled') {
            document.body.classList.add('dark-mode');
            moonIcon.classList.replace('fa-moon', 'fa-sun');
        }

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            moonIcon.classList.toggle('fa-moon', !isDark);
            moonIcon.classList.toggle('fa-sun', isDark);
            localStorage.setItem('darkMode', isDark ? 'enabled' : null);
        });
    }

    // Mobile Nav
    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            navLinks.forEach((link, index) => {
                link.style.animation = link.style.animation ? '' : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            });
            burger.classList.toggle('toggle');
        });
    }

    // Enhanced Timeline scroll animation with staggered reveal
    function checkTimelineItems() {
        timelineItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < window.innerHeight * 0.8) {
                // Add staggered delay based on index
                setTimeout(() => {
                    item.classList.add('visible');
                    // Add a subtle animation to the timeline content when it becomes visible
                    const content = item.querySelector('.timeline-content');
                    if (content) {
                        content.style.animation = `pulseScale 0.5s ease forwards`;
                    }
                }, index * 150); // 150ms delay between each item
            }
        });
    }

    // Check timeline items on load and scroll
    checkTimelineItems();
    window.addEventListener('scroll', checkTimelineItems);

    // Add 3D card flip effect to project cards
    projectCards.forEach(card => {
        // Create card inner container for 3D flip
        const cardContent = card.innerHTML;
        const projectInfo = card.querySelector('.project-info');
        const projectTitle = projectInfo ? projectInfo.querySelector('h4').textContent : '';
        const projectDesc = projectInfo ? projectInfo.querySelector('p').textContent : '';
        
        // Create front and back of card
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${cardContent}</div>
                <div class="card-back">
                    <h4>${projectTitle}</h4>
                    <p>${projectDesc}</p>
                    <button class="btn">View Details</button>
                </div>
            </div>
            <div class="highlight"></div>
        `;
        
        // Make the entire card clickable
        const parentLink = card.closest('a');
        if (parentLink) {
            const href = parentLink.getAttribute('href');
            card.querySelector('.card-back .btn').addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = href;
            });
        }
    });

    // Add cursor-following highlight effect to project cards
    if (uxProcessSection) {
        uxProcessSection.addEventListener('mousemove', (e) => {
            projectCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const highlight = card.querySelector('.highlight');
                
                // Check if mouse is over this card
                if (
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom
                ) {
                    // Calculate position relative to card
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // Position the highlight at cursor position
                    highlight.style.left = `${x}px`;
                    highlight.style.top = `${y}px`;
                    highlight.style.opacity = '1';
                    
                    // Add 3D tilt effect based on cursor position
                    const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
                    const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1
                    card.style.transform = `perspective(1000px) rotateY(${xPercent * 5}deg) rotateX(${yPercent * -5}deg) translateZ(10px)`;
                } else {
                    // Mouse not over this card
                    highlight.style.opacity = '0';
                    card.style.transform = '';
                }
            });
            
            // Add parallax effect to timeline items
            const { left, top, width, height } = uxProcessSection.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            timelineItems.forEach(item => {
                const content = item.querySelector('.timeline-content');
                if (content && item.classList.contains('visible')) {
                    content.style.transform = `translateY(-5px) rotateX(${y * 5}deg) rotateY(${x * -5}deg)`;
                }
            });
        });
        
        // Reset transforms when mouse leaves the section
        uxProcessSection.addEventListener('mouseleave', () => {
            timelineItems.forEach(item => {
                const content = item.querySelector('.timeline-content');
                if (content) {
                    content.style.transform = '';
                }
            });
            
            projectCards.forEach(card => {
                const highlight = card.querySelector('.highlight');
                highlight.style.opacity = '0';
                card.style.transform = '';
            });
        });
    }
    
    // Add enhanced floating animation to project cards
    projectCards.forEach((card, index) => {
        // Stagger the animation start time
        const delay = index * 0.2;
        card.style.animation = `enhancedFloat 6s ease-in-out ${delay}s infinite`;
    });
    
    // Add interactive timeline transitions
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        const heading = content ? content.querySelector('h3') : null;
        
        if (heading) {
            // Wrap the heading text in a span for animation
            const text = heading.textContent;
            heading.innerHTML = `<span class="process-stage">${text}</span>`;
            
            // Add click event to show a pulse animation
            heading.addEventListener('click', () => {
                const stage = heading.querySelector('.process-stage');
                stage.style.animation = 'pulseGlow 1s';
                setTimeout(() => {
                    stage.style.animation = '';
                }, 1000);
            });
        }
    });
    
    // Add AOS-like scroll-in animations for other elements
    const animatedElements = document.querySelectorAll('[data-aos]');
    function checkAnimatedElements() {
        animatedElements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight * 0.8) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    // Check animated elements on load and scroll
    checkAnimatedElements();
    
    // Hero section fade out on scroll
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-stacked-content');
    
    function fadeHeroOnScroll() {
        if (heroSection && heroContent) {
            // Calculate how far the user has scrolled as a percentage
            // We'll start fading at 0% scroll and be completely faded by 50% of viewport height
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            const fadeOutThreshold = viewportHeight * 0.5; // 50% of viewport height
            
            // Calculate opacity based on scroll position (1 at top, 0 at fadeOutThreshold)
            let opacity = 1 - (scrollPosition / fadeOutThreshold);
            
            // Clamp opacity between 0 and 1
            opacity = Math.max(0, Math.min(1, opacity));
            
            // Apply the opacity to the hero section without affecting position
            heroContent.style.opacity = opacity;
            
            // Remove the translateY effect that was causing the dragging
            // heroContent.style.transform = `translateY(${translateY}px)`;
        }
    }
    
    // Initial call to set the correct state on page load
    fadeHeroOnScroll();
    
    // Add the scroll event listener
    window.addEventListener('scroll', function() {
        checkAnimatedElements();
        fadeHeroOnScroll();
    });
    
    // Add keyframe styles for animations
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes pulseScale {
            0% {
                opacity: 0;
                transform: scale(0.95);
            }
            50% {
                opacity: 1;
                transform: scale(1.02);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes floatAnimation {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-8px);
            }
            100% {
                transform: translateY(0);
            }
        }
        
        @keyframes shimmer {
            0% {
                background-position: -100% 0;
            }
            100% {
                background-position: 100% 0;
            }
        }
        
        .toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .toggle .line2 {
            opacity: 0;
        }
        
        .toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .aos-animate {
            transform: translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(styleSheet);
});

/* ── "More Projects" grid on case-study pages ──────────────────────
   Replaces the single "Next Project" card with a grid of every other
   project, excluding the one currently open. Single source of truth so
   all case-study pages stay in sync. */
(function () {
    var PROJECTS = [
        { href: "axis.html", img: "ZAPB/axis_cover.png", cat: "Ux research · App development", name: "Axis bank savings account platform", desc: "The goal was to transform the transactional banking relationship into an active loyalty ecosystem that drove customer acquisition, maximized long-term engagement, and streamlined reward redemption." },
        { href: "zap-business-portal.html", img: "zap/avalokana_cover.png", cat: "Dashboard · Civic Tech", name: "Avalokana Civic Dashboard", desc: "A civic intelligence platform surfacing urban issues for local governance." },
        { href: "co2.html", img: "midair/CO2cover.png", cat: "Case Study · Product Design", name: "CO2", desc: "A relationship-focused scheduling app that helps couples manage their personal, social, and financial commitments in one shared space." },
        { href: "zap.html", img: "zap/ZAP_new_cover.png", cat: "App · Interaction", name: "ZAP App", desc: "A mobile app designed for fast, gesture-driven everyday actions." },
        { href: "zap-design-system.html", img: "ZAPB/design_sysem_banner.png", cat: "Design System · Components", name: "Chitragupta Design System", desc: "The visual language foundation for every CG product: tokens, components, and patterns for 20+ modules." },
        { href: "chitragupta/", external: true, img: "zap/chitragupta_website_cover.png", cat: "Branding · Web", name: "Chitragupta Brand Website", desc: "Designing a brand identity and web presence for Chitragupta." },
        { href: "qr-code-auto.html", img: "auto/autoqr2.png", cat: "Research · UX", name: "QR Code in Auto", desc: "A UX research study on effective QR code placement in auto-rickshaws." },
        { href: "focus-read.html", img: "focusread/Frame 15.png", cat: "Extension · Productivity", name: "FocusRead", desc: "A browser extension designed to enhance reading focus and comprehension." }
    ];

    function esc(s) {
        return String(s).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }

    // Reduce a URL/path to its last segment without .html / trailing slash,
    // so matching works on both clean-URL servers and GitHub Pages.
    function slug(u) {
        u = String(u).split('#')[0].split('?')[0].replace(/\/+$/, '');
        return (u.split('/').pop() || '').replace(/\.html$/i, '').toLowerCase();
    }

    document.addEventListener('DOMContentLoaded', function () {
        var section = document.querySelector('.next-project-section');
        if (!section) return;

        var current = slug(location.pathname);

        var cards = PROJECTS
            .filter(function (p) { return slug(p.href) !== current; })
            .map(function (p) {
                var target = p.external ? ' target="_blank" rel="noopener noreferrer"' : '';
                return '<a href="' + p.href + '"' + target + ' class="project-card-big">'
                    + '<img src="' + p.img + '" alt="' + esc(p.name) + '">'
                    + '<div class="project-card-footer"><div class="project-card-meta">'
                    + '<div class="proj-category">' + esc(p.cat) + '</div>'
                    + '<div class="proj-name">' + esc(p.name) + '</div>'
                    + '<div class="proj-desc">' + esc(p.desc) + '</div>'
                    + '</div></div></a>';
            })
            .join('');

        section.innerHTML = '<div class="more-projects-wrap">'
            + '<h2 class="more-projects-title">More Projects</h2>'
            + '<div class="projects-grid">' + cards + '</div>'
            + '</div>';
    });
})();
