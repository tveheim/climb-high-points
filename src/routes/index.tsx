import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
type HistPlayer = { name: string; rank: number; points: number };
type Snapshot = { date: string; players: HistPlayer[] };

const PLAYERS: Player[] = [
  { rank: 1, name: "Oddgeir", points: 143, change: 6, exact: 13 },
  { rank: 2, name: "Kjersti Lønningdal", points: 142, change: -1, exact: 10 },
  { rank: 3, name: "Alexander", points: 142, change: 5, exact: 8 },
  { rank: 4, name: "Mats Knudsen", points: 141, change: -2, exact: 15 },
  { rank: 5, name: "Marit H", points: 141, change: -2, exact: 13 },
  { rank: 6, name: "Joacim T", points: 141, change: 6, exact: 9 },
  { rank: 7, name: "Andreas Enehaug", points: 140, change: -3, exact: 16 },
  { rank: 8, name: "Einar Eikeland", points: 140, change: -3, exact: 14 },
  { rank: 8, name: "Frank Erik", points: 140, change: -3, exact: 14 },
  { rank: 10, name: "Christopher", points: 139, change: 3, exact: 13 },
  { rank: 11, name: "Irene", points: 138, change: -2, exact: 14 },
  { rank: 11, name: "Benjamin", points: 138, change: -2, exact: 14 },
  { rank: 13, name: "tROnd d", points: 138, change: -2, exact: 12 },
  { rank: 14, name: "Kristoffer Lie", points: 134, change: 2, exact: 10 },
  { rank: 14, name: "Geir", points: 134, change: 2, exact: 10 },
  { rank: 16, name: "Peter Nygård", points: 133, change: -2, exact: 13 },
  { rank: 17, name: "TroND M", points: 133, change: -2, exact: 9 },
  { rank: 18, name: "Andreas Veheim", points: 132, change: 0, exact: 8 },
  { rank: 19, name: "Fredrik Fahlstrøm", points: 130, change: 0, exact: 6 },
  { rank: 20, name: "Soccer-Hauken", points: 129, change: 0, exact: 7 },
  { rank: 21, name: "May Linn Berg", points: 128, change: 0, exact: 10 },
  { rank: 22, name: "Hilde Berg", points: 127, change: 0, exact: 9 },
  { rank: 23, name: "Øyvind", points: 125, change: 0, exact: 9 },
  { rank: 23, name: "Siv Merete Fjeldseth", points: 125, change: 0, exact: 9 },
  { rank: 25, name: "Thomas Veheim", points: 124, change: 0, exact: 12 },
  { rank: 26, name: "Megan", points: 123, change: 0, exact: 11 },
  { rank: 27, name: "Lars Kvalbein", points: 120, change: 0, exact: 10 },
  { rank: 28, name: "Jonathan", points: 120, change: 0, exact: 6 },
  { rank: 29, name: "Jørgen Ramsdal", points: 118, change: 0, exact: 10 },
  { rank: 30, name: "Kenneth Balsnes", points: 116, change: 1, exact: 12 },
  { rank: 31, name: "Lisbeth", points: 115, change: -1, exact: 7 },
  { rank: 32, name: "Darth Vader", points: 114, change: 0, exact: 10 },
  { rank: 33, name: "Tore Nesheim", points: 106, change: 0, exact: 6 },
  { rank: 34, name: "Bjørn Inge", points: 99, change: 0, exact: 7 },
  { rank: 35, name: "William", points: 95, change: 0, exact: 5 },
  { rank: 36, name: "Torkild Hjelmtveit", points: 84, change: 0, exact: 4 },
  { rank: 37, name: "Thomas Karlsnes", points: 80, change: 0, exact: 4 },
  { rank: 38, name: "Fahlstrom", points: 79, change: 0, exact: 5 },
  { rank: 39, name: "Rune Rafteseth", points: 76, change: 0, exact: 8 },
];

