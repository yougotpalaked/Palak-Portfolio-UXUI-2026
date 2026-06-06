/**
 * process-index.js
 * JavaScript functionality for the process index navigation
 * Tracks scroll position and highlights the active section
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the process index
    initProcessIndex();
});

function initProcessIndex() {
    // Create the process index container if it doesn't exist
    if (!document.querySelector('.process-index-container')) {
        createProcessIndex();
    }
    
    // Set up intersection observers for sections
    observeSections();
    
    // Add click event listeners to index items
    setupIndexNavigation();
}

function createProcessIndex() {
    // Create container for the process index
    const indexContainer = document.createElement('div');
    indexContainer.className = 'process-index-container';
    
    // Add hero section to the index
    const heroItem = document.createElement('div');
    heroItem.className = 'process-index-item active';
    heroItem.setAttribute('data-target', 'hero');
    heroItem.setAttribute('data-label', 'Intro');
    indexContainer.appendChild(heroItem);
    
    // Get all process stages
    const processStages = document.querySelectorAll('.process-stage');
    
    // Create index items for each process stage
    processStages.forEach((stage, index) => {
        const stageTitle = stage.querySelector('h3').textContent.trim();
        const shortTitle = stageTitle.split('.')[1] ? stageTitle.split('.')[1].trim() : stageTitle;
        
        const indexItem = document.createElement('div');
        indexItem.className = 'process-index-item';
        indexItem.setAttribute('data-target', `process-stage-${index}`);
        indexItem.setAttribute('data-label', shortTitle);
        
        // Add the index item to the container
        indexContainer.appendChild(indexItem);
        
        // Add an ID to the corresponding stage for navigation
        stage.id = `process-stage-${index}`;
    });
    
    // Add the index container to the page
    document.body.appendChild(indexContainer);
}

function observeSections() {
    // Get all sections to observe (hero + process stages)
    const sections = [
        document.querySelector('.hero'),
        ...document.querySelectorAll('.process-stage')
    ];
    
    // Set up intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the ID of the current section
                let id;
                if (entry.target.className === 'hero') {
                    id = 'hero';
                } else {
                    id = entry.target.id;
                }
                
                // Update active index item
                if (id) updateActiveIndex(id);
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '-10% 0px -10% 0px' // Adjust the trigger area
    });
    
    // Observe all sections
    sections.forEach(section => {
        if (section) observer.observe(section);
    });
}

function updateActiveIndex(targetId) {
    // Get all index items
    const indexItems = document.querySelectorAll('.process-index-item');
    
    // Remove active class from all items
    indexItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to the current item
    let activeItem;
    
    if (targetId === 'hero') {
        // If hero section is active
        activeItem = document.querySelector('.process-index-item[data-target="hero"]');
    } else {
        // If a process stage is active
        activeItem = document.querySelector(`.process-index-item[data-target="${targetId}"]`);
    }
    
    if (activeItem) activeItem.classList.add('active');
}

function setupIndexNavigation() {
    // Get all index items
    const indexItems = document.querySelectorAll('.process-index-item');
    
    // Add click event to each item
    indexItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            
            // Scroll to the target section
            if (targetId === 'hero') {
                // Scroll to hero section
                document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
            } else {
                // Scroll to process stage
                document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
            }
            
            // Update active index item
            updateActiveIndex(targetId);
        });
    });
}