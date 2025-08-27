/* global IntersectionObserverInit */
import { RefObject, useEffect } from 'react';

export const useIntersectionObserver = (
  targetRef: RefObject<Element>,
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
) => {
  useEffect(() => {
    const currentTarget = targetRef.current;

    if (!currentTarget || !callback) return;

    const observer = new IntersectionObserver((entries) => {
      callback(entries[0]);
    }, options);

    observer.observe(currentTarget);

    return () => {
      observer.unobserve(currentTarget);
      observer.disconnect();
    };
  }, [targetRef, callback, options]);
};
