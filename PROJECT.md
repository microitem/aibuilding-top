# aibuilding.top — PROJECT.md

**Vytvorené:** 2026-02-24 | **Stav:** Fáza 6 — Deployment

---

## 📍 AKTUÁLNY STAV

**Fáza:** 6 — Deployment  
**Posledná akcia:** GitHub Actions workflow + production compose pripravený  
**Nasleduje:** CEO vytvorí GitHub repo `microitem/aibuilding-top`, pridá secrets, git push, prvý deploy tag `v1.0.0`

---

## 📋 Popis projektu

| Pole | Hodnota |
|------|---------|
| **Názov** | aibuilding.top |
| **Doména** | aibuilding.top |
| **Typ** | Statická landing page (HTML/CSS/JS) |
| **Stack** | HTML5 + CSS3 + Vanilla JS, Nginx, Docker |
| **GitHub repo** | https://github.com/microitem/aibuilding-top |
| **GHCR image** | `ghcr.io/microitem/aibuilding-top:latest` |
| **Kontajner** | `aibuilding-top` |
| **Port (dev/prod)** | 3020 |

---

## 🏗️ Štruktúra projektu

```
/opt/projects/aibuilding-top/
├── PROJECT.md
├── CHANGELOG.md
├── DEPLOYMENT.md
├── Dockerfile
├── docker-compose.yml              (VPS2 dev)
├── docker-compose.production.yml   (VPS1 prod — GHCR image)
├── nginx.conf
├── .github/
│   └── workflows/
│       └── deploy.yml
└── public/
    ├── index.html
    ├── styles.css
    └── script.js
```

---

## 🚀 Spustenie (VPS2 lokálne)

```bash
cd /opt/projects/aibuilding-top
docker compose up -d --build
# Dostupné na: http://localhost:3020
```

---

## 🌐 Produkčná doména

| Údaj | Hodnota |
|------|---------|
| **Doména** | aibuilding.top |
| **Server** | VPS1 |
| **Port kontajnera** | 3020 |
| **NPM proxy** | localhost:3020 → aibuilding.top (HTTPS) |
| **SSL** | Let's Encrypt cez NPM |

---

## 📝 Poznámky

- Statický web bez backendu
- Bilingválna (SK/EN) landing page
- Deploy výlučne cez GitHub Actions (git tag v*)
- Žiadne "docker save/load" ani priamy SSH VPS2→VPS1
