'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

export default function AnimatedCounter({ target, duration = 2.5 }: { target: number, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (value) => setCount(Math.round(value)),
      });
      return controls.stop;
    }
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}