'use client';

import { useEffect, useRef } from 'react';

export function Eyes() {
  const pupilsRef = useRef<HTMLDivElement[]>([]);
  const eyeWrappersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const moveEyes = (event: MouseEvent | TouchEvent) => {
      // Get mouse or touch position
      const mouseX = 'clientX' in event ? event.clientX : 
                    (event as TouchEvent).touches?.[0]?.clientX || 0;
      const mouseY = 'clientY' in event ? event.clientY : 
                    (event as TouchEvent).touches?.[0]?.clientY || 0;

      // Move each pupil to follow cursor
      pupilsRef.current.forEach((pupil, index) => {
        // Get the eye element (parent of pupil)
        const eye = pupil.parentElement;
        if (!eye) return;
        
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
        const eyeWrapper = eyeWrappersRef.current[index];
        const shadow = eyeWrapper?.querySelector('.shadow') as HTMLDivElement;
        
        if (shadow) {
          const shadowAngle = Math.atan2(eyeCenterY - mouseY, eyeCenterX - mouseX);
          const shadowDistance = Math.min(distance / 8, 12);
          const shadowX = Math.cos(shadowAngle) * shadowDistance;
          const shadowY = Math.sin(shadowAngle) * shadowDistance;

          const maxWindowDistance = Math.max(window.innerWidth, window.innerHeight) / 2;
          const normalizedDistance = Math.min(distance / maxWindowDistance, 1);
          const shadowIntensity = 0.2 + (0.4 * (1 - normalizedDistance));
          const blurAmount = 3 + (normalizedDistance * 3);

          shadow.style.transform = `translate(${shadowX}px, ${shadowY}px)`;
          shadow.style.background = `rgba(32, 31, 31, ${shadowIntensity})`;
          shadow.style.filter = `blur(${blurAmount}px)`;
        }
      });
    };

    // Initialize eye position on page load
    moveEyes({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 } as MouseEvent);

    // Mouse tracking with throttling for better performance
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          moveEyes(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Touch tracking
    const handleTouchMove = (e: TouchEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          moveEyes(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const addPupilRef = (el: HTMLDivElement | null) => {
    if (el && !pupilsRef.current.includes(el)) {
      pupilsRef.current.push(el);
    }
  };

  const addEyeWrapperRef = (el: HTMLDivElement | null) => {
    if (el && !eyeWrappersRef.current.includes(el)) {
      eyeWrappersRef.current.push(el);
    }
  };

  return (
    <div className="eye-container" style={{ display: 'flex', justifyContent: 'center', gap: '1.5vw' }}>
      <div ref={addEyeWrapperRef} className="eye-wrapper" style={{
        position: 'relative',
        width: '5vw',
        height: '5vw',
        minWidth: '50px',
        minHeight: '50px',
        maxWidth: '80px',
        maxHeight: '80px',
        borderRadius: '50%',
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <div className="shadow" style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'rgba(32, 31, 31, 0.2)',
          filter: 'blur(3px)',
          pointerEvents: 'none'
        }}></div>
        <div className="eye" style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div ref={addPupilRef} className="pupil" style={{
            width: '40%',
            height: '40%',
            background: '#000',
            borderRadius: '50%',
            position: 'relative',
            transition: 'transform 0.05s ease-out'
          }}></div>
        </div>
      </div>
      
      <div ref={addEyeWrapperRef} className="eye-wrapper" style={{
        position: 'relative',
        width: '5vw',
        height: '5vw',
        minWidth: '50px',
        minHeight: '50px',
        maxWidth: '80px',
        maxHeight: '80px',
        borderRadius: '50%',
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <div className="shadow" style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'rgba(32, 31, 31, 0.2)',
          filter: 'blur(3px)',
          pointerEvents: 'none'
        }}></div>
        <div className="eye" style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div ref={addPupilRef} className="pupil" style={{
            width: '40%',
            height: '40%',
            background: '#000',
            borderRadius: '50%',
            position: 'relative',
            transition: 'transform 0.05s ease-out'
          }}></div>
        </div>
      </div>
    </div>
  );
}