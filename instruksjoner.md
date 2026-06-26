# Instruksjoner: Oppdatere VM-Tipping 26 leaderboard

Disse instruksjonene brukes av Claude (eller annen AI-agent) hver gang stillingen i VM-Tipping 26 skal oppdateres. Målet er at sluttresultatet ser **helt likt** ut som dagens design — kun data endres.

---

## 1. Hva som skal oppdateres

Det eneste som normalt endres er **spillerdataen** i filen:

```
src/routes/index.tsx
```

Mer presist: konstanten `PLAYERS: Player[]` og eventuelt datoen i header.

**IKKE rør:**
- `src/styles.css` (design-tokens, farger, gradienter, skygger)
- `src/routes/__root.tsx` (fonts, meta)
- Layout, komponenter (`Leaderboard`, `PodiumCard`, `MomentumCard`, `Row`, `ChangeBadge`)
- Klassenavn, Tailwind-utilities, emoji-valg, tekster utenfor data

Hvis brukeren ber om designendringer er det en **annen oppgave** — disse instruksjonene gjelder kun datauppdateringer.

---

## 2. Datamodell

```ts
type Player = {
  rank: number;    // plassering, 1 = best. Like poeng = delt plass (samme rank-nummer)
  name: string;    // spillerens visningsnavn, EKSAKT som oppgitt (behold rare casing som "tROnd d")
  points: number;  // totalpoeng nå
  change: number;  // endring i ANTALL PLASSER siden forrige runde (positiv = klatret opp, negativ = falt)
};
```

### Regler for `rank`
- Sortert synkende etter `points`.
- Ved poenglikhet: alle får samme `rank`, og neste unike rank hopper tilsvarende (1, 2, 2, 4 …). Se eksisterende liste for referanse.
- Listen i `PLAYERS` skal være sortert stigende på `rank` (dvs. best først).

### Regler for `change`
- Positivt tall = klatret X plasser opp siden forrige runde.
- Negativt tall = falt X plasser ned.
- `0` = uendret plassering.
- Dette er **plasser**, ikke poeng.

### Regler for `name`
- Bevar nøyaktig staving og casing brukeren oppgir (f.eks. "tROnd d", "TroND M", "Fahlstrom" vs "Fredrik Fahlstrøm" — disse er forskjellige spillere).

---

## 3. Hvordan oppdatere `PLAYERS`

1. Bruker leverer ny stilling (typisk fra fotmob.com eller lignende).
2. Beregn `change` for hver spiller: `forrige_rank − ny_rank` (en spiller som gikk fra 7 til 4 har `change: 3`).
3. Erstatt hele `PLAYERS`-arrayen i `src/routes/index.tsx` med ny liste — samme objektstruktur, samme rekkefølge-prinsipp (sortert på rank stigende).
4. Oppdater datoen i headeren (`26. juni 2026`) til dagens dato på norsk (f.eks. `3. juli 2026`).
5. Ikke endre `POT`-konstanten med mindre bruker eksplisitt ber om det.

---

## 4. Automatiske visningsregler (gjør seg selv)

Følgende regnes ut automatisk i koden basert på `PLAYERS` — du trenger **ikke** gjøre noe ekstra:

- **Topp-banner** (🚨 "Ny toppleiing"): viser `PLAYERS[0]` (førsteplassen).
- **Podium-kort:**
  - 1. plass = `PLAYERS[0]`, vinner **70 %** av potten, gull-gradient, 🥇.
  - 2. plass = `PLAYERS[1]`, vinner **30 %** av potten, sølv-gradient, 🥈.
- **Momentum-kort:**
  - 🚀 "Klatrer mest" = spilleren med høyest `change`.
  - 🪂 "Faller mest" = spilleren med lavest `change`.
- **Tabell-highlighting:**
  - `rank === 1` → gull-ramme + 🥇.
  - `rank === 2` → sølv-ramme + 🥈.
  - De **tre laveste unike rank-verdiene** → blå/kald "bunnsjikt"-styling + 🥶.
  - Aller siste plass (`rank === max(rank)`) → 💀 i stedet for 🥶.
- **ChangeBadge** under navnet:
  - `change > 0` → grønn `▲ +N`.
  - `change < 0` → rød `▼ -N`.
  - `change === 0` → grå `— uendret`.

Så lenge `PLAYERS` er korrekt, blir alt det visuelle riktig av seg selv.

---

## 5. Sjekkliste før du leverer

- [ ] `PLAYERS` er sortert stigende på `rank`.
- [ ] Delte plasser har samme `rank`-nummer og hopper riktig (1, 2, 2, 4).
- [ ] Alle navn er stavet eksakt som oppgitt.
- [ ] `change` reflekterer plass-endring, ikke poeng-endring.
- [ ] Datoen i headeren er oppdatert.
- [ ] Ingen andre filer enn `src/routes/index.tsx` er endret.
- [ ] Antall spillere stemmer (vises automatisk i "X spillere").
- [ ] Bygget kompilerer uten feil.

---

## 6. Eksempel på `PLAYERS`-oppføring

```ts
{ rank: 4, name: "Bjørn Inge", points: 83, change: 7 },
```

Betyr: Bjørn Inge ligger på 4. plass med 83 poeng, og har klatret 7 plasser opp siden forrige oppdatering.

---

## 7. Hvis brukeren oppgir data i et annet format

Vanlige inputformater:

- **Tabell fra fotmob:** plassering | navn | poeng — beregn `change` ved å sammenligne mot forrige `PLAYERS` i fila.
- **Bare nye poeng:** behold navn og forrige rank, regn ut ny rank etter sortering, så `change`.
- **Bilde / screenshot:** les av plassering, navn, poeng — be om bekreftelse hvis noe er uleselig.

Hvis `change` ikke kan utledes (f.eks. helt ny spiller eller manglende historikk): bruk `change: 0` og nevn det kort til brukeren.

---

## 8. Tone og språk

- All synlig tekst er på **norsk (bokmål)**.
- Emojier brukes som i originalen: 🚨 🥇 🥈 🚀 🪂 🥶 💀 💰 — ikke bytt dem ut.
- Ikke legg til nye seksjoner, kort eller knapper med mindre brukeren ber om det.
