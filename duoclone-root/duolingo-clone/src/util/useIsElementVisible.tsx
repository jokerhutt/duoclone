import { useEffect, useState } from "react";
import type { RefObject } from "react";

export function useIsElementVisible(elementRef: RefObject<HTMLElement | null>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(elementRef.current);

    requestAnimationFrame(() => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const initiallyVisible =
          rect.top < window.innerHeight &&
          rect.bottom > 0 &&
          rect.left < window.innerWidth &&
          rect.right > 0;

        setIsVisible(initiallyVisible);
      }
    });

    return () => observer.disconnect();
  }, [elementRef.current]);

  return isVisible;
}
