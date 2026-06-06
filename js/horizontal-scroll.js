/**
 * horizontal-scroll.js
 * JavaScript functionality for horizontal scrolling project cards
 * For Palak Agrawal's Portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize horizontal scrolling functionality
    initHorizontalScroll();
});

function initHorizontalScroll() {
    // Initialize all grid containers (formerly horizontal scrolling)
    const gridContainers = document.querySelectorAll('.works-grid');
    
    // If no grid containers exist on this page, exit
    if (gridContainers.length === 0) return;
    
    // Initialize each container
    gridContainers.forEach(container => {
        const projectBars = container.querySelectorAll('.project-bar');
        
        // Add animation classes to project cards if needed
        projectBars.forEach((bar, index) => {
            // Add staggered animation delay
            bar.setAttribute('data-aos-delay', (index * 100).toString());
        });
    });
}


function createScrollIndicators(worksGrid, count) {
    // Create container for scroll indicators
    const indicatorContainer = document.createElement('div');
    indicatorContainer.className = 'scroll-indicator';
    
    // Create individual indicators
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        dot.className = 'scroll-dot';
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        
        // Add click event to scroll to corresponding project
        dot.addEventListener('click', function() {
            const projectBars = worksGrid.querySelectorAll('.project-bar');
            if (projectBars[i]) {
                worksGrid.scrollTo({
                    left: projectBars[i].offsetLeft - worksGrid.offsetLeft,
                    behavior: 'smooth'
                });
            }
        });
        
        indicatorContainer.appendChild(dot);
    }
    
    // Add indicators after the works grid
    worksGrid.parentNode.insertBefore(indicatorContainer, worksGrid.nextSibling);
}

function createScrollArrows(worksGrid) {
    // Create container for arrows
    const arrowContainer = document.createElement('div');
    arrowContainer.className = 'scroll-arrows';
    
    // Create left arrow
    const leftArrow = document.createElement('div');
    leftArrow.className = 'scroll-arrow scroll-left';
    leftArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';
    leftArrow.addEventListener('click', function() {
        worksGrid.scrollBy({
            left: -350, // Approximate width of a project card
            behavior: 'smooth'
        });
    });
    
    // Create right arrow
    const rightArrow = document.createElement('div');
    rightArrow.className = 'scroll-arrow scroll-right';
    rightArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';
    rightArrow.addEventListener('click', function() {
        worksGrid.scrollBy({
            left: 350, // Approximate width of a project card
            behavior: 'smooth'
        });
    });
    
    // Add arrows to container
    arrowContainer.appendChild(leftArrow);
    arrowContainer.appendChild(rightArrow);
    
    // Add arrow container after the works grid
    worksGrid.parentNode.insertBefore(arrowContainer, worksGrid.nextSibling);
    
    // Show/hide arrows based on scroll position
    worksGrid.addEventListener('scroll', function() {
        updateArrowVisibility(worksGrid, leftArrow, rightArrow);
    });
    
    // Initial update
    updateArrowVisibility(worksGrid, leftArrow, rightArrow);
}

function updateScrollIndicators(worksGrid, projectBars) {
    const scrollPosition = worksGrid.scrollLeft;
    const containerWidth = worksGrid.offsetWidth;
    
    // Find which project is most visible
    let activeIndex = 0;
    let maxVisibleWidth = 0;
    
    projectBars.forEach((project, index) => {
        const projectLeft = project.offsetLeft - worksGrid.offsetLeft;
        const projectRight = projectLeft + project.offsetWidth;
        
        // Calculate how much of the project is visible
        const visibleLeft = Math.max(projectLeft, scrollPosition);
        const visibleRight = Math.min(projectRight, scrollPosition + containerWidth);
        const visibleWidth = Math.max(0, visibleRight - visibleLeft);
        
        if (visibleWidth > maxVisibleWidth) {
            maxVisibleWidth = visibleWidth;
            activeIndex = index;
        }
    });
    
    // Update indicators
    const indicators = document.querySelectorAll('.scroll-dot');
    indicators.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

function updateArrowVisibility(worksGrid, leftArrow, rightArrow) {
    // Show/hide left arrow based on scroll position
    leftArrow.style.opacity = worksGrid.scrollLeft > 20 ? '0.8' : '0.3';
    leftArrow.style.pointerEvents = worksGrid.scrollLeft > 20 ? 'auto' : 'none';
    
    // Show/hide right arrow based on whether we can scroll further right
    const canScrollRight = worksGrid.scrollWidth > worksGrid.scrollLeft + worksGrid.offsetWidth + 20;
    rightArrow.style.opacity = canScrollRight ? '0.8' : '0.3';
    rightArrow.style.pointerEvents = canScrollRight ? 'auto' : 'none';
}