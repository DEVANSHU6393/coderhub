"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade-up" | "fade-left" | "fade-right" | "zoom-in";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.1,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve after triggering once
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  const getAnimationStyles = () => {
    const baseStyles = {
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    };

    if (isVisible) {
      return {
        ...baseStyles,
        opacity: 1,
        transform: "translate(0, 0) scale(1)",
      };
    }

    const hiddenStyles = {
      ...baseStyles,
      opacity: 0,
    };

    switch (animation) {
      case "fade-up":
        return { ...hiddenStyles, transform: "translateY(30px)" };
      case "fade-left":
        return { ...hiddenStyles, transform: "translateX(30px)" };
      case "fade-right":
        return { ...hiddenStyles, transform: "translateX(-30px)" };
      case "zoom-in":
        return { ...hiddenStyles, transform: "scale(0.95)" };
      default:
        return hiddenStyles;
    }
  };

  return (
    <div
      ref={ref}
      style={getAnimationStyles()}
      className={`transition-all ${className}`}
    >
      {children}
    </div>
  );
}
