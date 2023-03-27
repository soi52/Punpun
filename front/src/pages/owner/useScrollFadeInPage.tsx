import { useRef, useCallback, useEffect, CSSProperties } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

interface ScrollFadeInProps {
  direction: Direction;
  duration: number;
  delay: number;
}

interface StyleProps extends CSSProperties {
  transitionProperty: string;
  transitionDuration: string;
  transitionTimingFunction: string;
  opacity: number;
  transform: string;
}

const useScrollFadeInPage = ({
  direction,
  duration,
  delay,
}: ScrollFadeInProps) => {
  const element = useRef<HTMLDivElement>(null);

  const handleDirection = useCallback((name: Direction): string => {
    switch (name) {
      case 'up':
        return 'translate3d(0, 50%, 0)';
      case 'down':
        return 'tranlate3d(0, -50%, 0)';
      case 'left':
        return 'translate3d(50%, 0, 0)';
      case 'right':
        return 'translate3d(-50%, 0, 0)';
      default:
        return '';
    }
  }, []);

  const onScroll = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      const { current } = element;

      if (entry.isIntersecting && current) {
        const style: StyleProps = {
          transitionProperty: 'all',
          transitionDuration: `${duration}s`,
          transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          opacity: 1,
          transform: 'translate3d(0, 0, 0)',
        };

        Object.assign(current.style, style);
      }
    },
    [duration]
  );

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    if (element.current) {
      observer = new IntersectionObserver(onScroll, { threshold: 0.7 });
      observer.observe(element.current);
    }

    return () => {
      observer && observer.disconnect();
    };
  }, [onScroll]);

  return {
    ref: element,
    style: {
      opacity: 0,
      transform: handleDirection(direction),
    },
  };
};

export default useScrollFadeInPage;
