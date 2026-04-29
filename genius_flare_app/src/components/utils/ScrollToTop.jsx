import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * ScrollToTop component
 * Opens newly pushed pages from the top, while restoring the previous scroll
 * position when the user navigates back with browser history.
 */
export default function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollPositionsRef = useRef(new Map());

  const getScrollY = () => (
    window.scrollY
    || document.documentElement.scrollTop
    || document.body.scrollTop
    || 0
  );

  const scrollToPosition = (top) => {
    window.scrollTo(0, top);
    document.documentElement.scrollTop = top;
    document.body.scrollTop = top;
  };

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    const scrollPositions = scrollPositionsRef.current;
    const savedPosition = scrollPositions.get(location.key);
    const targetPosition = navigationType === 'POP' ? savedPosition ?? 0 : 0;

    scrollToPosition(targetPosition);
    const frame = requestAnimationFrame(() => scrollToPosition(targetPosition));

    return () => {
      cancelAnimationFrame(frame);
      scrollPositions.set(location.key, getScrollY());
    };
  }, [location.key, location.pathname, location.search, navigationType]);

  return null;
}
