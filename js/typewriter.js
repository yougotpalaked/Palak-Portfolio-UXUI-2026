/**
 * Typewriter effect for Palak Agrawal's Portfolio
 * This script handles the typewriter animation and role switching
 * Improved for better mobile responsiveness
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get the element where the typewriter effect will be applied
    const typewriterElement = document.getElementById('role-text');
    
    if (!typewriterElement) return;
    
    // Array of roles to cycle through
    const roles = [
        'Palak Agrawal',
        'UX Designer',
        'Storyteller',
        'Student at NIFT',
        'Problem Solver'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Base typing speed in milliseconds
    
    // Function to type out the text
    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        // Set typing speed based on whether we're typing or deleting
        if (isDeleting) {
            typingSpeed = 50; // Faster when deleting
        } else {
            // Slower when typing, random variation for natural effect
            typingSpeed = 100 + Math.random() * 50;
        }
        
        // If typing
        if (!isDeleting) {
            // Get substring from 0 to current character index
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            
            // If we've typed the full text
            if (charIndex >= currentRole.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause before starting to delete
            }
        } 
        // If deleting
        else {
            // Get substring from 0 to current character index
            typewriterElement.textContent = currentRole.substring(0, charIndex);
            charIndex--;
            
            // If we've deleted all text
            if (charIndex < 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length; // Move to next role
                typingSpeed = 500; // Pause before typing next role
            }
        }
        
        // Ensure the cursor stays in the right position
        // This helps prevent layout shifts on mobile
        const container = typewriterElement.parentElement;
        if (container) {
            // Ensure container doesn't collapse and maintains proper width
            container.style.minWidth = '1px';
            
            // Adjust container width based on content to prevent layout shifts
            // Add extra space for cursor to prevent it from wrapping to next line
            const textWidth = typewriterElement.offsetWidth;
            container.style.minWidth = `${textWidth + 15}px`; // Add more space for cursor
            
            // Ensure text stays centered
            container.style.textAlign = 'center';
            container.style.display = 'inline-block';
        }
        
        // Schedule the next update
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start the typewriter effect
    setTimeout(typeEffect, 1000); // Initial delay before starting
    
    // Handle window resize to prevent layout issues
    window.addEventListener('resize', function() {
        // Reset min-width on container when window resizes
        const container = typewriterElement.parentElement;
        if (container) {
            container.style.minWidth = '1px';
        }
    });
});