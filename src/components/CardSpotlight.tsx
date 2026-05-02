import { useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';
import { cn } from '@/lib/cn';

type Props = {
  children: ReactNode;
  className?: string;
};

export function CardSpotlight({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, rgba(var(--accent-rgb),0.18), transparent 70%)`;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'group relative overflow-hidden rounded-[var(--radius-card)]',
        'border border-border bg-bg-elev/80 backdrop-blur',
        'transition-all duration-300 hover:border-accent/50 hover:-translate-y-1',
        className,
      )}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{ background, opacity: hovered ? 1 : 0 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
