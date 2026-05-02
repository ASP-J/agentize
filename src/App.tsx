import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Spotlight } from '@/components/Spotlight';
import { CardSpotlight } from '@/components/CardSpotlight';
import { AgentFlow } from '@/components/AgentFlow';
import { HowItWorks } from '@/components/HowItWorks';
import { ParticleNetwork } from '@/components/ParticleNetwork';
import { PerspectiveGrid } from '@/components/PerspectiveGrid';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* NAV */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg/80 backdrop-blur-xl border-b border-border-soft'
            : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <a href="#top" className="flex items-center gap-2.5 font-bold text-text-h">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm shadow-lg shadow-accent/30">
              ◆
            </span>
            <span className="text-lg tracking-tight">Agentize</span>
          </a>

          <nav
            className={`${
              menuOpen
                ? 'absolute inset-x-4 top-full mt-2 flex flex-col gap-1 rounded-2xl border border-border bg-bg-elev p-3'
                : 'hidden'
            } md:static md:mt-0 md:flex md:flex-row md:items-center md:gap-7 md:rounded-none md:border-0 md:bg-transparent md:p-0`}
          >
            <a href="#como-funciona" onClick={() => setMenuOpen(false)} className="rounded px-2 py-2 text-sm text-text hover:text-text-h md:p-0">Como funciona</a>
            <a href="#servicos" onClick={() => setMenuOpen(false)} className="rounded px-2 py-2 text-sm text-text hover:text-text-h md:p-0">Serviços</a>
            <a href="#metodologia" onClick={() => setMenuOpen(false)} className="rounded px-2 py-2 text-sm text-text hover:text-text-h md:p-0">Metodologia</a>
            <a href="#cases" onClick={() => setMenuOpen(false)} className="rounded px-2 py-2 text-sm text-text hover:text-text-h md:p-0">Cases</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="rounded px-2 py-2 text-sm text-text hover:text-text-h md:p-0">FAQ</a>
            <a
              href="#cta"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-transform hover:-translate-y-0.5 md:mt-0"
            >
              Agendar diagnóstico
            </a>
          </nav>

          <button
            aria-label="menu"
            onClick={() => setMenuOpen(o => !o)}
            className="flex flex-col gap-1 p-2 md:hidden"
          >
            <span className="h-0.5 w-5 bg-text-h" />
            <span className="h-0.5 w-5 bg-text-h" />
            <span className="h-0.5 w-5 bg-text-h" />
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="top" className="relative isolate overflow-hidden pt-24 pb-32 md:pt-32 md:pb-40">
          {/* 3D-feeling animated particle network */}
          <div className="pointer-events-auto absolute inset-0 -z-10">
            <ParticleNetwork count={70} linkDist={140} />
          </div>

          <Spotlight className="-top-20 left-0 md:left-60 md:top-10" fill="#8b5cf6" />

          {/* radial mask grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-20
              [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]
              [background-size:54px_54px]
              [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black_40%,transparent_80%)]"
          />

          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs text-text-h"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Para times de engenharia
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-balance text-4xl font-semibold tracking-tight text-text-h md:text-6xl lg:text-7xl"
            >
              <span className="text-grad">Agentes de IA</span> que escrevem código com seu time.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mx-auto mt-7 max-w-2xl text-balance text-base text-text md:text-lg"
            >
              Implantamos agentes que <strong className="text-text-h">geram código</strong>,{' '}
              <strong className="text-text-h">revisam PRs</strong> e{' '}
              <strong className="text-text-h">automatizam migrações</strong> dentro do seu repositório.
              Em produção em 30 dias — feito sob medida pro seu stack.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="#cta"
                className="ring-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-accent to-accent-2 px-7 py-3.5 font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Agendar diagnóstico técnico →
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/5 px-7 py-3.5 font-semibold text-text-h hover:border-accent hover:bg-white/10"
              >
                Ver agente em ação
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted"
            >
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400">●</span> GitHub / GitLab
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400">●</span> Self-hosted opcional
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400">●</span> SOC 2 compliant
              </span>
            </motion.div>

            {/* ANIMATED FLOW */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-20"
            >
              <AgentFlow />
            </motion.div>
          </div>
        </section>

        {/* MOVIMENTO / EMPRESAS REAIS */}
        <section className="border-y border-border-soft py-20">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div {...fadeUp} className="mx-auto mb-14 max-w-2xl text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                A nova engenharia
              </span>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-h md:text-4xl">
                As maiores tech do mundo já estão na onda dos agentes
              </h2>
              <p className="mt-3 text-text">
                Os times de engenharia mais avançados não estão escolhendo <em>se</em> usar IA — estão escolhendo <em>como</em> usar bem.
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'Nubank',
                  context: 'Modernização de COBOL legacy assistida por LLMs e adoção interna de copilots.',
                  region: 'Brasil',
                },
                {
                  name: 'Mercado Livre',
                  context: 'Deploy empresarial de GitHub Copilot pra +10k engenheiros.',
                  region: 'LatAm',
                },
                {
                  name: 'iFood',
                  context: 'Iniciativas internas de IA pra produtividade de devs e geração de testes.',
                  region: 'Brasil',
                },
                {
                  name: 'Shopify',
                  context: 'Tobi Lütke determinou IA como pré-requisito antes de pedir headcount.',
                  region: 'Global',
                },
                {
                  name: 'Stripe',
                  context: 'Integração profunda do Claude em workflow de code review e refactor.',
                  region: 'Global',
                },
                {
                  name: 'Block (Square)',
                  context: 'Lançou Goose, agente open-source pra produtividade de engenharia.',
                  region: 'Global',
                },
              ].map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group rounded-2xl border border-border bg-bg-elev p-5 transition hover:border-accent/40"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-base font-bold tracking-tight text-text-h">{c.name}</span>
                    <span className="rounded-md border border-border-soft bg-bg px-2 py-0.5 text-[10px] uppercase tracking-wider text-text-muted">
                      {c.region}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-text">{c.context}</p>
                </motion.div>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-text-muted">
              Exemplos públicos do mercado · Não são clientes Agentize
            </p>
          </div>
        </section>

        {/* COMO FUNCIONA — fluxograma explicativo */}
        <HowItWorks />

        {/* SERVIÇOS */}
        <section id="servicos" className="py-28">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div {...fadeUp} className="mx-auto mb-16 max-w-2xl text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Serviços
              </span>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-h md:text-5xl">
                Onde nossos agentes atuam no seu ciclo de dev
              </h2>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: '⌨️', t: 'Code Generation', d: 'Agentes que implementam features completas a partir de issues — código, testes e PR aberta automaticamente.' },
                { icon: '🔍', t: 'PR Review automatizado', d: 'Toda PR revisada com contexto do codebase: bugs, anti-patterns, gaps de teste e sugestões inline.' },
                { icon: '🧪', t: 'Geração de testes', d: 'Suítes unit/integration auto-geradas para código novo e cobertura retroativa em legado.' },
                { icon: '🔄', t: 'Migrations & Refactor', d: 'Mudanças em larga escala: Vue 2 → 3, JS → TS, atualização de dependências críticas.' },
                { icon: '📚', t: 'Docs & ADRs', d: 'Documentação técnica e ADRs sempre sincronizados com o código — sem ninguém precisar lembrar.' },
                { icon: '🚨', t: 'On-call & Triage', d: 'Análise de logs, identificação de root cause em incidents e fix sugerido antes do oncall acordar.' },
              ].map((s, i) => (
                <motion.div
                  key={s.t}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <CardSpotlight className="h-full p-7">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-2xl">
                      {s.icon}
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-text-h">{s.t}</h3>
                    <p className="mt-2 text-[15px] text-text">{s.d}</p>
                  </CardSpotlight>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* METODOLOGIA — com PerspectiveGrid 3D atrás */}
        <section id="metodologia" className="relative isolate overflow-hidden border-t border-border-soft bg-bg-elev/40 py-28">
          <PerspectiveGrid className="absolute inset-0 -z-10" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg/60 via-transparent to-bg/80" />

          <div className="mx-auto max-w-7xl px-6">
            <motion.div {...fadeUp} className="mx-auto mb-16 max-w-2xl text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Metodologia
              </span>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-h md:text-5xl">
                Do diagnóstico à produção em 30 dias
              </h2>
              <p className="mt-4 text-text">
                Processo testado, ajustado pra reduzir risco e entregar agentes confiáveis no seu CI/CD.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                { n: '01', t: 'Diagnóstico técnico', dur: 'Semana 1', d: 'Workshop com tech leads, mapeamento de pain points (PRs travados, débito técnico, on-call ruim) e priorização por impacto.' },
                { n: '02', t: 'Construção', dur: 'Semanas 2-3', d: 'Indexamos seu codebase, construímos os agentes, integramos com GitHub/CI e validamos em ambiente staging.' },
                { n: '03', t: 'Go-live + handover', dur: 'Semana 4', d: 'Deploy em produção, integração com workflows existentes, treinamento do time pra evolução autônoma.' },
              ].map((s, i) => (
                <motion.article
                  key={s.n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative rounded-[var(--radius-card)] border border-border bg-bg-elev/95 p-8 backdrop-blur"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="bg-gradient-to-br from-accent to-accent-2 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                      {s.n}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">{s.dur}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-text-h">{s.t}</h3>
                  <p className="mt-2 text-[15px] text-text">{s.d}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CASES / RESULTADOS */}
        <section id="cases" className="py-28">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div {...fadeUp} className="mx-auto mb-16 max-w-2xl text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Resultados
              </span>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-h md:text-5xl">
                Métricas reais de eng, não promessas
              </h2>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                { kpi: '67%', label: 'Redução no tempo médio de PR review', case: 'SaaS B2B · 40 engenheiros' },
                { kpi: '3.4x', label: 'Velocidade em refactor de larga escala', case: 'Migração Vue 2 → 3 · 200 componentes' },
                { kpi: '85%', label: 'Cobertura de testes auto-gerada', case: 'Backend Python · 200k LOC' },
              ].map((c, i) => (
                <motion.div
                  key={c.kpi}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-[var(--radius-card)] border border-border bg-gradient-to-br from-bg-elev to-bg-soft p-8"
                >
                  <div className="text-5xl font-bold tracking-tight text-grad">{c.kpi}</div>
                  <p className="mt-3 text-base font-medium text-text-h">{c.label}</p>
                  <p className="mt-2 text-sm text-text-muted">{c.case}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-border-soft py-28">
          <div className="mx-auto max-w-3xl px-6">
            <motion.div {...fadeUp} className="mb-12 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-accent">FAQ</span>
              <h2 className="text-3xl font-semibold tracking-tight text-text-h md:text-4xl">Perguntas frequentes</h2>
            </motion.div>
            <div className="space-y-3">
              {[
                { q: 'Quais linguagens / frameworks vocês suportam?', a: 'Qualquer linguagem mainstream (TS, Python, Go, Java, Rust, Ruby, etc.). Os agentes aprendem o estilo e padrões do seu codebase via indexing — não usamos templates genéricos.' },
                { q: 'Como integramos com GitHub / GitLab?', a: 'Via GitHub App (ou GitLab integration) com permissões mínimas. Setup completo em ~10 minutos, sem mexer em CI/CD existente.' },
                { q: 'Os agentes têm acesso ao nosso código privado?', a: 'Sim, com isolamento total. Opção de deploy 100% self-hosted na sua infra (AWS, GCP, on-prem) — código nunca sai dela. Suportamos modelos open-source pra requisitos críticos de privacidade.' },
                { q: 'Funciona com monorepo?', a: 'Sim, otimizado pra Nx, Turborepo, Lerna e moonrepo. O code-aware RAG entende dependências entre packages.' },
                { q: 'E sobre alucinação? Posso confiar no código gerado?', a: 'Cada PR criada por agente passa pelo seu CI completo (lint, testes, build) antes de chegar em review humano. Você sempre tem aprovação final — agentes nunca fazem merge direto.' },
                { q: 'Como vocês cobram?', a: 'Diagnóstico tem valor fixo. Implantação é por escopo, com pagamento por milestone. Sem custo recorrente obrigatório — opcionalmente assina nosso plano de evolução contínua.' },
              ].map(item => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-border bg-bg-elev px-6 py-5 transition open:border-accent/40"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-text-h">
                    {item.q}
                    <span className="text-2xl text-accent transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-[15px] text-text">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="px-6 pb-28">
          <motion.div
            {...fadeUp}
            className="relative mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-border bg-bg-elev px-6 py-16 text-center md:py-20"
          >
            <div
              aria-hidden
              className="absolute inset-0 -z-10
                [background:radial-gradient(600px_300px_at_50%_0%,rgba(139,92,246,0.30),transparent_70%)]"
            />
            <div className="absolute -top-px left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent to-transparent" />

            <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-h md:text-5xl">
              Onde IA pode acelerar sua engenharia?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text">
              Diagnóstico técnico gratuito de 45min com tech leads.
              Você sai com 3 oportunidades concretas de implantação no seu stack.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Recebido! Entramos em contato em até 24h.');
              }}
              className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="seu@email.com"
                className="flex-1 rounded-xl border border-border bg-bg px-5 py-3.5 text-text-h outline-none transition placeholder:text-text-muted focus:border-accent"
              />
              <button
                type="submit"
                className="ring-glow rounded-xl bg-gradient-to-br from-accent to-accent-2 px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5"
              >
                Agendar →
              </button>
            </form>

            <p className="mt-3 text-xs text-text-muted">Sem compromisso · Resposta em até 24h</p>
          </motion.div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-border-soft px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 md:flex-row md:gap-20">
          <div className="max-w-xs">
            <a href="#top" className="flex items-center gap-2.5 font-bold text-text-h">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm">◆</span>
              Agentize
            </a>
            <p className="mt-3 text-sm text-text-muted">
              Consultoria especializada em implantação de agentes de IA pra times de engenharia que querem acelerar o ciclo de dev.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-12 text-sm">
            {[
              { h: 'Empresa', items: ['Sobre', 'Cases', 'Contato'] },
              { h: 'Serviços', items: ['Code Generation', 'PR Review', 'Refactor'] },
              { h: 'Legal', items: ['Privacidade', 'Termos', 'LGPD'] },
            ].map(c => (
              <div key={c.h}>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">{c.h}</h4>
                {c.items.map(i => (
                  <a key={i} href="#" className="block py-1 text-text hover:text-text-h">{i}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-border-soft pt-6 text-xs text-text-muted">
          © {new Date().getFullYear()} Agentize. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
