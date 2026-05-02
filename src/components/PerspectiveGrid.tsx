/**
 * Pure-CSS 3D perspective grid that scrolls into the horizon.
 * Gives a "Tron / sci-fi runway" feel with zero JS.
 */
export function PerspectiveGrid({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none overflow-hidden ${className}`}
      style={{ perspective: '500px' }}
    >
      <div className="perspective-grid" />
      <style>{`
        .perspective-grid {
          position: absolute;
          inset: -50% 0 0 0;
          height: 200%;
          background-image:
            linear-gradient(to right, rgba(var(--accent-rgb), 0.32) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--accent-rgb), 0.32) 1px, transparent 1px);
          background-size: 60px 60px;
          transform-origin: 50% 0%;
          transform: rotateX(60deg);
          animation: pgGridScroll 14s linear infinite;
          mask-image: linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%);
        }
        @keyframes pgGridScroll {
          0%   { background-position: 0px 0px; }
          100% { background-position: 0px 60px; }
        }
      `}</style>
    </div>
  );
}
