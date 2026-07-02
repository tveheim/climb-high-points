import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VM-Tipping 26 · Leaderboard" },
      { name: "description", content: "Live stilling for VM-Tipping 26. Hvem klatrer, hvem faller, hvem tar premiepotten?" },
      { property: "og:title", content: "VM-Tipping 26" },
      { property: "og:description", content: "Live stilling for VM-Tipping 26." },
    ],
  }),
  component: Leaderboard,
});

type Player = { rank: number; name: string; points: number; change: number; exact: number };

const PLAYERS: Player[] = [
  { rank: 1, name: "Einar Eikeland", points: 123, change: 0, exact: 13 },
  { rank: 2, name: "tROnd d", points: 120, change: 2, exact: 10 },
  { rank: 3, name: "Alexander", points: 120, change: -1, exact: 8 },
  { rank: 4, name: "Mats Knudsen", points: 118, change: -1, exact: 14 },
  { rank: 5, name: "Andreas Enehaug", points: 116, change: 2, exact: 14 },
  { rank: 6, name: "Geir", points: 116, change: 2, exact: 10 },
  { rank: 7, name: "Joacim T", points: 116, change: -2, exact: 6 },
  { rank: 8, name: "Benjamin", points: 115, change: 2, exact: 11 },
  { rank: 8, name: "Christopher", points: 115, change: -2, exact: 11 },
  { rank: 10, name: "Marit H", points: 115, change: 2, exact: 9 },
  { rank: 11, name: "Kjersti Lønningdal", points: 115, change: -2, exact: 7 },
  { rank: 12, name: "Irene", points: 113, change: 1, exact: 11 },
  { rank: 13, name: "Megan", points: 112, change: 2, exact: 10 },
  { rank: 13, name: "Peter Nygård", points: 112, change: -3, exact: 10 },
  { rank: 15, name: "Frank Erik", points: 111, change: -1, exact: 9 },
  { rank: 16, name: "Hilde Berg", points: 110, change: 0, exact: 8 },
  { rank: 16, name: "Oddgeir", points: 110, change: 2, exact: 8 },
  { rank: 18, name: "Andreas Veheim", points: 110, change: -1, exact: 6 },
  { rank: 19, name: "Kristoffer Lie", points: 108, change: 0, exact: 8 },
  { rank: 20, name: "Siv Merete Fjeldseth", points: 107, change: 5, exact: 7 },
  { rank: 21, name: "Fredrik Fahlstrøm", points: 106, change: 0, exact: 6 },
  { rank: 22, name: "Thomas Veheim", points: 105, change: 1, exact: 11 },
  { rank: 23, name: "May Linn Berg", points: 105, change: 1, exact: 9 },
  { rank: 24, name: "Soccer-Hauken", points: 105, change: -3, exact: 5 },
  { rank: 25, name: "Lars Kvalbein", points: 103, change: -5, exact: 9 },
  { rank: 26, name: "TroND M", points: 103, change: 0, exact: 7 },
  { rank: 27, name: "Øyvind", points: 102, change: 2, exact: 6 },
  { rank: 28, name: "Bjørn Inge", points: 99, change: -2, exact: 7 },
  { rank: 29, name: "Jørgen Ramsdal", points: 98, change: -1, exact: 8 },
  { rank: 29, name: "Darth Vader", points: 98, change: 1, exact: 8 },
  { rank: 31, name: "Kenneth Balsnes", points: 95, change: 0, exact: 9 },
  { rank: 32, name: "Lisbeth", points: 93, change: 0, exact: 7 },
  { rank: 33, name: "Jonathan", points: 91, change: 0, exact: 5 },
  { rank: 34, name: "Tore Nesheim", points: 89, change: 0, exact: 5 },
  { rank: 35, name: "Torkild Hjelmtveit", points: 82, change: 2, exact: 4 },
  { rank: 36, name: "Fahlstrom", points: 79, change: -1, exact: 5 },
  { rank: 37, name: "Rune Rafteseth", points: 76, change: -1, exact: 8 },
  { rank: 38, name: "William", points: 74, change: 0, exact: 2 },
  { rank: 39, name: "Thomas Karlsnes", points: 64, change: 0, exact: 4 },
];

