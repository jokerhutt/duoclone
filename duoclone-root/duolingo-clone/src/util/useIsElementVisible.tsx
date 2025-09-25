import { useEffect, useState } from "react";
import type { RefObject } from "react";

export function useIsElementVisible(elementRef: RefObject<HTMLElement | null>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        root: null,
        rootMargin: "0px",
        threshold: 0.1
      }
    );

    // Add null check here
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [elementRef]);

  return isVisible;
}