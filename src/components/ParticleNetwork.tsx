import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
};

type Props = {
  className?: string;
  count?: number;
  /** maximum distance (in 3D space) for connecting two particles with a line */
  linkDist?: number;
};

/**
 * Canvas-based animated particle field with 3D depth + connecting lines.
 * The "neural network" / sci-fi background look without Three.js.
 */
export function ParticleNetwork({ className = '', count = 70, linkDist = 130 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let raf = 0;

    const particles: Particle[] = [];
    const init = () => {
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 1 - 0.5, // depth (-0.5 to 0.5)
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          vz: (Math.random() - 0.5) * 0.002,
        });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    };

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.active = true;
    };
    const handleLeave = () => { mouse.current.active = false; };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // update + draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.x < 0 || p.x > width)  p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        if (p.z < -0.5 || p.z > 0.5) p.vz *= -1;

        // mouse repulsion (gives it the "interactive 3D" feel)
        if (mouse.current.active) {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 130 * 130) {
            const f = (130 * 130 - d2) / (130 * 130) * 0.15;
            p.x += dx * f * 0.05;
            p.y += dy * f * 0.05;
          }
        }

        const scale = 0.6 + (p.z + 0.5) * 0.8; // depth → size
        const alpha = 0.35 + (p.z + 0.5) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${alpha})`;
        ctx.fill();
      }

      // draw links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDist) {
            const t = 1 - d / linkDist;
            const depth = (a.z + b.z) / 2 + 0.5; // 0..1
            ctx.strokeStyle = `rgba(139, 92, 246, ${t * 0.35 * depth})`;
            ctx.lineWidth = 0.8 * depth;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseleave', handleLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseleave', handleLeave);
    };
  }, [count, linkDist]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}
