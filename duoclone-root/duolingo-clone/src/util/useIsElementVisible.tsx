import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface VisibilityOptions {
  rootRef?: any;
}

interface ElementVisibility {
  isVisible: boolean;
  position: "above" | "below";
}

export function useIsElementVisible(
  elementRef: React.RefObject<HTMLElement | null>,
  options?: VisibilityOptions
) {
  const rootElement = options?.rootRef?.current ?? null;
  const VIEWPORT_OFFSET = 64;

  // Setup intersection observer
  const [inViewRef, isInView] = useInView({
    threshold: 0.1,
    root: rootElement,
    rootMargin: "0px 0px 100px 0px",
  });

  // Track visibility state
  const [visibility, setVisibility] = useState<ElementVisibility>({
    isVisible: false,
    position: "below",
  });

  const previousInViewState = useRef(isInView);

  // Connect element to intersection observer
  useEffect(() => {
    if (elementRef.current) {
      inViewRef(elementRef.current);
    }
  }, [inViewRef, elementRef, rootElement]);

  // Update visibility when intersection changes
  useEffect(() => {
    const hasInViewChanged = previousInViewState.current !== isInView;
    
    if (hasInViewChanged) {
      previousInViewState.current = isInView;
      setVisibility(prevState => ({
        ...prevState,
        isVisible: isInView
      }));
    }
  }, [isInView]);

  // Track element position relative to viewport
  useEffect(() => {
    const scrollContainer = rootElement ?? window;

    const calculateElementPosition = () => {
      const element = elementRef.current;
      if (!element) return;

      const elementRect = element.getBoundingClientRect();
      const viewportHeight = rootElement instanceof Element 
        ? rootElement.clientHeight 
        : window.innerHeight;

      let newPosition: "above" | "below" | null = null;

      if (elementRect.top >= viewportHeight - VIEWPORT_OFFSET) {
        newPosition = "below";
      } else if (elementRect.bottom <= VIEWPORT_OFFSET) {
        newPosition = "above";
      }

      // Only update if position actually changed
      if (newPosition !== null) {
        setVisibility(prevState => {
          if (prevState.position === newPosition) {
            return prevState;
          }
          return { ...prevState, position: newPosition };
        });
      }
    };

    // Calculate initial position
    calculateElementPosition();

    // Listen for scroll and resize events
    const scrollListener = calculateElementPosition;
    
    scrollContainer.addEventListener("scroll", scrollListener, { passive: true });
    window.addEventListener("resize", scrollListener);

    // Cleanup event listeners
    return () => {
      scrollContainer.removeEventListener("scroll", scrollListener);
      window.removeEventListener("resize", scrollListener);
    };
  }, [elementRef, rootElement]);

  return visibility;
}