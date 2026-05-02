import { motion } from 'motion/react';

type Variant = 'a' | 'b' | 'c';

type Blob = {
  color: string;
  size: number;
  x: string;
  y: string;
  dx: number;
  dy: number;
  delay: number;
};

const PRESETS: Record<Variant, Blob[]> = {
  a: [
    { color: 'bg-accent/25',   size: 480, x: '-15%', y: '20%', dx:  40, dy: -30, delay:  0 },
    { color: 'bg-accent-2/20', size: 540, x:  '70%', y: '50%', dx: -50, dy:  40, delay: -8 },
    { color: 'bg-accent-3/20', size: 320, x:  '45%', y:  '8%', dx:  30, dy:  50, delay: -4 },
  ],
  b: [
    { color: 'bg-accent-3/22', size: 380, x:  '5%',  y: '55%', dx:  40, dy:  30, delay:  0 },
    { color: 'bg-accent/20',   size: 460, x:  '60%', y: '15%', dx: -40, dy:  30, delay: -6 },
  ],
  c: [
    { color: 'bg-accent-2/18', size: 360, x: '-10%', y: '60%', dx:  35, dy: -25, delay:  0 },
    { color: 'bg-accent/18',   size: 420, x:  '75%', y: '20%', dx: -35, dy:  20, delay: -5 },
    { color: 'bg-accent-3/16', size: 280, x:  '40%', y: '70%', dx:  25, dy: -30, delay: -2 },
  ],
};

export function AuroraBlobs({
  className = '',
  variant = 'a',
}: {
  className?: string;
  variant?: Variant;
}) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      {PRESETS[variant].map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${b.color}`}
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
          }}
          animate={{
            x: [0, b.dx, -b.dx / 2, 0],
            y: [0, b.dy, -b.dy / 2, 0],
          }}
          transition={{
            duration: 22 + i * 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: b.delay,
          }}
        />
      ))}
    </div>
  );
}
