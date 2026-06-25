'use client';
import { useRef, useState, useCallback, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  contentContainerStyle?: React.CSSProperties;
}

const SCROLL_AMOUNT = 320;
const FADE_WIDTH = 110;

export default function HScrollWithArrows({ children, contentContainerStyle }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.clientWidth === 0) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(maxScroll > 2 && el.scrollLeft < maxScroll - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    const observer = new ResizeObserver(updateArrows);
    observer.observe(el);
    return () => { el.removeEventListener('scroll', updateArrows); observer.disconnect(); };
  }, [updateArrows]);

  const arrowBtn: React.CSSProperties = {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#1A1A1A',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', flexShrink: 0, fontSize: 18, color: '#fff', lineHeight: 1,
  };

  return (
    <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
      <div ref={scrollRef} className="no-scrollbar" style={{ overflowX: 'auto', display: 'flex', ...contentContainerStyle }}>
        {children}
      </div>
      <div className="scroll-arrow" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: FADE_WIDTH, opacity: canScrollLeft ? 1 : 0, pointerEvents: canScrollLeft ? 'auto' : 'none', alignItems: 'center', background: 'linear-gradient(to right, #0F0F0F 45%, transparent)', transition: 'opacity 180ms', zIndex: 10 }}>
        <button onClick={() => scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' })} onMouseEnter={() => setLeftHovered(true)} onMouseLeave={() => setLeftHovered(false)} style={{ ...arrowBtn, marginLeft: 6, backgroundColor: leftHovered ? '#242424' : '#1A1A1A' }}>‹</button>
      </div>
      <div className="scroll-arrow" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: FADE_WIDTH, opacity: canScrollRight ? 1 : 0, pointerEvents: canScrollRight ? 'auto' : 'none', alignItems: 'center', justifyContent: 'flex-end', background: 'linear-gradient(to left, #0F0F0F 45%, transparent)', transition: 'opacity 180ms', zIndex: 10 }}>
        <button onClick={() => scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' })} onMouseEnter={() => setRightHovered(true)} onMouseLeave={() => setRightHovered(false)} style={{ ...arrowBtn, marginRight: 6, backgroundColor: rightHovered ? '#242424' : '#1A1A1A' }}>›</button>
      </div>
    </div>
  );
}
