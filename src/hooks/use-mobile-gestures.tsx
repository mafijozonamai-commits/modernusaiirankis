import { useState, useEffect, useRef } from 'react';

interface TouchPosition {
  x: number;
  y: number;
  timestamp: number;
}

interface GestureState {
  isSwipeLeft: boolean;
  isSwipeRight: boolean;
  isSwipeUp: boolean;
  isSwipeDown: boolean;
  isPinching: boolean;
  isDoubleTap: boolean;
}

export const useMobileGestures = () => {
  const [gestureState, setGestureState] = useState<GestureState>({
    isSwipeLeft: false,
    isSwipeRight: false,
    isSwipeUp: false,
    isSwipeDown: false,
    isPinching: false,
    isDoubleTap: false,
  });

  const touchStartRef = useRef<TouchPosition | null>(null);
  const lastTapRef = useRef<number>(0);
  const elementRef = useRef<HTMLElement | null>(null);

  const SWIPE_THRESHOLD = 50;
  const TIME_THRESHOLD = 300;
  const DOUBLE_TAP_THRESHOLD = 300;

  useEffect(() => {
    const element = elementRef.current || document.body;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          timestamp: Date.now(),
        };
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current || e.changedTouches.length !== 1) return;

      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
        timestamp: Date.now(),
      };

      const deltaX = touchEnd.x - touchStartRef.current.x;
      const deltaY = touchEnd.y - touchStartRef.current.y;
      const deltaTime = touchEnd.timestamp - touchStartRef.current.timestamp;

      // Check for double tap
      const timeSinceLastTap = touchEnd.timestamp - lastTapRef.current;
      if (timeSinceLastTap < DOUBLE_TAP_THRESHOLD && Math.abs(deltaX) < 20 && Math.abs(deltaY) < 20) {
        setGestureState(prev => ({ ...prev, isDoubleTap: true }));
        setTimeout(() => setGestureState(prev => ({ ...prev, isDoubleTap: false })), 100);
      }
      lastTapRef.current = touchEnd.timestamp;

      // Check for swipes
      if (deltaTime < TIME_THRESHOLD) {
        if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > 0) {
            setGestureState(prev => ({ ...prev, isSwipeRight: true }));
            setTimeout(() => setGestureState(prev => ({ ...prev, isSwipeRight: false })), 100);
          } else {
            setGestureState(prev => ({ ...prev, isSwipeLeft: true }));
            setTimeout(() => setGestureState(prev => ({ ...prev, isSwipeLeft: false })), 100);
          }
        }

        if (Math.abs(deltaY) > SWIPE_THRESHOLD && Math.abs(deltaY) > Math.abs(deltaX)) {
          if (deltaY > 0) {
            setGestureState(prev => ({ ...prev, isSwipeDown: true }));
            setTimeout(() => setGestureState(prev => ({ ...prev, isSwipeDown: false })), 100);
          } else {
            setGestureState(prev => ({ ...prev, isSwipeUp: true }));
            setTimeout(() => setGestureState(prev => ({ ...prev, isSwipeUp: false })), 100);
          }
        }
      }

      touchStartRef.current = null;
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return {
    gestureState,
    elementRef,
  };
};