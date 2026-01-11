# Buldring PWA

En enkel, gratis «app» for iPhone (og andre) som kan **legges til på Hjem‑skjerm** og fungerer **offline**. All data lagres **lokalt** i nettleseren (localStorage).

## Slik publiserer du gratis
1. Opprett et nytt repo på GitHub og last opp filene.
2. I repoet: **Settings → Pages → Branch: main / root**. Vent 1–2 min til siden er live.
3. Åpne URL‑en i **Safari på iPhone**, trykk **Del → Legg til på Hjem‑skjerm**.

(Alternativt: bruk Netlify/Vercel/Cloudflare Pages – dropp mappen og få en https‑URL.)

## Installasjonstips (iPhone)
- Åpne lenken i **Safari** (krav for «Legg til på Hjem‑skjerm»).
- Etter at ikonet er lagt til, åpne det – appen caches og virker offline.

## Endring av programmet
- Programmet ligger innebygd i `app.js` (objektet `program`). Oppdater tekst/rekkefølge etter behov.

## Eksport
- Under fanen **Eksport** kan du laste ned **CSV** eller **JSON** med loggen.

## Personvern
- Ingen eksterne kall; ingen data forlater enheten. Sletting av loggen gjøres i **Logg → Tøm all logg**.