const HISTORY: Snapshot[] = [
  {
    date: "2026-06-27",
    players: [
      { name: "tROnd d", rank: 1, points: 95 },
      { name: "Einar Eikeland", rank: 2, points: 93 },
      { name: "Benjamin", rank: 3, points: 93 },
      { name: "Peter Nygård", rank: 4, points: 92 },
      { name: "Alexander", rank: 5, points: 92 },
      { name: "Geir Myhre", rank: 5, points: 92 },
      { name: "Mats Knudsen", rank: 7, points: 91 },
      { name: "Bjørn Inge", rank: 8, points: 91 },
      { name: "Christopher", rank: 9, points: 90 },
      { name: "Hilde Berg", rank: 10, points: 90 },
      { name: "Andreas Veheim", rank: 10, points: 90 },
      { name: "Lars Kvalbein", rank: 12, points: 87 },
      { name: "Frank Erik", rank: 13, points: 87 },
      { name: "Irene", rank: 14, points: 86 },
      { name: "Kristoffer Lie", rank: 14, points: 86 },
      { name: "Megan", rank: 14, points: 86 },
      { name: "Joacim T", rank: 17, points: 86 },
      { name: "Kjersti Lønningdal", rank: 17, points: 86 },
      { name: "Darth Vader", rank: 19, points: 85 },
      { name: "Siv Merete Fjeldseth", rank: 20, points: 85 },
      { name: "Oddgeir", rank: 20, points: 85 },
      { name: "Andreas Enehaug", rank: 22, points: 84 },
      { name: "Marit H", rank: 23, points: 84 },
      { name: "Thomas Veheim", rank: 24, points: 82 },
      { name: "Soccer-Hauken", rank: 25, points: 81 },
      { name: "May Linn Berg", rank: 26, points: 79 },
      { name: "Jørgen Ramsdal", rank: 27, points: 79 },
      { name: "Øyvind", rank: 28, points: 78 },
      { name: "TroND M", rank: 29, points: 77 },
      { name: "Fredrik Fahlstrøm", rank: 29, points: 77 },
      { name: "Lisbeth", rank: 31, points: 76 },
      { name: "Kenneth Balsnes", rank: 32, points: 72 },
      { name: "Fahlstrom", rank: 33, points: 71 },
      { name: "Jonathan", rank: 33, points: 71 },
      { name: "Rune Rafteseth", rank: 35, points: 69 },
      { name: "Tore Nesheim", rank: 36, points: 69 },
      { name: "Torkild Hjelmtveit", rank: 37, points: 68 },
      { name: "William", rank: 38, points: 54 },
      { name: "Thomas Karlsnes", rank: 39, points: 53 },
    ],
  },
  {
    date: "2026-06-28",
    players: [
      { name: "Alexander", rank: 1, points: 105 },
      { name: "Einar Eikeland", rank: 2, points: 104 },
      { name: "tROnd d", rank: 3, points: 103 },
      { name: "Geir Myhre", rank: 4, points: 101 },
      { name: "Peter Nygård", rank: 5, points: 100 },
      { name: "Christopher", rank: 5, points: 100 },
      { name: "Andreas Veheim", rank: 7, points: 100 },
      { name: "Mats Knudsen", rank: 8, points: 99 },
      { name: "Bjørn Inge", rank: 9, points: 99 },
      { name: "Hilde Berg", rank: 10, points: 98 },
      { name: "Joacim T", rank: 11, points: 98 },
      { name: "Benjamin", rank: 12, points: 97 },
      { name: "Andreas Enehaug", rank: 13, points: 96 },
      { name: "Kjersti Lønningdal", rank: 14, points: 96 },
      { name: "Irene", rank: 15, points: 95 },
      { name: "Megan", rank: 15, points: 95 },
      { name: "Marit H", rank: 17, points: 95 },
      { name: "Darth Vader", rank: 18, points: 94 },
      { name: "Lars Kvalbein", rank: 18, points: 94 },
      { name: "Kristoffer Lie", rank: 18, points: 94 },
      { name: "Frank Erik", rank: 21, points: 94 },
      { name: "Siv Merete Fjeldseth", rank: 22, points: 93 },
      { name: "Oddgeir", rank: 23, points: 92 },
      { name: "Soccer-Hauken", rank: 24, points: 92 },
      { name: "Thomas Veheim", rank: 25, points: 90 },
      { name: "Fredrik Fahlstrøm", rank: 26, points: 90 },
      { name: "May Linn Berg", rank: 27, points: 89 },
      { name: "TroND M", rank: 28, points: 87 },
      { name: "Øyvind", rank: 29, points: 86 },
      { name: "Jørgen Ramsdal", rank: 30, points: 85 },
      { name: "Kenneth Balsnes", rank: 31, points: 84 },
      { name: "Lisbeth", rank: 32, points: 82 },
      { name: "Jonathan", rank: 33, points: 77 },
      { name: "Rune Rafteseth", rank: 34, points: 76 },
      { name: "Tore Nesheim", rank: 35, points: 75 },
      { name: "Fahlstrom", rank: 36, points: 71 },
      { name: "Torkild Hjelmtveit", rank: 37, points: 68 },
      { name: "Thomas Karlsnes", rank: 38, points: 64 },
      { name: "William", rank: 39, points: 60 },
    ],
  },
  {
    date: "2026-06-29",
    players: [
      { name: "Alexander", rank: 1, points: 107 },
      { name: "tROnd d", rank: 2, points: 105 },
      { name: "Einar Eikeland", rank: 3, points: 104 },
      { name: "Peter Nygård", rank: 4, points: 102 },
      { name: "Christopher", rank: 4, points: 102 },
      { name: "Andreas Veheim", rank: 6, points: 102 },
      { name: "Hilde Berg", rank: 7, points: 101 },
      { name: "Geir Myhre", rank: 7, points: 101 },
      { name: "Joacim T", rank: 9, points: 100 },
      { name: "Mats Knudsen", rank: 10, points: 99 },
      { name: "Bjørn Inge", rank: 11, points: 99 },
      { name: "Irene", rank: 12, points: 98 },
      { name: "Andreas Enehaug", rank: 13, points: 98 },
      { name: "Kjersti Lønningdal", rank: 14, points: 98 },
      { name: "Benjamin", rank: 15, points: 97 },
      { name: "Marit H", rank: 16, points: 97 },
      { name: "Kristoffer Lie", rank: 17, points: 96 },
      { name: "Frank Erik", rank: 18, points: 96 },
      { name: "Megan", rank: 19, points: 95 },
      { name: "Siv Merete Fjeldseth", rank: 20, points: 95 },
      { name: "Darth Vader", rank: 21, points: 94 },
      { name: "Lars Kvalbein", rank: 21, points: 94 },
      { name: "Oddgeir", rank: 23, points: 94 },
      { name: "Soccer-Hauken", rank: 24, points: 94 },
      { name: "Fredrik Fahlstrøm", rank: 25, points: 92 },
      { name: "May Linn Berg", rank: 26, points: 91 },
      { name: "Thomas Veheim", rank: 27, points: 90 },
      { name: "TroND M", rank: 28, points: 90 },
      { name: "Øyvind", rank: 29, points: 89 },
      { name: "Jørgen Ramsdal", rank: 30, points: 87 },
      { name: "Kenneth Balsnes", rank: 31, points: 86 },
      { name: "Lisbeth", rank: 32, points: 82 },
      { name: "Jonathan", rank: 33, points: 79 },
      { name: "Rune Rafteseth", rank: 34, points: 76 },
      { name: "Tore Nesheim", rank: 35, points: 75 },
      { name: "Fahlstrom", rank: 36, points: 71 },
      { name: "Torkild Hjelmtveit", rank: 37, points: 68 },
      { name: "Thomas Karlsnes", rank: 38, points: 64 },
      { name: "William", rank: 39, points: 62 },
    ],
  },
  {
    date: "2026-06-30",
    players: [
      { name: "Alexander", rank: 1, points: 111 },
      { name: "Einar Eikeland", rank: 2, points: 109 },
      { name: "tROnd d", rank: 3, points: 109 },
      { name: "Christopher", rank: 4, points: 106 },
      { name: "Mats Knudsen", rank: 5, points: 105 },
      { name: "Joacim T", rank: 6, points: 105 },
      { name: "Peter Nygård", rank: 7, points: 104 },
      { name: "Marit H", rank: 8, points: 103 },
      { name: "Hilde Berg", rank: 8, points: 103 },
      { name: "Kjersti Lønningdal", rank: 11, points: 103 },
      { name: "Benjamin", rank: 12, points: 102 },
      { name: "Andreas Veheim", rank: 13, points: 102 },
      { name: "Andreas Enehaug", rank: 14, points: 101 },
      { name: "Irene", rank: 15, points: 100 },
      { name: "Megan", rank: 16, points: 99 },
      { name: "Frank Erik", rank: 17, points: 99 },
      { name: "Oddgeir", rank: 17, points: 99 },
      { name: "Bjørn Inge", rank: 17, points: 99 },
      { name: "Kristoffer Lie", rank: 20, points: 98 },
      { name: "Siv Merete Fjeldseth", rank: 21, points: 98 },
      { name: "Lars Kvalbein", rank: 22, points: 97 },
      { name: "Soccer-Hauken", rank: 23, points: 96 },
      { name: "Thomas Veheim", rank: 24, points: 95 },
      { name: "Darth Vader", rank: 25, points: 94 },
      { name: "TroND M", rank: 26, points: 94 },
      { name: "Fredrik Fahlstrøm", rank: 27, points: 94 },
      { name: "May Linn Berg", rank: 28, points: 93 },
      { name: "Kenneth Balsnes", rank: 29, points: 91 },
      { name: "Øyvind", rank: 30, points: 91 },
      { name: "Jørgen Ramsdal", rank: 31, points: 90 },
      { name: "Lisbeth", rank: 32, points: 82 },
      { name: "Jonathan", rank: 33, points: 81 },
      { name: "Tore Nesheim", rank: 34, points: 78 },
      { name: "Rune Rafteseth", rank: 35, points: 76 },
      { name: "Fahlstrom", rank: 36, points: 71 },
      { name: "Torkild Hjelmtveit", rank: 37, points: 68 },
      { name: "Thomas Karlsnes", rank: 38, points: 64 },
      { name: "William", rank: 39, points: 64 },
    ],
  },
  {
    date: "2026-07-01",
    players: [
      { name: "Einar Eikeland", rank: 1, points: 117 },
      { name: "Alexander", rank: 2, points: 116 },
      { name: "Mats Knudsen", rank: 3, points: 113 },
      { name: "tROnd d", rank: 4, points: 113 },
      { name: "Joacim T", rank: 5, points: 112 },
      { name: "Christopher", rank: 6, points: 111 },
      { name: "Andreas Enehaug", rank: 7, points: 110 },
      { name: "Geir", rank: 8, points: 109 },
      { name: "Kjersti Lønningdal", rank: 9, points: 109 },
      { name: "Benjamin", rank: 10, points: 108 },
      { name: "Peter Nygård", rank: 10, points: 108 },
      { name: "Marit H", rank: 12, points: 108 },
      { name: "Irene", rank: 13, points: 107 },
      { name: "Frank Erik", rank: 14, points: 107 },
      { name: "Megan", rank: 15, points: 106 },
      { name: "Hilde Berg", rank: 16, points: 106 },
      { name: "Andreas Veheim", rank: 17, points: 106 },
      { name: "Oddgeir", rank: 18, points: 105 },
      { name: "Kristoffer Lie", rank: 19, points: 102 },
      { name: "Lars Kvalbein", rank: 20, points: 101 },
      { name: "Fredrik Fahlstrøm", rank: 21, points: 101 },
      { name: "Soccer-Hauken", rank: 21, points: 101 },
      { name: "Thomas Veheim", rank: 23, points: 100 },
      { name: "May Linn Berg", rank: 24, points: 100 },
      { name: "Siv Merete Fjeldseth", rank: 25, points: 100 },
      { name: "TroND M", rank: 26, points: 99 },
      { name: "Bjørn Inge", rank: 26, points: 99 },
      { name: "Jørgen Ramsdal", rank: 28, points: 96 },
      { name: "Øyvind", rank: 29, points: 95 },
      { name: "Darth Vader", rank: 30, points: 94 },
      { name: "Kenneth Balsnes", rank: 31, points: 93 },
      { name: "Lisbeth", rank: 32, points: 88 },
      { name: "Jonathan", rank: 33, points: 85 },
      { name: "Tore Nesheim", rank: 34, points: 82 },
      { name: "Fahlstrom", rank: 35, points: 77 },
      { name: "Rune Rafteseth", rank: 36, points: 76 },
      { name: "Torkild Hjelmtveit", rank: 37, points: 76 },
      { name: "William", rank: 38, points: 70 },
      { name: "Thomas Karlsnes", rank: 39, points: 64 },
    ],
  },
  {
    date: "2026-07-02",
    players: [
      { name: "Einar Eikeland", rank: 1, points: 123 },
      { name: "tROnd d", rank: 2, points: 120 },
      { name: "Alexander", rank: 3, points: 120 },
      { name: "Mats Knudsen", rank: 4, points: 118 },
      { name: "Andreas Enehaug", rank: 5, points: 116 },
      { name: "Geir", rank: 6, points: 116 },
      { name: "Joacim T", rank: 7, points: 116 },
      { name: "Benjamin", rank: 8, points: 115 },
      { name: "Christopher", rank: 8, points: 115 },
      { name: "Marit H", rank: 10, points: 115 },
      { name: "Kjersti Lønningdal", rank: 11, points: 115 },
      { name: "Irene", rank: 12, points: 113 },
      { name: "Megan", rank: 13, points: 112 },
      { name: "Peter Nygård", rank: 13, points: 112 },
      { name: "Frank Erik", rank: 15, points: 111 },
      { name: "Hilde Berg", rank: 16, points: 110 },
      { name: "Oddgeir", rank: 16, points: 110 },
      { name: "Andreas Veheim", rank: 18, points: 110 },
      { name: "Kristoffer Lie", rank: 19, points: 108 },
      { name: "Siv Merete Fjeldseth", rank: 20, points: 107 },
      { name: "Fredrik Fahlstrøm", rank: 21, points: 106 },
      { name: "Thomas Veheim", rank: 22, points: 105 },
      { name: "May Linn Berg", rank: 23, points: 105 },
      { name: "Soccer-Hauken", rank: 24, points: 105 },
      { name: "Lars Kvalbein", rank: 25, points: 103 },
      { name: "TroND M", rank: 26, points: 103 },
      { name: "Øyvind", rank: 27, points: 102 },
      { name: "Bjørn Inge", rank: 28, points: 99 },
      { name: "Jørgen Ramsdal", rank: 29, points: 98 },
      { name: "Darth Vader", rank: 29, points: 98 },
      { name: "Kenneth Balsnes", rank: 31, points: 95 },
      { name: "Lisbeth", rank: 32, points: 93 },
      { name: "Jonathan", rank: 33, points: 91 },
      { name: "Tore Nesheim", rank: 34, points: 89 },
      { name: "Torkild Hjelmtveit", rank: 35, points: 82 },
      { name: "Fahlstrom", rank: 36, points: 79 },
      { name: "Rune Rafteseth", rank: 37, points: 76 },
      { name: "William", rank: 38, points: 74 },
      { name: "Thomas Karlsnes", rank: 39, points: 64 },
    ],
  },
  {
    date: "2026-07-03",
    players: [
      { name: "Alexander", rank: 1, points: 126 },
      { name: "Mats Knudsen", rank: 2, points: 125 },
      { name: "Einar Eikeland", rank: 3, points: 125 },
      { name: "tROnd d", rank: 4, points: 125 },
      { name: "Andreas Enehaug", rank: 5, points: 123 },
      { name: "Kjersti Lønningdal", rank: 6, points: 123 },
      { name: "Marit H", rank: 7, points: 121 },
      { name: "Geir", rank: 8, points: 120 },
      { name: "Christopher", rank: 9, points: 119 },
      { name: "Benjamin", rank: 9, points: 119 },
      { name: "Frank Erik", rank: 9, points: 119 },
      { name: "Irene", rank: 9, points: 119 },
      { name: "Joacim T", rank: 13, points: 119 },
      { name: "Megan", rank: 14, points: 117 },
      { name: "Oddgeir", rank: 15, points: 117 },
      { name: "Peter Nygård", rank: 16, points: 114 },
      { name: "Kristoffer Lie", rank: 17, points: 114 },
      { name: "Hilde Berg", rank: 17, points: 114 },
      { name: "Andreas Veheim", rank: 19, points: 113 },
      { name: "Fredrik Fahlstrøm", rank: 20, points: 112 },
      { name: "May Linn Berg", rank: 21, points: 111 },
      { name: "Soccer-Hauken", rank: 22, points: 111 },
      { name: "Thomas Veheim", rank: 23, points: 109 },
      { name: "TroND M", rank: 24, points: 109 },
      { name: "Siv Merete Fjeldseth", rank: 24, points: 109 },
      { name: "Øyvind", rank: 26, points: 106 },
      { name: "Lars Kvalbein", rank: 27, points: 105 },
      { name: "Darth Vader", rank: 28, points: 103 },
      { name: "Kenneth Balsnes", rank: 29, points: 101 },
      { name: "Jørgen Ramsdal", rank: 30, points: 101 },
      { name: "Bjørn Inge", rank: 31, points: 99 },
      { name: "Lisbeth", rank: 32, points: 97 },
      { name: "Jonathan", rank: 33, points: 97 },
      { name: "Tore Nesheim", rank: 34, points: 91 },
      { name: "Torkild Hjelmtveit", rank: 35, points: 82 },
      { name: "Fahlstrom", rank: 36, points: 79 },
      { name: "William", rank: 37, points: 78 },
      { name: "Rune Rafteseth", rank: 38, points: 76 },
      { name: "Thomas Karlsnes", rank: 39, points: 68 },
    ],
  },
  {
    date: "2026-07-04",
    players: [
      { name: "Einar Eikeland", rank: 1, points: 128 },
      { name: "Alexander", rank: 2, points: 128 },
      { name: "Mats Knudsen", rank: 3, points: 127 },
      { name: "tROnd d", rank: 4, points: 127 },
      { name: "Kjersti Lønningdal", rank: 5, points: 127 },
      { name: "Andreas Enehaug", rank: 6, points: 125 },
      { name: "Benjamin", rank: 7, points: 125 },
      { name: "Irene", rank: 7, points: 125 },
      { name: "Marit H", rank: 9, points: 125 },
      { name: "Frank Erik", rank: 10, points: 124 },
      { name: "Geir", rank: 11, points: 122 },
      { name: "Oddgeir", rank: 11, points: 122 },
      { name: "Christopher", rank: 13, points: 121 },
      { name: "Joacim T", rank: 14, points: 121 },
      { name: "Peter Nygård", rank: 15, points: 120 },
      { name: "Kristoffer Lie", rank: 16, points: 119 },
      { name: "Andreas Veheim", rank: 17, points: 118 },
      { name: "Megan", rank: 18, points: 117 },
      { name: "Hilde Berg", rank: 19, points: 116 },
      { name: "Siv Merete Fjeldseth", rank: 20, points: 114 },
      { name: "TroND M", rank: 20, points: 114 },
      { name: "Fredrik Fahlstrøm", rank: 22, points: 114 },
      { name: "Soccer-Hauken", rank: 22, points: 114 },
      { name: "May Linn Berg", rank: 24, points: 113 },
      { name: "Thomas Veheim", rank: 25, points: 111 },
      { name: "Øyvind", rank: 26, points: 111 },
      { name: "Lars Kvalbein", rank: 27, points: 110 },
      { name: "Kenneth Balsnes", rank: 28, points: 106 },
      { name: "Darth Vader", rank: 29, points: 103 },
      { name: "Jørgen Ramsdal", rank: 29, points: 103 },
      { name: "Jonathan", rank: 31, points: 102 },
      { name: "Bjørn Inge", rank: 32, points: 99 },
      { name: "Lisbeth", rank: 32, points: 99 },
      { name: "Tore Nesheim", rank: 34, points: 94 },
      { name: "Torkild Hjelmtveit", rank: 35, points: 82 },
      { name: "William", rank: 36, points: 80 },
      { name: "Fahlstrom", rank: 37, points: 79 },
      { name: "Rune Rafteseth", rank: 38, points: 76 },
      { name: "Thomas Karlsnes", rank: 39, points: 70 },
    ],
  },
  {
    date: "2026-07-06",
    players: [
      { name: "Andreas Enehaug", rank: 1, points: 132 },
      { name: "Einar Eikeland", rank: 2, points: 132 },
      { name: "Irene", rank: 2, points: 132 },
      { name: "Alexander", rank: 4, points: 132 },
      { name: "Mats Knudsen", rank: 5, points: 131 },
      { name: "Frank Erik", rank: 6, points: 131 },
      { name: "Oddgeir", rank: 7, points: 131 },
      { name: "tROnd d", rank: 7, points: 131 },
      { name: "Kjersti Lønningdal", rank: 9, points: 131 },
      { name: "Marit H", rank: 10, points: 130 },
      { name: "Joacim T", rank: 11, points: 130 },
      { name: "Benjamin", rank: 12, points: 129 },
      { name: "Christopher", rank: 13, points: 128 },
      { name: "Peter Nygård", rank: 14, points: 126 },
      { name: "Geir", rank: 15, points: 126 },
      { name: "Andreas Veheim", rank: 16, points: 126 },
      { name: "Kristoffer Lie", rank: 17, points: 123 },
      { name: "Hilde Berg", rank: 17, points: 123 },
      { name: "Fredrik Fahlstrøm", rank: 19, points: 122 },
      { name: "Megan", rank: 20, points: 121 },
      { name: "TroND M", rank: 21, points: 121 },
      { name: "Soccer-Hauken", rank: 22, points: 121 },
      { name: "May Linn Berg", rank: 23, points: 119 },
      { name: "Siv Merete Fjeldseth", rank: 24, points: 118 },
      { name: "Lars Kvalbein", rank: 25, points: 116 },
      { name: "Thomas Veheim", rank: 26, points: 115 },
      { name: "Øyvind", rank: 27, points: 115 },
      { name: "Kenneth Balsnes", rank: 28, points: 110 },
      { name: "Darth Vader", rank: 29, points: 110 },
      { name: "Jonathan", rank: 30, points: 108 },
      { name: "Jørgen Ramsdal", rank: 31, points: 107 },
      { name: "Lisbeth", rank: 32, points: 107 },
      { name: "Tore Nesheim", rank: 33, points: 100 },
      { name: "Bjørn Inge", rank: 34, points: 99 },
      { name: "William", rank: 35, points: 87 },
      { name: "Torkild Hjelmtveit", rank: 36, points: 84 },
      { name: "Fahlstrom", rank: 37, points: 79 },
      { name: "Rune Rafteseth", rank: 38, points: 76 },
      { name: "Thomas Karlsnes", rank: 39, points: 76 },
    ],
  },
  {
    date: "2026-07-07",
    players: [
      { name: "Mats Knudsen", rank: 1, points: 135 },
      { name: "Andreas Enehaug", rank: 2, points: 134 },
      { name: "Einar Eikeland", rank: 3, points: 134 },
      { name: "Irene", rank: 3, points: 134 },
      { name: "Oddgeir", rank: 5, points: 134 },
      { name: "tROnd d", rank: 5, points: 134 },
      { name: "Alexander", rank: 7, points: 134 },
      { name: "Frank Erik", rank: 8, points: 133 },
      { name: "Kjersti Lønningdal", rank: 9, points: 133 },
      { name: "Marit H", rank: 10, points: 132 },
      { name: "Benjamin", rank: 11, points: 131 },
      { name: "Christopher", rank: 12, points: 130 },
      { name: "Joacim T", rank: 13, points: 130 },
      { name: "Peter Nygård", rank: 14, points: 129 },
      { name: "Geir", rank: 15, points: 128 },
      { name: "Andreas Veheim", rank: 16, points: 128 },
      { name: "Hilde Berg", rank: 17, points: 125 },
      { name: "Kristoffer Lie", rank: 17, points: 125 },
      { name: "TroND M", rank: 17, points: 125 },
      { name: "Fredrik Fahlstrøm", rank: 20, points: 124 },
      { name: "Soccer-Hauken", rank: 21, points: 123 },
      { name: "Megan", rank: 22, points: 121 },
      { name: "May Linn Berg", rank: 23, points: 121 },
      { name: "Thomas Veheim", rank: 24, points: 118 },
      { name: "Siv Merete Fjeldseth", rank: 25, points: 118 },
      { name: "Øyvind", rank: 25, points: 118 },
      { name: "Lars Kvalbein", rank: 27, points: 116 },
      { name: "Kenneth Balsnes", rank: 28, points: 110 },
      { name: "Darth Vader", rank: 29, points: 110 },
      { name: "Jonathan", rank: 30, points: 110 },
      { name: "Jørgen Ramsdal", rank: 31, points: 109 },
      { name: "Lisbeth", rank: 32, points: 109 },
      { name: "Tore Nesheim", rank: 33, points: 102 },
      { name: "Bjørn Inge", rank: 34, points: 99 },
      { name: "William", rank: 35, points: 87 },
      { name: "Torkild Hjelmtveit", rank: 36, points: 84 },
      { name: "Fahlstrom", rank: 37, points: 79 },
      { name: "Rune Rafteseth", rank: 38, points: 76 },
      { name: "Thomas Karlsnes", rank: 39, points: 76 },
    ],
  },
  {
    date: "2026-07-08",
    players: [
      { name: "Mats Knudsen", rank: 1, points: 137 },
      { name: "Kjersti Lønningdal", rank: 2, points: 137 },
      { name: "Andreas Enehaug", rank: 3, points: 136 },
      { name: "Irene", rank: 4, points: 136 },
      { name: "Einar Eikeland", rank: 4, points: 136 },
      { name: "Marit H", rank: 6, points: 136 },
      { name: "tROnd d", rank: 6, points: 136 },
      { name: "Oddgeir", rank: 6, points: 136 },
      { name: "Alexander", rank: 9, points: 136 },
      { name: "Frank Erik", rank: 10, points: 135 },
      { name: "Joacim T", rank: 11, points: 134 },
      { name: "Benjamin", rank: 12, points: 133 },
      { name: "Christopher", rank: 13, points: 132 },
      { name: "Peter Nygård", rank: 14, points: 131 },
      { name: "Geir", rank: 15, points: 130 },
      { name: "Andreas Veheim", rank: 16, points: 130 },
      { name: "TroND M", rank: 17, points: 129 },
      { name: "Kristoffer Lie", rank: 18, points: 127 },
      { name: "Fredrik Fahlstrøm", rank: 19, points: 126 },
      { name: "Hilde Berg", rank: 20, points: 125 },
      { name: "Soccer-Hauken", rank: 21, points: 125 },
      { name: "Megan", rank: 22, points: 123 },
      { name: "May Linn Berg", rank: 23, points: 123 },
      { name: "Thomas Veheim", rank: 24, points: 122 },
      { name: "Siv Merete Fjeldseth", rank: 25, points: 120 },
      { name: "Øyvind", rank: 25, points: 120 },
      { name: "Lars Kvalbein", rank: 27, points: 118 },
      { name: "Jonathan", rank: 28, points: 114 },
      { name: "Kenneth Balsnes", rank: 29, points: 112 },
      { name: "Jørgen Ramsdal", rank: 30, points: 111 },
      { name: "Lisbeth", rank: 31, points: 111 },
      { name: "Darth Vader", rank: 32, points: 110 },
      { name: "Tore Nesheim", rank: 33, points: 104 },
      { name: "Bjørn Inge", rank: 34, points: 99 },
      { name: "William", rank: 35, points: 90 },
      { name: "Torkild Hjelmtveit", rank: 36, points: 84 },
      { name: "Thomas Karlsnes", rank: 37, points: 80 },
      { name: "Fahlstrom", rank: 38, points: 79 },
      { name: "Rune Rafteseth", rank: 39, points: 76 },
    ],
  },
  {
    date: "2026-07-10",
    players: [
      { name: "Mats Knudsen", rank: 1, points: 139 },
      { name: "Kjersti Lønningdal", rank: 2, points: 139 },
      { name: "Andreas Enehaug", rank: 3, points: 138 },
      { name: "Einar Eikeland", rank: 4, points: 138 },
      { name: "Irene", rank: 4, points: 138 },
      { name: "Frank Erik", rank: 4, points: 138 },
      { name: "Oddgeir", rank: 7, points: 138 },
      { name: "Marit H", rank: 7, points: 138 },
      { name: "Alexander", rank: 9, points: 138 },
      { name: "tROnd d", rank: 10, points: 136 },
      { name: "Joacim T", rank: 11, points: 136 },
      { name: "Benjamin", rank: 12, points: 135 },
      { name: "Christopher", rank: 13, points: 134 },
      { name: "Peter Nygård", rank: 14, points: 131 },
      { name: "TroND M", rank: 15, points: 131 },
      { name: "Kristoffer Lie", rank: 16, points: 130 },
      { name: "Geir", rank: 16, points: 130 },
      { name: "Andreas Veheim", rank: 18, points: 130 },
      { name: "Fredrik Fahlstrøm", rank: 19, points: 128 },
      { name: "Hilde Berg", rank: 20, points: 127 },
      { name: "Soccer-Hauken", rank: 21, points: 127 },
      { name: "May Linn Berg", rank: 22, points: 126 },
      { name: "Megan", rank: 23, points: 123 },
      { name: "Øyvind", rank: 24, points: 123 },
      { name: "Thomas Veheim", rank: 25, points: 122 },
      { name: "Siv Merete Fjeldseth", rank: 26, points: 122 },
      { name: "Lars Kvalbein", rank: 27, points: 118 },
      { name: "Jonathan", rank: 28, points: 116 },
      { name: "Kenneth Balsnes", rank: 29, points: 114 },
      { name: "Jørgen Ramsdal", rank: 30, points: 113 },
      { name: "Lisbeth", rank: 31, points: 113 },
      { name: "Darth Vader", rank: 32, points: 112 },
      { name: "Tore Nesheim", rank: 33, points: 104 },
      { name: "Bjørn Inge", rank: 34, points: 99 },
      { name: "William", rank: 35, points: 92 },
      { name: "Torkild Hjelmtveit", rank: 36, points: 84 },
      { name: "Thomas Karlsnes", rank: 37, points: 80 },
      { name: "Fahlstrom", rank: 38, points: 79 },
      { name: "Rune Rafteseth", rank: 39, points: 76 },
    ],
  },
  {
    date: "2026-07-11",
    players: [
      { name: "Kjersti Lønningdal", rank: 1, points: 142 },
      { name: "Mats Knudsen", rank: 2, points: 141 },
      { name: "Marit H", rank: 3, points: 141 },
      { name: "Andreas Enehaug", rank: 4, points: 140 },
      { name: "Einar Eikeland", rank: 5, points: 140 },
      { name: "Frank Erik", rank: 5, points: 140 },
      { name: "Oddgeir", rank: 7, points: 140 },
      { name: "Alexander", rank: 8, points: 140 },
      { name: "Benjamin", rank: 9, points: 138 },
      { name: "Irene", rank: 9, points: 138 },
      { name: "tROnd d", rank: 11, points: 138 },
      { name: "Joacim T", rank: 12, points: 138 },
      { name: "Christopher", rank: 13, points: 137 },
      { name: "Peter Nygård", rank: 14, points: 133 },
      { name: "TroND M", rank: 15, points: 133 },
      { name: "Kristoffer Lie", rank: 16, points: 132 },
      { name: "Geir", rank: 16, points: 132 },
      { name: "Andreas Veheim", rank: 18, points: 132 },
      { name: "Fredrik Fahlstrøm", rank: 19, points: 130 },
      { name: "Soccer-Hauken", rank: 20, points: 129 },
      { name: "May Linn Berg", rank: 21, points: 128 },
      { name: "Hilde Berg", rank: 22, points: 127 },
      { name: "Øyvind", rank: 23, points: 125 },
      { name: "Siv Merete Fjeldseth", rank: 23, points: 125 },
      { name: "Thomas Veheim", rank: 25, points: 124 },
      { name: "Megan", rank: 26, points: 123 },
      { name: "Lars Kvalbein", rank: 27, points: 120 },
      { name: "Jonathan", rank: 28, points: 118 },
      { name: "Jørgen Ramsdal", rank: 29, points: 115 },
      { name: "Lisbeth", rank: 30, points: 115 },
      { name: "Kenneth Balsnes", rank: 31, points: 114 },
      { name: "Darth Vader", rank: 32, points: 114 },
      { name: "Tore Nesheim", rank: 33, points: 106 },
      { name: "Bjørn Inge", rank: 34, points: 99 },
      { name: "William", rank: 35, points: 95 },
      { name: "Torkild Hjelmtveit", rank: 36, points: 84 },
      { name: "Thomas Karlsnes", rank: 37, points: 80 },
      { name: "Fahlstrom", rank: 38, points: 79 },
      { name: "Rune Rafteseth", rank: 39, points: 76 },
    ],
  },
  {
    date: "2026-07-12",
    players: PLAYERS.map(({ name, rank, points }) => ({ name, rank, points })),
  },
];

