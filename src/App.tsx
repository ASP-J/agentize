import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Spotlight } from '@/components/Spotlight';
import { CardSpotlight } from '@/components/CardSpotlight';
import { AgentFlow } from '@/components/AgentFlow';
import { HowItWorks } from '@/components/HowItWorks';
import { ParticleNetwork } from '@/components/ParticleNetwork';
import { PerspectiveGrid } from '@/components/PerspectiveGrid';
import { AuroraBlobs } from '@/components/AuroraBlobs';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
};

type Theme = 'light' | 'dark';

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'dark';
    return document.documentElement.classList.contains('light') ? 'light' : 'dark';
  });

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    const root = document.documentElement;
    if (next === 'light') root.classList.add('light');
    else root.classList.remove('light');
    try { localStorage.setItem('agentize-theme', next); } catch { /* noop */ }
  };

  return [theme, toggle];
}

function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-label={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
      onClick={onToggle}
      className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-bg-elev text-text-h transition hover:border-accent hover:bg-accent/10"
    >
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();

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
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm shadow-lg shadow-accent/30 text-white">
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
            <a href="#arquitetura" onClick={() => setMenuOpen(false)} className="rounded px-2 py-2 text-sm text-text hover:text-text-h md:p-0">Arquitetura</a>
            <a href="#metodologia" onClick={() => setMenuOpen(false)} className="rounded px-2 py-2 text-sm text-text hover:text-text-h md:p-0">Metodologia</a>
            <a href="#cases" onClick={() => setMenuOpen(false)} className="rounded px-2 py-2 text-sm text-text hover:text-text-h md:p-0">Cases</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="rounded px-2 py-2 text-sm text-text hover:text-text-h md:p-0">FAQ</a>
            <a
              href="#cta"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-transform hover:-translate-y-0.5 md:mt-0"
            >
              Falar com especialista
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
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
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="top" className="relative isolate overflow-hidden pt-24 pb-32 md:pt-32 md:pb-40">
          <div className="pointer-events-auto absolute inset-0 -z-10">
            <ParticleNetwork count={70} linkDist={140} />
          </div>

          <Spotlight className="-top-20 left-0 md:left-60 md:top-10" fill="var(--color-accent)" />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-20
              [background-image:linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)]
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
              Para times de tecnologia
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-balance text-4xl font-semibold tracking-tight text-text-h md:text-6xl lg:text-7xl"
            >
              <span className="text-grad">Agentes de IA</span> que aceleram seu time de tecnologia.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mx-auto mt-7 max-w-2xl text-balance text-base text-text md:text-lg"
            >
              Implantamos agentes que <strong className="text-text-h">criam funcionalidades</strong>,{' '}
              <strong className="text-text-h">revisam código automaticamente</strong> e{' '}
              <strong className="text-text-h">modernizam sistemas legados</strong> direto na sua base de código.
              Em produção em 30 dias — feito sob medida pra sua tecnologia.
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
                Falar com um especialista →
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg-elev px-7 py-3.5 font-semibold text-text-h hover:border-accent hover:bg-accent/5"
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
                <span className="text-emerald-400">●</span> Integra com seu repositório
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400">●</span> Pode rodar dentro da sua infra
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400">●</span> Padrão SOC 2
              </span>
            </motion.div>

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
        <section className="relative isolate overflow-hidden border-y border-border-soft py-20">
          <AuroraBlobs className="absolute inset-0 -z-10" variant="b" />
          <div className="mx-auto max-w-7xl px-6">
            <motion.div {...fadeUp} className="mx-auto mb-14 max-w-2xl text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                O novo padrão de tecnologia
              </span>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-h md:text-4xl">
                As maiores empresas do mundo já estão usando agentes de IA
              </h2>
              <p className="mt-3 text-text">
                As companhias mais avançadas não estão escolhendo <em>se</em> vão usar IA — estão escolhendo <em>como</em> aplicar com retorno real.
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'Nubank',
                  logo: 'https://cdn.simpleicons.org/nubank',
                  context: 'Modernização de sistemas legados (COBOL) com apoio de IA e adoção interna de copilotos.',
                  region: 'Brasil',
                },
                {
                  name: 'Mercado Livre',
                  logo: 'https://www.google.com/s2/favicons?domain=mercadolivre.com.br&sz=128',
                  context: 'Adoção corporativa de copiloto de IA pra mais de 10 mil desenvolvedores.',
                  region: 'LatAm',
                },
                {
                  name: 'iFood',
                  logo: 'https://cdn.simpleicons.org/ifood',
                  context: 'Iniciativas internas de IA pra produtividade dos times e automação de testes.',
                  region: 'Brasil',
                },
                {
                  name: 'Shopify',
                  logo: 'https://cdn.simpleicons.org/shopify',
                  context: 'Tobi Lütke, CEO, definiu uso de IA como pré-requisito antes de qualquer nova contratação.',
                  region: 'Global',
                },
                {
                  name: 'Stripe',
                  logo: 'https://cdn.simpleicons.org/stripe',
                  context: 'Integração profunda de IA no processo de revisão e modernização de código.',
                  region: 'Global',
                },
                {
                  name: 'Block',
                  logo: 'https://www.google.com/s2/favicons?domain=block.xyz&sz=128',
                  context: 'Lançou o Goose, agente open-source pra aumentar a produtividade do time de tecnologia.',
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
                  <div className="mb-4 flex items-center justify-between gap-3">
                    {c.logo.includes('google.com/s2') ? (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white p-1">
                        <img src={c.logo} alt={c.name} loading="lazy" className="h-full w-full object-contain" />
                      </div>
                    ) : (
                      <img
                        src={c.logo}
                        alt={c.name}
                        loading="lazy"
                        className="logo-mono h-7 w-auto max-w-[130px] object-contain object-left"
                      />
                    )}
                    <span className="rounded-md border border-border-soft bg-bg px-2 py-0.5 text-[10px] uppercase tracking-wider text-text-muted">
                      {c.region}
                    </span>
                  </div>
                  <span className="block text-base font-bold tracking-tight text-text-h">{c.name}</span>
                  <p className="mt-2 text-sm leading-relaxed text-text">{c.context}</p>
                </motion.div>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-text-muted">
              Exemplos públicos do mercado · Não são clientes Agentize
            </p>
          </div>
        </section>

        {/* ANTES vs DEPOIS */}
        <section id="antes-depois" className="border-t border-border-soft py-28">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div {...fadeUp} className="mx-auto mb-14 max-w-2xl text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Antes vs depois
              </span>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-h md:text-5xl">
                O que muda no fluxo do seu time
              </h2>
              <p className="mt-4 text-text">
                O mesmo trabalho — feito em uma fração do tempo, com menos retrabalho.
              </p>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-2">
              {/* AS-IS */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="rounded-[var(--radius-card)] border border-border bg-bg-elev/50 p-7 md:p-8"
              >
                <div className="mb-6 flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">Hoje · manual</span>
                  <span className="font-mono text-[11px] text-text-muted">~7 dias por feature</span>
                </div>
                <ol className="space-y-4">
                  {[
                    { t: 'Tarefa criada manualmente', d: '~30min · alguém precisa abrir e descrever' },
                    { t: 'Refinamento em reuniões', d: '~1 dia · agenda, idas e vindas' },
                    { t: 'Desenvolvimento', d: '~3 dias · dev escrevendo do zero' },
                    { t: 'Code review espera fila', d: '~1-2 dias · trava no calendário do colega' },
                    { t: 'QA roda checklist manual', d: '~1 dia · cobertura inconsistente' },
                    { t: 'Deploy e fingers crossed', d: '~1 dia · medo de quebrar produção' },
                    { t: 'Debug em produção quando estoura', d: '~? · plantonista acordado às 3h' },
                  ].map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border-soft bg-bg text-[11px] font-mono text-text-muted">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-text-h">{s.t}</p>
                        <p className="text-xs text-text-muted">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.div>

              {/* TO-BE */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative rounded-[var(--radius-card)] border border-accent/40 bg-bg-elev p-7 ring-1 ring-accent/20 md:p-8"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10
                    [background:radial-gradient(500px_300px_at_80%_0%,rgba(var(--accent-rgb),0.18),transparent_70%)]"
                />
                <div className="mb-6 flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Com agentes</span>
                  <span className="text-grad font-mono text-[13px] font-bold">~1-2 dias por feature</span>
                </div>
                <ol className="space-y-4">
                  {[
                    { t: 'Pedido cai e agente já recebe', d: '< 5min · webhook automático' },
                    { t: 'Agente quebra em sub-tarefas', d: 'instantâneo · com critérios claros' },
                    { t: 'Dev avança com IA assistindo', d: '~1 dia · código, testes e docs em paralelo' },
                    { t: 'Agente revisa em segundos', d: '< 30s · bugs, qualidade e cobertura' },
                    { t: 'Testes auto-gerados rodam no CI', d: 'paralelo · sem espera' },
                    { t: 'Deploy auto + monitoramento', d: '~minutos · com rollback inteligente' },
                    { t: 'Agente analisa logs e alerta cedo', d: 'contínuo · resolve antes de virar incidente' },
                  ].map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-[11px] font-mono font-bold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-text-h">{s.t}</p>
                        <p className="text-xs text-text-muted">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.div>
            </div>

            {/* Bottom callout */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-border-soft bg-bg-elev/40 px-6 py-4 text-center"
            >
              <span className="text-sm text-text-muted">
                Menos etapas manuais · Trabalho em paralelo · Feedback em segundos · Menos plantão
              </span>
            </motion.div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <HowItWorks />

        {/* SERVIÇOS */}
        <section id="servicos" className="relative isolate overflow-hidden py-28">
          <AuroraBlobs className="absolute inset-0 -z-10 opacity-60" variant="a" />
          <div className="mx-auto max-w-7xl px-6">
            <motion.div {...fadeUp} className="mx-auto mb-16 max-w-2xl text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Serviços
              </span>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-h md:text-5xl">
                Onde nossos agentes atuam no seu time de tecnologia
              </h2>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: '⌨️', t: 'Criação de funcionalidades', d: 'Agentes que implementam funcionalidades completas a partir de um pedido — código, testes e revisão tudo automatizado.' },
                { icon: '🔍', t: 'Revisão automática de código', d: 'Toda alteração revisada em segundos com contexto do seu sistema: bugs, problemas de qualidade e falta de testes — direto no código.' },
                { icon: '🧪', t: 'Geração de testes', d: 'Testes automáticos gerados pra código novo e cobertura completa em sistemas legados, reduzindo retrabalho.' },
                { icon: '🔄', t: 'Modernização de sistemas', d: 'Atualizações em larga escala: troca de frameworks, modernização de stacks, atualização de dependências críticas.' },
                { icon: '📚', t: 'Documentação técnica viva', d: 'Documentação e decisões de arquitetura sempre atualizadas com o código — sem ninguém precisar lembrar.' },
                { icon: '🚨', t: 'Resposta a incidentes', d: 'Análise de logs, identificação da causa raiz em incidentes e correção sugerida antes do plantonista acordar.' },
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

        {/* ARQUITETURA */}
        <section id="arquitetura" className="border-t border-border-soft py-28">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div {...fadeUp} className="mx-auto mb-14 max-w-2xl text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Arquitetura
              </span>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-h md:text-5xl">
                Como os agentes se conectam ao seu time
              </h2>
              <p className="mt-4 text-text">
                4 camadas, sem mistério — entram onde seu time já trabalha e devolvem resultado direto onde já é visto.
              </p>
            </motion.div>

            <div className="space-y-3">
              {[
                {
                  tag: '01 · Entrada',
                  title: 'Onde seu time já trabalha',
                  desc: 'Os agentes ouvem os sistemas que vocês já usam — sem precisar trocar nada.',
                  chips: ['GitHub', 'GitLab', 'Jira', 'Slack', 'Linear'],
                },
                {
                  tag: '02 · Agentes',
                  title: 'A inteligência que faz o trabalho',
                  desc: 'Cada agente é especialista em uma parte do ciclo — e trabalham em paralelo.',
                  chips: ['Planejamento', 'Revisão', 'Testes', 'Documentação', 'Debug'],
                },
                {
                  tag: '03 · Integração',
                  title: 'Dentro da sua infra, seguindo seus padrões',
                  desc: 'Roda na sua nuvem ou data center próprio. Seu código nunca sai. Suas regras valem.',
                  chips: ['Sua infra', 'Suas políticas', 'Seus dados', 'SOC 2'],
                },
                {
                  tag: '04 · Saída',
                  title: 'Resultado direto onde o time vê',
                  desc: 'Sem dashboards extras. O agente entrega no canal que já é o ponto de verdade do time.',
                  chips: ['Pull requests prontas', 'Testes', 'Alertas', 'Documentação', 'Métricas'],
                },
              ].map((layer, i) => (
                <div key={layer.tag}>
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-[var(--radius-card)] border border-border bg-bg-elev p-5 md:p-6"
                  >
                    <div className="grid gap-5 md:grid-cols-[160px_1fr] md:items-center">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">{layer.tag}</p>
                        <h3 className="mt-1 text-lg font-semibold text-text-h">{layer.title}</h3>
                      </div>
                      <div>
                        <p className="text-sm text-text">{layer.desc}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {layer.chips.map(chip => (
                            <span
                              key={chip}
                              className="rounded-md border border-border-soft bg-bg px-2.5 py-1 text-[11px] font-medium text-text-h"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Connector arrow between layers */}
                  {i < 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                      className="flex justify-center py-2"
                    >
                      <svg width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden>
                        <path d="M8 1v17m0 0l6-6m-6 6l-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* METODOLOGIA */}
        <section id="metodologia" className="relative isolate overflow-hidden border-t border-border-soft bg-bg-elev/40 py-28">
          <PerspectiveGrid className="absolute inset-0 -z-10" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg/60 via-transparent to-bg/80" />

          <div className="mx-auto max-w-7xl px-6">
            <motion.div {...fadeUp} className="mx-auto mb-12 max-w-2xl text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Metodologia
              </span>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-h md:text-5xl">
                Do diagnóstico à produção em 30 dias
              </h2>
              <p className="mt-4 text-text">
                Processo testado, ajustado pra reduzir risco e entregar agentes confiáveis dentro do seu fluxo de trabalho.
              </p>
            </motion.div>

            {/* 30-day journey rail */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="mx-auto mb-12 max-w-5xl"
            >
              <div className="mb-2 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-wider text-text-muted">
                <span>Dia 0</span>
                <span className="text-accent">30 dias até produção</span>
                <span>Dia 30</span>
              </div>
              <div className="relative h-1.5 overflow-hidden rounded-full bg-border-soft">
                <motion.div
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 1.6, ease: 'easeOut', delay: 0.2 }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent via-accent-2 to-accent-3 shadow-[0_0_10px_rgba(var(--accent-rgb),0.6)]"
                />
                {[25, 75].map(pct => (
                  <span
                    key={pct}
                    style={{ left: `${pct}%` }}
                    className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-bg-elev bg-accent"
                  />
                ))}
              </div>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                { n: '01', t: 'Diagnóstico técnico', dur: 'Semana 1', d: 'Workshop com líderes técnicos, mapeamento de gargalos (revisões travadas, retrabalho, incidentes recorrentes) e priorização por impacto no negócio.' },
                { n: '02', t: 'Construção', dur: 'Semanas 2-3', d: 'Mapeamos sua base de código, construímos os agentes, integramos com seu repositório e validamos em ambiente de testes.' },
                { n: '03', t: 'Go-live + handover', dur: 'Semana 4', d: 'Colocamos em produção, integramos com seu fluxo atual e treinamos o time pra evoluir o sistema sozinho.' },
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
                Resultados reais, não promessas
              </h2>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
              {/* Hero stat */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6 }}
                className="relative isolate overflow-hidden rounded-[var(--radius-card)] border border-border bg-gradient-to-br from-bg-elev to-bg-soft p-8 md:p-12"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10
                    [background:radial-gradient(700px_400px_at_20%_20%,rgba(var(--accent-rgb),0.18),transparent_70%)]"
                />
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Maior impacto</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Empresa B2B · 40 devs</span>
                </div>
                <div className="mt-6 text-7xl font-bold tracking-tight text-grad md:text-8xl">67%</div>
                <p className="mt-4 max-w-md text-xl font-medium text-text-h md:text-2xl">
                  Redução no tempo médio de revisão de código
                </p>
                <div className="mt-8 max-w-sm">
                  <div className="mb-2 flex justify-between font-mono text-[11px] text-text-muted">
                    <span>Antes — ~3h por revisão</span>
                    <span className="text-accent">Depois — ~1h</span>
                  </div>
                  <div className="relative h-1.5 overflow-hidden rounded-full bg-border-soft">
                    <motion.div
                      initial={{ width: '100%' }}
                      whileInView={{ width: '33%' }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent-2"
                    />
                  </div>
                </div>
              </motion.div>

              {/* 2 secondary stats */}
              <div className="grid gap-5">
                {[
                  { kpi: '3,4x', label: 'Velocidade em modernização de sistemas', case: 'Atualização de framework · 200 componentes' },
                  { kpi: '85%', label: 'Cobertura de testes gerada automaticamente', case: 'Sistema em Python · 200 mil linhas de código' },
                ].map((c, i) => (
                  <motion.div
                    key={c.kpi}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                    className="rounded-[var(--radius-card)] border border-border bg-bg-elev p-6"
                  >
                    <div className="text-4xl font-bold tracking-tight text-grad">{c.kpi}</div>
                    <p className="mt-2 text-base font-medium text-text-h">{c.label}</p>
                    <p className="mt-1 text-xs text-text-muted">{c.case}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="relative isolate overflow-hidden border-t border-border-soft py-28">
          <AuroraBlobs className="absolute inset-0 -z-10 opacity-50" variant="c" />
          <div className="mx-auto max-w-3xl px-6">
            <motion.div {...fadeUp} className="mb-12 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-accent">FAQ</span>
              <h2 className="text-3xl font-semibold tracking-tight text-text-h md:text-4xl">Perguntas frequentes</h2>
            </motion.div>
            <div className="space-y-3">
              {[
                { q: 'Quais linguagens / frameworks vocês suportam?', a: 'Qualquer linguagem moderna (TypeScript, Python, Go, Java, Rust, Ruby, etc.). Os agentes aprendem o estilo e os padrões da sua base de código — não usamos modelos genéricos.' },
                { q: 'Como integramos com nosso repositório?', a: 'Via integração oficial com GitHub ou GitLab, com permissões mínimas. Configuração completa em ~10 minutos, sem alterar o seu processo atual de desenvolvimento.' },
                { q: 'Os agentes têm acesso ao nosso código privado?', a: 'Sim, com isolamento total. Existe a opção de instalação 100% dentro da sua infraestrutura (nuvem ou data center próprio) — o código nunca sai dela. Para requisitos críticos de privacidade, suportamos modelos de IA abertos.' },
                { q: 'Funciona com monorepo?', a: 'Sim, otimizado pros principais frameworks de monorepo. Os agentes entendem como os pedaços do sistema se conectam — sem perder contexto.' },
                { q: 'E se a IA "alucinar"? Posso confiar no código gerado?', a: 'Cada alteração feita por um agente passa por todos os seus testes automáticos antes de chegar em revisão humana. Você sempre tem a aprovação final — agentes nunca publicam código direto em produção.' },
                { q: 'Como vocês cobram?', a: 'Diagnóstico tem valor fixo. A implantação é cobrada por escopo, com pagamento por etapa. Sem mensalidade obrigatória — opcionalmente, você pode contratar um plano de evolução contínua.' },
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
                [background:radial-gradient(600px_300px_at_50%_0%,rgba(var(--accent-rgb),0.30),transparent_70%)]"
            />
            <div className="absolute -top-px left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent to-transparent" />

            <h2 className="text-balance text-3xl font-semibold tracking-tight text-text-h md:text-5xl">
              Onde IA pode acelerar sua tecnologia?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text">
              Diagnóstico técnico gratuito de 45min com nossos especialistas.
              Você sai com 3 oportunidades concretas de aplicação no seu negócio.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3">
              <a
                href="https://wa.me/5541996311605?text=Ol%C3%A1%21%20Tenho%20interesse%20no%20diagn%C3%B3stico%20t%C3%A9cnico%20gratuito%20da%20Agentize."
                target="_blank"
                rel="noopener noreferrer"
                className="ring-glow inline-flex items-center justify-center gap-3 rounded-xl bg-[#25D366] px-7 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Falar no WhatsApp
              </a>
              <p className="text-xs text-text-muted">Resposta em minutos · sem compromisso</p>
            </div>
          </motion.div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-border-soft px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 md:flex-row md:gap-20">
          <div className="max-w-xs">
            <a href="#top" className="flex items-center gap-2.5 font-bold text-text-h">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm text-white">◆</span>
              Agentize
            </a>
            <p className="mt-3 text-sm text-text-muted">
              Consultoria especializada em implantação de agentes de IA pra empresas que querem acelerar o desenvolvimento de software.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-12 text-sm">
            {[
              { h: 'Empresa', items: ['Sobre', 'Cases', 'Contato'] },
              { h: 'Serviços', items: ['Criação de código', 'Revisão automática', 'Modernização'] },
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
