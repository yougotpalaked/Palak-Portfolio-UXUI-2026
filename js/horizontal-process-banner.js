/**
 * horizontal-process-banner.js
 * JavaScript functionality for horizontal process banners with hover cards
 * For Palak Agrawal's Portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize horizontal process banners functionality
    initHorizontalProcessBanners();
    
    // Ensure project cards are visible and properly positioned
    setupProjectCards();
    
});

function initHorizontalProcessBanners() {
    // Get all project cards in the process banners
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add click event listeners to project cards
    projectCards.forEach(card => {
        // Get the href from data attribute
        const href = card.getAttribute('data-href');
        
        if (href) {
            // Make the entire card clickable
            card.addEventListener('click', function(e) {
                window.location.href = href;
            });
            
            // Add cursor style to indicate clickability
            card.style.cursor = 'pointer';
        }
    });
    
    // Get all process banners
    const processBanners = document.querySelectorAll('.process-banner');
    
    // Add mousemove event to track cursor position and show card near cursor
    processBanners.forEach(banner => {
        const cardContainer = banner.querySelector('.project-card-container');
        
        // Add mousemove event to track cursor and position the card
        banner.addEventListener('mousemove', function(e) {
            if (cardContainer) {
                // Get banner dimensions and position
                const bannerRect = banner.getBoundingClientRect();
                
                // Calculate position relative to the banner
                const x = e.clientX - bannerRect.left;
                const y = e.clientY - bannerRect.top;
                
                // Get card container dimensions
                const cardWidth = cardContainer.offsetWidth;
                const cardHeight = cardContainer.offsetHeight;
                
                // Position the card near the cursor but ensure it stays within viewport
                let cardX = x + -50; // 20px offset from cursor
                let cardY = y - cardHeight / 2; // Center vertically with cursor
                
                // Ensure the card doesn't go outside the viewport
                if (cardX + cardWidth > window.innerWidth - 20) {
                    cardX = x - cardWidth - 20; // Show on the left side of cursor
                }
                
                if (cardY < 0) {
                    cardY = 10; // Minimum top padding
                } else if (cardY + cardHeight > window.innerHeight - 10) {
                    cardY = window.innerHeight - cardHeight - 10; // Keep within bottom of viewport
                }
                
                // Apply the position
                cardContainer.style.top = `${cardY}px`;
                cardContainer.style.left = `${cardX}px`;
                
                // Show the card
                cardContainer.style.opacity = '1';
                cardContainer.style.visibility = 'visible';
                
                // Make sure the project banner image is visible
                const projectBanner = cardContainer.querySelector('.project-banner');
                if (projectBanner) {
                    projectBanner.style.display = 'block';
                    
                    // Make sure the image inside is visible
                    const projectImage = projectBanner.querySelector('.project-image');
                    if (projectImage) {
                        projectImage.style.display = 'block';
                        projectImage.style.maxWidth = '100%';
                        projectImage.style.height = 'auto';
                    }
                }
            }
        });
        
        // Hide the card when mouse leaves the banner
        banner.addEventListener('mouseleave', function() {
            if (cardContainer) {
                cardContainer.style.opacity = '0';
                cardContainer.style.visibility = 'hidden';
            }
        });
        
        // Add click event listener to the banner (excluding the card area)
        banner.addEventListener('click', function(e) {
            // Check if the click was directly on the banner (not on the card)
            if (e.target.closest('.project-card') === null) {
                // Find the project card within this banner
                const card = this.querySelector('.project-card');
                if (card) {
                    const href = card.getAttribute('data-href');
                    if (href) {
                        window.location.href = href;
                    }
                }
            }
        });
    });
    
    // Add hover effect for banners on mobile
    if (window.innerWidth <= 768) {
        processBanners.forEach(banner => {
            banner.addEventListener('touchstart', function() {
                // Remove active class from all banners
                processBanners.forEach(b => b.classList.remove('active'));
                // Add active class to current banner
                this.classList.add('active');
            });
        });
    }
}