const POT = 10000; // kr — visningsverdi
const fmtKr = (n: number) => new Intl.NumberFormat("nb-NO").format(n) + " kr";

function Leaderboard() {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const topClimber = [...PLAYERS].sort((a, b) => b.change - a.change)[0];
  const topFaller = [...PLAYERS].sort((a, b) => a.change - b.change)[0];
  const lastRank = Math.max(...PLAYERS.map((p) => p.rank));
  const bottomRanks = Array.from(new Set([...PLAYERS].map((p) => p.rank))).sort((a, b) => b - a).slice(0, 3);
  const bottomSet = new Set(bottomRanks);

  return (
    <>
      <div className="min-h-screen pb-16">
        {/* Header */}
        <header className="px-5 pt-8 pb-6">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span>11. juli 2026</span>
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
                      onNameClick={() => setSelectedPlayer(p.name)}
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

      {selectedPlayer && (
        <PlayerModal name={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}
    </>
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
  onNameClick,
}: {
  player: Player;
  highlight: "first" | "second" | "bottom" | "none";
  isAbsoluteLast: boolean;
  onNameClick?: () => void;
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
        <button
          type="button"
          onClick={onNameClick}
          className={`flex w-full items-center gap-1.5 truncate text-[17px] font-bold leading-tight text-left ${nameClass} hover:underline underline-offset-2 cursor-pointer`}
        >
          {trophy && <span className="shrink-0 text-lg leading-none">{trophy}</span>}
          <span className="truncate">{player.name}</span>
        </button>
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

function PlayerModal({ name, onClose }: { name: string; onClose: () => void }) {
  const chartData = HISTORY.map((snap) => {
    const p = snap.players.find((pl) => pl.name === name);
    if (!p) return null;
    return {
      date: snap.date.slice(5), // "MM-DD"
      points: p.points,
      rank: p.rank,
    };
  }).filter((x): x is { date: string; points: number; rank: number } => x !== null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-0.5">
              Utvikling
            </div>
            <h2 className="font-display text-xl font-bold">{name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-xl bg-muted text-muted-foreground hover:bg-muted/80 text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {chartData.length < 2 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Ikkje nok historiske data for {name}.
          </p>
        ) : (
          <>
            {/* Points chart */}
            <div className="mb-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Poeng per runde
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.4 0 0 / 0.3)" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "oklch(0.6 0 0)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "oklch(0.6 0 0)" }}
                  tickLine={false}
                  axisLine={false}
                  domain={["auto", "auto"]}
                />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.18 0.01 260)",
                    border: "1px solid oklch(0.35 0 0)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  labelStyle={{ color: "oklch(0.7 0 0)" }}
                  itemStyle={{ color: "#e8b84b" }}
                />
                <Line
                  type="monotone"
                  dataKey="points"
                  stroke="#e8b84b"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#e8b84b", strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Rank chart */}
            <div className="mt-4 mb-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Tabellposisjon per runde
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.4 0 0 / 0.3)" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "oklch(0.6 0 0)" }}
                  tickLine={false}
                />
                <YAxis
                  reversed
                  tick={{ fontSize: 10, fill: "oklch(0.6 0 0)" }}
                  tickLine={false}
                  axisLine={false}
                  domain={["auto", "auto"]}
                />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.18 0.01 260)",
                    border: "1px solid oklch(0.35 0 0)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  labelStyle={{ color: "oklch(0.7 0 0)" }}
                  itemStyle={{ color: "#60a5fa" }}
                  formatter={(v: number) => [`#${v}`, "Plass"]}
                />
                <Line
                  type="monotone"
                  dataKey="rank"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#60a5fa", strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </div>
    </div>
  );
}

// Keep variable referenced (could be wired to backend later)
void POT;
void fmtKr;
