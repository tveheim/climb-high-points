# CLAUDE.md

Sjå `instruksjoner.md` for detaljerte reglar om korleis `src/routes/index.tsx` skal oppdaterast (datamodell, `rank`/`change`-logikk, kva som ikkje skal rørast, osv.).

## Git-regel — ALLTID etter ei oppdatering

Ved kvar VM-Tipping-oppdatering: etter at `index.tsx` er endra, ALLTID køyre:

```
git add -A && git commit -m "Oppdatering YYYY-MM-DD" && git push origin main
```

Ikkje stole på autopush-daemonen åleine. Daemonen (`autopush.sh`, installert via launchd som `no.veheim.vmtipping.autopush`) pollar og pushar automatisk kvart 10. sekund som eit sikkerheitsnett, men han skal ikkje vere den einaste mekanismen som sikrar at endringar kjem til `origin/main`.
