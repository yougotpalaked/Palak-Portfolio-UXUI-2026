/**
 * Read More functionality for About page
 * Truncates text after specified number of paragraphs and adds a Read More button
 */

document.addEventListener('DOMContentLoaded', function() {
    const personalStory = document.querySelector('.personal-story');
    
    if (personalStory) {
        const paragraphs = personalStory.querySelectorAll('p');
        const visibleParagraphs = 3; // Show first 3 paragraphs
        
        // Only apply truncation if there are more paragraphs than the visible limit
        if (paragraphs.length > visibleParagraphs) {
            // Create container for truncated content
            const truncatedContent = document.createElement('div');
            truncatedContent.className = 'truncated-content';
            
            // Create container for hidden content
            const hiddenContent = document.createElement('div');
            hiddenContent.className = 'hidden-content';
            hiddenContent.style.display = 'none';
            
            // Move paragraphs to appropriate containers
            paragraphs.forEach((paragraph, index) => {
                if (index < visibleParagraphs) {
                    truncatedContent.appendChild(paragraph.cloneNode(true));
                } else {
                    hiddenContent.appendChild(paragraph.cloneNode(true));
                }
            });
            
            // Create Read More button
            const readMoreBtn = document.createElement('button');
            readMoreBtn.className = 'btn read-more-btn';
            readMoreBtn.textContent = 'Read More...';
            
            // Clear original content and append new structure
            personalStory.innerHTML = '';
            personalStory.appendChild(truncatedContent);
            personalStory.appendChild(hiddenContent);
            personalStory.appendChild(readMoreBtn);
            
            // Add click event to Read More button
            readMoreBtn.addEventListener('click', function() {
                if (hiddenContent.style.display === 'none') {
                    hiddenContent.style.display = 'block';
                    readMoreBtn.textContent = 'Read Less';
                    
                    // Smooth scroll to show more content
                    hiddenContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    hiddenContent.style.display = 'none';
                    readMoreBtn.textContent = 'Read More...';
                    
                    // Scroll back to the beginning of the content
                    truncatedContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    }
});