const POT = 10000; // kr — visningsverdi
const fmtKr = (n: number) => new Intl.NumberFormat("nb-NO").format(n) + " kr";

function Leaderboard() {
  const topClimber = [...PLAYERS].sort((a, b) => b.change - a.change)[0];
  const topFaller = [...PLAYERS].sort((a, b) => a.change - b.change)[0];
  const lastRank = Math.max(...PLAYERS.map((p) => p.rank));
  const bottomRanks = Array.from(new Set([...PLAYERS].map((p) => p.rank))).sort((a, b) => b - a).slice(0, 3);
  const bottomSet = new Set(bottomRanks);

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <header className="px-5 pt-8 pb-6">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            <span>2. juli 2026</span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block size-1.5 rounded-full bg-up animate-pulse" />
              Live
            </span>
          </div>
          <h1 className="mt-3 font-display text-[44px] leading-[0.95] font-bold tracking-tight sm:text-6xl">
            VM-Tipping
            <span className="text-gold"> 26</span>
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Runde · live stilling
          </p>

          {/* Top news banner */}
          <div className="mt-5 rounded-2xl border border-gold/30 bg-gold/[0.08] p-4 shadow-gold">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚨</span>
              <div className="min-w-0">
                <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-gold/90">Ny toppleiing</div>
                <div className="mt-0.5 truncate text-lg font-bold">
                  {PLAYERS[0].name} <span className="text-muted-foreground font-medium">· {PLAYERS[0].points} poeng</span>
                </div>
                <div className="mt-0.5 text-sm text-up font-mono">+{PLAYERS[0].change} siden sist</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spotlight cards */}
      <section className="px-5">
        <div className="mx-auto max-w-2xl space-y-3">
          {/* Podium */}
          <div className="grid grid-cols-[1fr_1fr] gap-3">
            <PodiumCard player={PLAYERS[0]} place={1} share={70} />
            <PodiumCard player={PLAYERS[1]} place={2} share={30} />
          </div>

          {/* Momentum */}
          <div className="grid grid-cols-2 gap-3">
            <MomentumCard
              emoji="🚀"
              label="Klatrer mest"
              player={topClimber}
              tone="up"
            />
            <MomentumCard
              emoji="🪂"
              label="Faller mest"
              player={topFaller}
              tone="down"
            />
          </div>
        </div>
      </section>

      {/* Full table */}
      <section className="mt-8 px-5">
        <div className="mx-auto max-w-2xl">
          <div className="mb-3 flex items-baseline justify-between px-1">
            <h2 className="font-display text-xl font-bold">Hele stillingen</h2>
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              {PLAYERS.length} spillere
            </span>
          </div>

          <ol className="space-y-1.5">
            {PLAYERS.map((p, i) => {
              const isFirst = p.rank === 1;
              const isSecond = p.rank === 2;
              const isBottom = bottomSet.has(p.rank);
              return (
                <li key={i}>
                  <Row
                    player={p}
                    highlight={isFirst ? "first" : isSecond ? "second" : isBottom ? "bottom" : "none"}
                    isAbsoluteLast={p.rank === lastRank}
                  />
                </li>
              );
            })}
          </ol>

          <p className="mt-8 text-center text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            VM-Tipping 26 · fotmob.com
          </p>
        </div>
      </section>
    </div>
  );
}

