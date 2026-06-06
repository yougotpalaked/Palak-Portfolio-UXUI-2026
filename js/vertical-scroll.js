/**
 * vertical-scroll.js
 * JavaScript functionality for vertical scrolling project cards with diagonal effect
 * For Palak Agrawal's Portfolio
 * Enhanced with brochure-like opening animation for project cards
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize vertical scrolling functionality
    initVerticalScroll();
    
    // Initialize brochure-like animation for project cards
    initBrochureAnimation();
});

function initVerticalScroll() {
    // Get all project bars in the process timeline
    const projectBars = document.querySelectorAll('.process-timeline .project-bar');
    
    // If no project bars exist on this page, exit
    if (projectBars.length === 0) return;
    
    // Create scroll indicators if they don't exist
    createScrollIndicators(projectBars.length);
    
    // Set up intersection observer to detect when project bars come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add or remove in-view class based on visibility
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Update active indicator
                const index = Array.from(projectBars).indexOf(entry.target);
                updateActiveIndicator(index);
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '-10% 0px -10% 0px' // Adjust the trigger area
    });
    
    // Observe all project bars
    projectBars.forEach(bar => {
        observer.observe(bar);
    });
    
    // Add click event to scroll indicators
    const indicators = document.querySelectorAll('.process-nav-dot');
    indicators.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            projectBars[index].scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function createScrollIndicators(count) {
    // Check if indicators already exist
    if (document.querySelector('.process-nav')) return;
    
    // Create container for scroll indicators
    const indicatorContainer = document.createElement('div');
    indicatorContainer.className = 'process-nav';
    
    // Create individual indicators
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        dot.className = 'process-nav-dot';
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        
        indicatorContainer.appendChild(dot);
    }
    
    // Add indicators to the page
    const processTimeline = document.querySelector('.process-timeline');
    if (processTimeline) {
        processTimeline.parentNode.appendChild(indicatorContainer);
    }
}

function updateActiveIndicator(index) {
    const dots = document.querySelectorAll('.process-nav-dot');
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

/**
 * Initializes the brochure-like animation for project cards
 * Creates an interactive unfolding effect when hovering over cards
 */
function initBrochureAnimation() {
    const projectBars = document.querySelectorAll('.process-timeline .project-bar');
    
    projectBars.forEach(bar => {
        const banner = bar.querySelector('.project-banner');
        const image = bar.querySelector('.project-image');
        const projectLink = bar.querySelector('.project-link');
        
        // Make the entire card clickable
        bar.addEventListener('click', (e) => {
            // Only navigate if the click wasn't on the button itself
            // This prevents double navigation when clicking the button
            if (!e.target.closest('.btn')) {
                e.preventDefault();
                // Get the href from the card's project link and navigate to it
                if (projectLink) {
                    const href = projectLink.getAttribute('href');
                    window.location.href = href;
                }
            }
        });
        
        // Add mouse enter event for smooth animation
        bar.addEventListener('mouseenter', () => {
            // Add class for tracking animation state
            bar.classList.add('opening');
            
            // Simple hover effect without perspective
            setTimeout(() => {
                bar.classList.add('fully-open');
            }, 150);
        });
        
        // Add mouse leave event for closing animation
        bar.addEventListener('mouseleave', () => {
            // Remove fully open state first
            bar.classList.remove('fully-open');
            
            // Then remove opening class after a delay
            setTimeout(() => {
                bar.classList.remove('opening');
            }, 300);
        });
        
        // Simplified mouse move event without perspective effects
        bar.addEventListener('mousemove', (e) => {
            if (!bar.classList.contains('opening')) return;
            
            if (bar.classList.contains('fully-open')) {
                // Simple scale effect without rotation
                image.style.transform = 'scale(1.05)';
            }
        });
    });
}