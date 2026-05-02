import { motion } from 'motion/react';

const inputs = [
  { y: 60,  icon: '🐛', label: 'Bug reportado' },
  { y: 200, icon: '📋', label: 'Issue / Spec' },
  { y: 340, icon: '🔀', label: 'PR aberta' },
];

const outputs = [
  { y: 60,  label: 'Código + commit' },
  { y: 200, label: 'Testes gerados' },
  { y: 340, label: 'PR revisada' },
];

const W = 940;
const H = 420;

export function AgentFlow() {
  return (
    <div className="relative mx-auto w-full max-w-[940px]">
      <div className="absolute -inset-12 -z-10 rounded-[40px] bg-gradient-to-br from-accent/15 via-transparent to-accent-2/15 blur-3xl" />
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="beamL" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="50%"  stopColor="#a78bfa" stopOpacity="1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beamR" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#ec4899" stopOpacity="0" />
            <stop offset="50%"  stopColor="#f472b6" stopOpacity="1" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="agentGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <radialGradient id="agentHalo" cx="0.5" cy="0.5">
            <stop offset="0%"   stopColor="#8b5cf6" stopOpacity="0.55" />
            <stop offset="60%"  stopColor="#8b5cf6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* faint static rails */}
        {inputs.map((inp, i) => (
          <path
            key={`rl-${i}`}
            d={`M 220 ${inp.y} C 320 ${inp.y}, 380 210, 430 210`}
            stroke="rgba(139,92,246,0.16)" strokeWidth="1.5" fill="none"
          />
        ))}
        {outputs.map((out, i) => (
          <path
            key={`rr-${i}`}
            d={`M 580 210 C 660 210, 700 ${out.y}, 720 ${out.y}`}
            stroke="rgba(236,72,153,0.16)" strokeWidth="1.5" fill="none"
          />
        ))}

        {/* animated beams (pulses traveling along rails) */}
        {inputs.map((inp, i) => (
          <motion.path
            key={`bl-${i}`}
            d={`M 220 ${inp.y} C 320 ${inp.y}, 380 210, 430 210`}
            stroke="url(#beamL)" strokeWidth="3" fill="none"
            strokeDasharray="50 350"
            initial={{ strokeDashoffset: 400 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'linear', delay: i * 0.55 }}
          />
        ))}
        {outputs.map((out, i) => (
          <motion.path
            key={`br-${i}`}
            d={`M 580 210 C 660 210, 700 ${out.y}, 720 ${out.y}`}
            stroke="url(#beamR)" strokeWidth="3" fill="none"
            strokeDasharray="50 350"
            initial={{ strokeDashoffset: 400 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'linear', delay: 1.3 + i * 0.55 }}
          />
        ))}

        {/* INPUT CARDS */}
        {inputs.map((inp, i) => (
          <motion.g
            key={`in-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
          >
            <rect x="20" y={inp.y - 26} width="200" height="52" rx="14"
              fill="#0e0e1a" stroke="#2a2c3e" strokeWidth="1.4" />
            <circle cx="50" cy={inp.y} r="15" fill="#1a1a2e" stroke="#8b5cf6" strokeOpacity="0.5" strokeWidth="1.2" />
            <text x="50" y={inp.y + 6} fontSize="16" textAnchor="middle">{inp.icon}</text>
            <text x="78" y={inp.y + 5} fontSize="13" fontWeight="600" fill="#f5f6fa" fontFamily="Inter, system-ui">
              {inp.label}
            </text>
          </motion.g>
        ))}

        {/* AGENT (BIG central node) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {/* Halo */}
          <circle cx="505" cy="210" r="135" fill="url(#agentHalo)" />

          {/* Pulse rings */}
          {[0, 1].map(r => (
            <motion.circle
              key={r}
              cx="505" cy="210" r="80"
              fill="none" stroke="#8b5cf6" strokeOpacity="0.3" strokeWidth="1"
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, delay: r * 1.2, ease: 'easeOut' }}
              style={{ transformOrigin: '505px 210px' }}
            />
          ))}

          {/* Card body */}
          <rect x="430" y="125" width="150" height="180" rx="22"
            fill="#0e0e1a" stroke="#8b5cf6" strokeOpacity="0.55" strokeWidth="1.6" />

          {/* Brain badge */}
          <motion.g
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '505px 175px' }}
          >
            <rect x="478" y="148" width="54" height="54" rx="16" fill="url(#agentGrad)" />
            <text x="505" y="186" fontSize="26" textAnchor="middle">🧠</text>
          </motion.g>

          <text x="505" y="225" fontSize="9.5" fill="#7a7e91" textAnchor="middle"
            letterSpacing="3" fontFamily="Inter, system-ui">AGENT</text>
          <text x="505" y="244" fontSize="14" fill="#f5f6fa" textAnchor="middle"
            fontWeight="700" fontFamily="Inter, system-ui">Agentize</text>

          {/* Capabilities */}
          {['Claude · GPT', 'Tools + RAG', 'Memory'].map((cap, i) => (
            <motion.g
              key={cap}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}
            >
              <circle cx="450" cy={266 + i * 13} r="2.5" fill="#10b981" />
              <text x="460" y={270 + i * 13} fontSize="10.5" fill="#b8bccc" fontFamily="Inter, system-ui">{cap}</text>
            </motion.g>
          ))}
        </motion.g>

        {/* OUTPUT CARDS */}
        {outputs.map((out, i) => (
          <motion.g
            key={`out-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
          >
            <rect x="720" y={out.y - 26} width="200" height="52" rx="14"
              fill="#0e0e1a" stroke="#2a2c3e" strokeWidth="1.4" />
            <circle cx="750" cy={out.y} r="15" fill="rgba(16,185,129,0.18)" />
            <text x="750" y={out.y + 5} fontSize="13" textAnchor="middle"
              fill="#10b981" fontWeight="700" fontFamily="Inter, system-ui">✓</text>
            <text x="778" y={out.y + 5} fontSize="13" fontWeight="600" fill="#f5f6fa" fontFamily="Inter, system-ui">
              {out.label}
            </text>
          </motion.g>
        ))}

        {/* Column captions */}
        <text x="120" y="402" fontSize="10" fill="#6f7388" textAnchor="middle"
          letterSpacing="3" fontFamily="Inter, system-ui">ENTRADA</text>
        <text x="505" y="402" fontSize="10" fill="#6f7388" textAnchor="middle"
          letterSpacing="3" fontFamily="Inter, system-ui">PROCESSAMENTO</text>
        <text x="820" y="402" fontSize="10" fill="#6f7388" textAnchor="middle"
          letterSpacing="3" fontFamily="Inter, system-ui">RESULTADO</text>
      </svg>
    </div>
  );
}
