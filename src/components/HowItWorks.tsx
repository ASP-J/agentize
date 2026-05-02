import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'motion/react';

const steps = [
  {
    n: '01',
    icon: '🔔',
    title: 'Recebe a alteração',
    desc: 'Assim que um desenvolvedor envia uma alteração de código, o agente é acionado automaticamente.',
    tech: 'Integração com repositório',
    time: '0s',
  },
  {
    n: '02',
    icon: '🗂️',
    title: 'Entende o que mudou',
    desc: 'Lê os arquivos alterados e localiza as partes do sistema relacionadas àquela mudança.',
    tech: 'Leitura de código',
    time: '~4s',
  },
  {
    n: '03',
    icon: '🔬',
    title: 'Analisa qualidade',
    desc: 'Detecta possíveis bugs, problemas de qualidade e falta de testes — com base nos padrões do seu time.',
    tech: 'IA avançada',
    time: '~6s',
  },
  {
    n: '04',
    icon: '💬',
    title: 'Sugere correções',
    desc: 'Aponta cada problema diretamente no trecho de código, já com a correção pronta.',
    tech: 'Comentários no repositório',
    time: '~3s',
  },
  {
    n: '05',
    icon: '✅',
    title: 'Decide',
    desc: 'Aprova, pede ajustes ou só comenta — segundo as regras do seu time.',
    tech: 'Regras do time',
    time: '~1s',
  },
];

export function HowItWorks() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const [activeStep, setActiveStep] = useState(-1);
  const [elapsedLabel, setElapsedLabel] = useState('0,0s');

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // Use a small head/tail buffer so cards finish before pin releases
    const t = Math.max(0, Math.min(1, (v - 0.04) / 0.9));
    const idx = Math.min(steps.length - 1, Math.floor(t * steps.length));
    setActiveStep(idx);
    const seconds = (Math.max(0, Math.min(1, v)) * 14.2).toFixed(1).replace('.', ',');
    setElapsedLabel(`${seconds}s`);
  });

  const progressBarW = useTransform(scrollYProgress, [0.02, 0.98], ['0%', '100%']);

  return (
    <section
      id="como-funciona"
      ref={wrapperRef}
      className="relative border-t border-border-soft bg-bg-elev/30 md:h-[280vh]"
    >
      {/* MOBILE FALLBACK — stacked, static (no pinning) */}
      <div className="mx-auto max-w-2xl px-6 py-20 md:hidden">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            Como funciona um agente
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-h">
            Revisão de código automática em <span className="text-grad">~14 segundos</span>
          </h2>
        </div>
        <ol className="space-y-4">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border border-border bg-bg-elev p-5">
              <div className="flex items-baseline justify-between">
                <span className="bg-gradient-to-br from-accent to-accent-2 bg-clip-text text-xl font-bold text-transparent">
                  {s.n}
                </span>
                <span className="font-mono text-[11px] text-text-muted">{s.time}</span>
              </div>
              <h3 className="mt-2 text-base font-semibold text-text-h">{s.icon} {s.title}</h3>
              <p className="mt-1 text-sm text-text">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* DESKTOP — pinned canvas, items load horizontally */}
      <div className="sticky top-0 hidden h-screen flex-col justify-center overflow-hidden md:flex">
        {/* Header */}
        <div className="px-6 pt-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-accent">
              Como funciona um agente
            </span>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-h md:text-4xl lg:text-5xl">
              Revisão de código automática em <span className="text-grad">~14 segundos</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-text md:text-base">
              Role pra ver o agente trabalhar — cada etapa entra do lado conforme ele avança.
            </p>
          </div>
        </div>

        {/* PR callout */}
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-border bg-bg-elev px-5 py-4 text-center">
          <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-text-muted">Exemplo real</p>
          <p className="font-mono text-[13px] text-text-h">
            <span className="text-accent">Alteração #1247</span> — Login com Google adicionado
          </p>
          <p className="mt-1 text-[11px] text-text-muted">
            318 linhas adicionadas · 42 removidas · 6 arquivos
          </p>
        </div>

        {/* Horizontal stage — 5 cards side-by-side */}
        <div className="mx-auto mt-10 w-full max-w-7xl px-6">
          <div className="grid grid-cols-5 gap-4">
            {steps.map((s, i) => {
              const reached = i <= activeStep;
              const isActive = i === activeStep;
              return (
                <motion.div
                  key={s.n}
                  initial={false}
                  animate={{
                    opacity: reached ? 1 : 0.18,
                    x: reached ? 0 : 60,
                    scale: isActive ? 1 : reached ? 0.97 : 0.94,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className={`relative flex flex-col rounded-[var(--radius-card)] border p-5 backdrop-blur transition-colors duration-300 ${
                    isActive
                      ? 'border-accent bg-bg-elev shadow-[0_0_50px_rgba(var(--accent-rgb),0.25)]'
                      : reached
                      ? 'border-border bg-bg-elev/85'
                      : 'border-border-soft bg-bg-elev/40'
                  }`}
                >
                  {/* Active glow ring */}
                  {isActive && (
                    <motion.span
                      aria-hidden
                      layoutId="active-ring"
                      className="pointer-events-none absolute -inset-px rounded-[var(--radius-card)] ring-1 ring-accent/60"
                      transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                    />
                  )}
                  <div className="flex items-baseline justify-between">
                    <span className="bg-gradient-to-br from-accent to-accent-2 bg-clip-text text-2xl font-bold text-transparent">
                      {s.n}
                    </span>
                    <span className="font-mono text-[11px] text-text-muted">{s.time}</span>
                  </div>
                  <div className={`mt-4 grid h-11 w-11 place-items-center rounded-full border text-xl transition-colors ${
                    reached ? 'border-accent/40 bg-bg' : 'border-border-soft bg-bg/40'
                  }`}>
                    {s.icon}
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold leading-tight text-text-h">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-text">
                    {s.desc}
                  </p>
                  <span className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-md border border-border-soft bg-bg px-2 py-1 pt-1.5 text-[9.5px] font-medium uppercase tracking-wider text-text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {s.tech}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Connector + timer */}
        <div className="mx-auto mt-10 w-full max-w-7xl px-6">
          {/* Horizontal connector line */}
          <div className="relative mb-3 h-1 overflow-hidden rounded-full bg-border-soft">
            <motion.div
              style={{ width: progressBarW }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent via-accent-2 to-accent-3 shadow-[0_0_10px_rgba(var(--accent-rgb),0.6)]"
            />
          </div>
          <div className="flex items-center justify-between font-mono text-[11px] text-text-muted">
            <span>0,0s · webhook</span>
            <span className="text-text-h">{elapsedLabel}</span>
            <span>14,2s · decisão</span>
          </div>
        </div>

        {/* Outcome — fades in at the end */}
        <div className="mx-auto mt-8 w-full max-w-3xl px-6">
          <motion.div
            initial={false}
            animate={{
              opacity: activeStep >= steps.length - 1 ? 1 : 0,
              y: activeStep >= steps.length - 1 ? 0 : 12,
            }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 px-5 py-4"
          >
            <div className="flex items-start gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
                ✓
              </div>
              <div className="text-[13px]">
                <p className="font-semibold text-text-h">
                  3 correções sugeridas · 1 problema crítico encontrado no login · ajustes solicitados
                </p>
                <p className="text-text">
                  Testes verificados · build em andamento ·{' '}
                  <strong className="text-text-h">14,2 segundos no total</strong>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
