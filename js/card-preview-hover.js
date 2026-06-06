/**
 * card-preview-hover.js
 * JavaScript functionality for scrollable card preview on hover
 * For Palak Agrawal's Portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize scrollable card preview functionality
    initScrollableCardPreview();
});

function initScrollableCardPreview() {
    // Get all project bars in the process timeline
    const projectBars = document.querySelectorAll('.process-timeline .project-bar');
    
    // If no project bars exist on this page, exit
    if (projectBars.length === 0) return;
    
    // Create scrollable content containers and preview labels for each project bar
    projectBars.forEach(bar => {
        // Skip if this card already has scrollable content or has the no-hover-effect class
        if (bar.querySelector('.scrollable-content') || bar.classList.contains('no-hover-effect')) return;
        
        // Create scrollable content container
        const scrollableContent = document.createElement('div');
        scrollableContent.className = 'scrollable-content';
        
        // Get project info content
        const projectInfo = bar.querySelector('.project-info');
        const textContent = projectInfo ? projectInfo.querySelector('.text-content') : null;
        
        // Clone the text content and add additional preview content
        if (textContent) {
            // Clone the title and description
            const title = textContent.querySelector('h4');
            const description = textContent.querySelector('p');
            
            if (title) {
                const titleClone = title.cloneNode(true);
                scrollableContent.appendChild(titleClone);
            }
            
            if (description) {
                const descriptionClone = description.cloneNode(true);
                scrollableContent.appendChild(descriptionClone);
            }
            
            // Add additional preview content with case-study-specific images
            const previewContent = document.createElement('div');
            previewContent.className = 'preview-content';
            
            // Get the project link to determine which case study page this is for
            const projectLink = bar.querySelector('.project-link');
            const caseStudyUrl = projectLink ? projectLink.getAttribute('href') : '';
            
           // Determine the appropriate case study image based on the project
let caseStudyImageSrc = '';

if (caseStudyUrl.includes('zap-app')) {
    caseStudyImageSrc = 'zap/1.png';
} else if (caseStudyUrl.includes('zap-business-portal')) {
    caseStudyImageSrc = 'ZAPB/Frame 15.png';
} else if (caseStudyUrl.includes('midair')) {
    caseStudyImageSrc = 'midair/midaircase1.png';
} else if (caseStudyUrl.includes('qr-code-auto')) {
    caseStudyImageSrc = 'auto/autocase1.png';
} else if (caseStudyUrl.includes('future-you')) {
    caseStudyImageSrc = 'futureyouimg/futureyou1.png';
} else if (caseStudyUrl.includes('focus-read')) {
    caseStudyImageSrc = 'focusread/focusread11.png';
} else {
    caseStudyImageSrc = bar.querySelector('.project-image').src;
}

// 🔹 Preload image to reduce hover delay
const preloadImage = new Image();
preloadImage.src = caseStudyImageSrc;

previewContent.innerHTML = `
    <h5> Case Study Preview</h5>
    <div class="preview-image">
        <img src="${caseStudyImageSrc}" alt="Case study preview" loading="eager" />
    </div>
    <p>Click anywhere on this card to view the full case study.</p>
`;

            
            scrollableContent.appendChild(previewContent);
        }
        
        // Create scroll preview label
        const previewLabel = document.createElement('div');
        previewLabel.className = 'scroll-preview-label';
        previewLabel.textContent = 'Click to View Full Case Study';
        
        // Add elements to the project bar
        bar.appendChild(scrollableContent);
        bar.appendChild(previewLabel);
        
        // Prevent page scrolling when interacting with scrollable content
        scrollableContent.addEventListener('wheel', function(e) {
            // Check if scrollable content is at top or bottom boundary
            const isAtTop = this.scrollTop === 0;
            const isAtBottom = this.scrollTop + this.clientHeight >= this.scrollHeight - 1;
            
            // If not at boundary or scrolling away from boundary, prevent default
            if (!(isAtTop && e.deltaY < 0) && !(isAtBottom && e.deltaY > 0)) {
                e.preventDefault();
                this.scrollTop += e.deltaY;
            }
        }, { passive: false });
        
        // Handle touch events for mobile
        let touchStartY = 0;
        scrollableContent.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        scrollableContent.addEventListener('touchmove', function(e) {
            const touchY = e.touches[0].clientY;
            const scrollTop = this.scrollTop;
            const scrollHeight = this.scrollHeight;
            const clientHeight = this.clientHeight;
            
            // Check if scrollable content is at top or bottom boundary
            const isAtTop = scrollTop === 0;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
            
            // If scrolling up at top or down at bottom, allow page to scroll
            if ((isAtTop && touchY > touchStartY) || (isAtBottom && touchY < touchStartY)) {
                return;
            }
            
            // Otherwise prevent page scrolling
            e.preventDefault();
            this.scrollTop += (touchStartY - touchY);
            touchStartY = touchY;
        }, { passive: false });
    });
}