function PodiumCard({ player, place, share }: { player: Player; place: 1 | 2; share: number }) {
  const gold = place === 1;
  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-4 ${
        gold ? "grad-gold shadow-gold text-[oklch(0.18_0.05_60)]" : "grad-silver shadow-silver text-[oklch(0.2_0.02_260)]"
      }`}
    >
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] opacity-80">
        <span>{gold ? "1. plass" : "2. plass"}</span>
        <span>{gold ? "🥇" : "🥈"}</span>
      </div>
      <div className="mt-3 truncate text-xl font-bold leading-tight">{player.name}</div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="font-display text-4xl font-bold tabular-nums">{player.points}</span>
        <span className="text-xs font-medium opacity-75">poeng</span>
      </div>
      <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-black/15 px-2 py-1 text-[11px] font-bold">
        💰 {share}% av potten
      </div>
    </div>
  );
}

function MomentumCard({
  emoji,
  label,
  player,
  tone,
}: {
  emoji: string;
  label: string;
  player: Player;
  tone: "up" | "down";
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-base leading-none">{emoji}</span>
        {label}
      </div>
      <div className="mt-2 truncate text-base font-bold">{player.name}</div>
      <div className={`mt-1 font-mono text-sm font-bold ${tone === "up" ? "text-up" : "text-down"}`}>
        {player.change > 0 ? "+" : ""}
        {player.change} plasser
      </div>
    </div>
  );
}

function Row({
  player,
  highlight,
  isAbsoluteLast,
}: {
  player: Player;
  highlight: "first" | "second" | "bottom" | "none";
  isAbsoluteLast: boolean;
}) {
  const base = "grid grid-cols-[44px_1fr_auto] items-center gap-3 rounded-2xl px-3 py-3 transition-colors";
  const styles: Record<typeof highlight, string> = {
    first: "border border-gold/40 bg-gold/[0.08]",
    second: "border border-silver/30 bg-silver/[0.06]",
    bottom: "border border-down/25 bg-down/[0.05]",
    none: "border border-border/60 bg-card/60 hover:bg-card",
  };

  const trophy =
    highlight === "first" ? "🥇" : highlight === "second" ? "🥈" : isAbsoluteLast ? "💀" : highlight === "bottom" ? "🥶" : null;

  const nameClass =
    highlight === "first"
      ? "text-gold"
      : highlight === "second"
      ? "text-foreground"
      : highlight === "bottom"
      ? "text-foreground"
      : "text-foreground";

  return (
    <div className={`${base} ${styles[highlight]}`}>
      {/* Rank */}
      <div className="flex items-center justify-center">
        <div
          className={`grid size-10 place-items-center rounded-xl font-mono text-base font-bold tabular-nums ${
            highlight === "first"
              ? "grad-gold text-[oklch(0.18_0.05_60)]"
              : highlight === "second"
              ? "grad-silver text-[oklch(0.2_0.02_260)]"
              : highlight === "bottom"
              ? "bg-down/15 text-down"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {player.rank}
        </div>
      </div>

      {/* Name + change */}
      <div className="min-w-0">
        <div className={`flex items-center gap-1.5 truncate text-[17px] font-bold leading-tight ${nameClass}`}>
          {trophy && <span className="shrink-0 text-lg leading-none">{trophy}</span>}
          <span className="truncate">{player.name}</span>
        </div>
        <ChangeBadge change={player.change} />
      </div>

      {/* Points + exact */}
      <div className="text-right">
        <div className="font-display text-2xl font-bold tabular-nums leading-none">{player.points}</div>
        <div className="mt-1 flex items-center justify-end gap-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">poeng</span>
          <span className="text-[11px] font-mono font-bold text-gold">({player.exact})</span>
        </div>
      </div>
    </div>
  );
}

function ChangeBadge({ change }: { change: number }) {
  if (change === 0) {
    return (
      <div className="mt-1 inline-flex items-center gap-1 text-xs font-mono text-muted-foreground">
        <span>—</span> uendret
      </div>
    );
  }
  const up = change > 0;
  return (
    <div
      className={`mt-1 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-mono font-bold ${
        up ? "bg-up/15 text-up" : "bg-down/15 text-down"
      }`}
    >
      <span className="text-[10px]">{up ? "▲" : "▼"}</span>
      {up ? "+" : ""}
      {change}
    </div>
  );
}

// Keep variable referenced (could be wired to backend later)
void POT;
void fmtKr;
