import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'motion/react';

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

export function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1.6,
  className = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(`${prefix}0${decimals > 0 ? ',' + '0'.repeat(decimals) : ''}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.21, 0.47, 0.32, 0.98],
      onUpdate: (v) => {
        const formatted = v.toFixed(decimals).replace('.', ',');
        setDisplay(`${prefix}${formatted}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, decimals, prefix, suffix]);

  return <span ref={ref} className={className}>{display}</span>;
}
