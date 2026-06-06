/**
 * Trauma Effect for Googly Eyes
 * This script detects rapid cursor movements and triggers a dizzy animation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    const eyeContainer = document.querySelector('.eye-container');
    const pupils = document.querySelectorAll('.pupil');
    
    // Create and append dizzy effect elements if they don't exist
    if (!document.querySelector('.dizzy-container')) {
        const dizzyContainer = document.createElement('div');
        dizzyContainer.className = 'dizzy-container';
        
        // Create two rings
        for (let i = 0; i < 2; i++) {
            const dizzyRing = document.createElement('div');
            dizzyRing.className = 'dizzy-ring';
            dizzyContainer.appendChild(dizzyRing);
        }
        
        // Create five stars
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('div');
            star.className = 'dizzy-star';
            dizzyContainer.appendChild(star);
        }
        
        // Append to eye container
        eyeContainer.appendChild(dizzyContainer);
    }
    
    // Variables to track cursor movement
    let cursorPositions = [];
    const positionHistoryLimit = 10; // Number of positions to track
    let lastTraumaTime = 0;
    const traumaCooldown = 3000; // 3 seconds cooldown between trauma effects
    
    // Function to calculate cursor speed
    function calculateCursorSpeed() {
        if (cursorPositions.length < 3) return 0;
        
        // Calculate the distance between the last few positions
        let totalDistance = 0;
        for (let i = 1; i < cursorPositions.length; i++) {
            const prev = cursorPositions[i-1];
            const curr = cursorPositions[i];
            const distance = Math.sqrt(
                Math.pow(curr.x - prev.x, 2) + 
                Math.pow(curr.y - prev.y, 2)
            );
            totalDistance += distance;
        }
        
        // Calculate average speed (distance per position)
        return totalDistance / (cursorPositions.length - 1);
    }
    
    // Function to detect direction changes
    function detectDirectionChanges() {
        if (cursorPositions.length < 4) return 0;
        
        let directionChanges = 0;
        for (let i = 2; i < cursorPositions.length; i++) {
            const p1 = cursorPositions[i-2];
            const p2 = cursorPositions[i-1];
            const p3 = cursorPositions[i];
            
            // Calculate direction vectors
            const dir1 = { x: p2.x - p1.x, y: p2.y - p1.y };
            const dir2 = { x: p3.x - p2.x, y: p3.y - p2.y };
            
            // Normalize vectors
            const mag1 = Math.sqrt(dir1.x * dir1.x + dir1.y * dir1.y);
            const mag2 = Math.sqrt(dir2.x * dir2.x + dir2.y * dir2.y);
            
            if (mag1 > 0 && mag2 > 0) {
                dir1.x /= mag1;
                dir1.y /= mag1;
                dir2.x /= mag2;
                dir2.y /= mag2;
                
                // Calculate dot product to determine angle change
                const dotProduct = dir1.x * dir2.x + dir1.y * dir2.y;
                
                // If dot product is less than 0.7, angle change is greater than ~45 degrees
                if (dotProduct < 0.7) {
                    directionChanges++;
                }
            }
        }
        
        return directionChanges;
    }
    
    // Function to trigger trauma effect
    function triggerTraumaEffect() {
        const currentTime = Date.now();
        
        // Check cooldown period
        if (currentTime - lastTraumaTime < traumaCooldown) {
            return;
        }
        
        // Update last trauma time
        lastTraumaTime = currentTime;
        
        // Add dizzy class to eye container
        eyeContainer.classList.add('dizzy');
        
        // Remove dizzy class after 1 second
        setTimeout(() => {
            eyeContainer.classList.remove('dizzy');
        }, 3000);
    }
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        // Add current position to history
        cursorPositions.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        // Limit the history size
        if (cursorPositions.length > positionHistoryLimit) {
            cursorPositions.shift();
        }
        
        // Calculate cursor metrics
        const speed = calculateCursorSpeed();
        const directionChanges = detectDirectionChanges();
        
        // Check if movement is rapid and erratic enough to trigger trauma
        // Speed threshold is higher for desktop to account for faster mouse movements
        const speedThreshold = 40; // Adjust based on testing
        const directionChangeThreshold = 2; // At least 2 significant direction changes
        
        if (speed > speedThreshold && directionChanges >= directionChangeThreshold) {
            triggerTraumaEffect();
        }
    });
    
    // Also track touch movement for mobile
    document.addEventListener('touchmove', function(e) {
        if (e.touches && e.touches[0]) {
            // Add current position to history
            cursorPositions.push({ 
                x: e.touches[0].clientX, 
                y: e.touches[0].clientY, 
                time: Date.now() 
            });
            
            // Limit the history size
            if (cursorPositions.length > positionHistoryLimit) {
                cursorPositions.shift();
            }
            
            // Calculate cursor metrics
            const speed = calculateCursorSpeed();
            const directionChanges = detectDirectionChanges();
            
            // Lower threshold for touch since touch movements are typically slower
            const speedThreshold = 15;
            const directionChangeThreshold = 2;
            
            if (speed > speedThreshold && directionChanges >= directionChangeThreshold) {
                triggerTraumaEffect();
            }
        }
    }, { passive: true });
});