import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';

const steps = [
  {
    n: '01',
    icon: '🔔',
    title: 'Recebe a PR',
    desc: 'Webhook do GitHub dispara o agente assim que a PR é aberta.',
    tech: 'GitHub App',
    time: '0s',
  },
  {
    n: '02',
    icon: '🗂️',
    title: 'Lê o diff + contexto',
    desc: 'Indexa arquivos modificados e busca código relacionado no monorepo.',
    tech: 'Code RAG',
    time: '~4s',
  },
  {
    n: '03',
    icon: '🔬',
    title: 'Analisa qualidade',
    desc: 'Detecta bugs, anti-patterns, code smells e gaps de cobertura de teste.',
    tech: 'Claude Sonnet',
    time: '~6s',
  },
  {
    n: '04',
    icon: '💬',
    title: 'Comenta inline',
    desc: 'Sugere fixes específicos linha-a-linha, com diff já formatado.',
    tech: 'GitHub API',
    time: '~3s',
  },
  {
    n: '05',
    icon: '✅',
    title: 'Aprova / Solicita',
    desc: 'Decide entre approve, request changes ou comment com base na policy.',
    tech: 'Policy engine',
    time: '~1s',
  },
];

function TimelineRow({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof steps)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each step "activates" between these two scroll points
  const start = index / total;
  const mid = (index + 0.4) / total;

  const iconScale = useTransform(progress, [start, mid], [0.5, 1]);
  const iconOpacity = useTransform(progress, [start, mid], [0.25, 1]);
  const ringOpacity = useTransform(progress, [start, mid], [0, 1]);
  const cardX = useTransform(progress, [start, mid], [40, 0]);
  const cardOpacity = useTransform(progress, [start, mid], [0, 1]);

  return (
    <div className="relative grid grid-cols-[64px_1fr] items-start gap-5 md:grid-cols-[88px_1fr] md:gap-8">
      {/* ICON column */}
      <div className="relative flex justify-center">
        {/* Pulse ring */}
        <motion.span
          style={{ opacity: ringOpacity }}
          className="pointer-events-none absolute top-0 h-14 w-14 rounded-full bg-accent/20 blur-md"
        />
        {/* Icon bubble — sits exactly over the timeline line */}
        <motion.div
          style={{ scale: iconScale, opacity: iconOpacity }}
          className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-accent/40 bg-bg-elev text-2xl shadow-lg shadow-accent/20"
        >
          {step.icon}
        </motion.div>
      </div>

      {/* CONTENT card */}
      <motion.div
        style={{ x: cardX, opacity: cardOpacity }}
        className="rounded-[var(--radius-card)] border border-border bg-bg-elev/80 p-5 backdrop-blur transition hover:border-accent/40 md:p-6"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="bg-gradient-to-br from-accent to-accent-2 bg-clip-text text-xl font-bold text-transparent">
            {step.n}
          </span>
          <span className="font-mono text-[11px] text-text-muted">{step.time}</span>
        </div>
        <h3 className="mb-1.5 text-base font-semibold text-text-h md:text-lg">{step.title}</h3>
        <p className="mb-3 text-[13px] leading-relaxed text-text md:text-[14px]">{step.desc}</p>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-border-soft bg-bg px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {step.tech}
        </span>
      </motion.div>
    </div>
  );
}

export function HowItWorks() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start 75%', 'end 65%'],
  });

  // Drives the vertical line that draws as you scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="como-funciona" className="border-t border-border-soft bg-bg-elev/30 py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            Como funciona um agente
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-h md:text-5xl">
            PR review completo em <span className="text-grad">~14 segundos</span>
          </h2>
          <p className="mt-4 text-text">
            Role pra acompanhar o fluxo, etapa por etapa — do webhook do GitHub à decisão final.
          </p>
        </motion.div>

        {/* PR callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-xl rounded-2xl border border-border bg-bg-elev p-5 text-center"
        >
          <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-text-muted">
            Exemplo real · Time de plataforma
          </p>
          <p className="font-mono text-sm text-text-h">
            <span className="text-accent">PR #1247</span> — feat: add OAuth login with Google
          </p>
          <p className="mt-1 text-xs text-text-muted">
            +318 / -42 linhas · 6 arquivos · aberta às 14:32
          </p>
        </motion.div>

        {/* TIMELINE */}
        <div ref={wrapperRef} className="relative mx-auto max-w-3xl">
          {/* Static rail */}
          <div className="pointer-events-none absolute bottom-0 left-[31px] top-0 w-px bg-border md:left-[43px]" />
          {/* Animated rail (drawn by scroll) */}
          <motion.div
            style={{ height: lineHeight }}
            className="pointer-events-none absolute left-[31px] top-0 w-px bg-gradient-to-b from-accent via-accent-2 to-accent-3 shadow-[0_0_8px_rgba(139,92,246,0.6)] md:left-[43px]"
          />

          <div className="space-y-10 md:space-y-14">
            {steps.map((step, i) => (
              <TimelineRow
                key={step.n}
                step={step}
                index={i}
                total={steps.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Outcome card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-14 max-w-2xl rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5"
        >
          <div className="flex items-start gap-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
              ✓
            </div>
            <div className="text-sm">
              <p className="mb-1 font-semibold text-text-h">
                3 sugestões inline · 1 race condition no callback de OAuth · Aprovação condicional
              </p>
              <p className="text-text">
                Cobertura de testes verificada · CI rodando · Tempo total:{' '}
                <strong className="text-text-h">14,2 segundos</strong>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
