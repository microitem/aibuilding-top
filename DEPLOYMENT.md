# DEPLOYMENT — aibuilding.top

## VPS2 (Development)

### Spustenie

```bash
cd /opt/projects/aibuilding-top
docker compose up -d --build
```

**URL:** http://localhost:3020 (cez port forwarding)

### Zastavenie

```bash
docker compose down
```

### Logy

```bash
docker compose logs -f web
```

### Health check

```bash
curl http://localhost:3020/health
```

---

## VPS1 (Produkcia) — GitHub Actions

### Workflow
```
git tag v* → GitHub Actions → gitleaks scan → Docker build → GHCR push → SSH deploy VPS1
```

### GitHub Secrets (Settings → Secrets → Actions)

| Secret | Popis |
|--------|-------|
| `VPS1_SSH_KEY` | SSH private key pre deploy |
| `VPS1_HOST` | IP alebo hostname VPS1 |
| `VPS1_PORT` | SSH port VPS1 |
| `VPS1_USER` | SSH user (root) |

### VPS1 jednorazový setup

```bash
# 1. Vytvor adresár
mkdir -p /opt/aibuilding-top
cd /opt/aibuilding-top

# 2. Nakopíruj docker-compose.production.yml (z repozitára)

# 3. GHCR login (jednorazovo)
docker login ghcr.io -u microitem -p <GITHUB_PAT>

# 4. Prvý pull a spustenie
docker compose -f docker-compose.production.yml pull
docker compose -f docker-compose.production.yml up -d
```

### Nginx Proxy Manager (NPM) — nastaviť manuálne na VPS1

| Parameter | Hodnota |
|-----------|---------|
| **Forward Hostname/IP** | `127.0.0.1` |
| **Forward Port** | `3020` |
| **Domain** | `aibuilding.top` |
| **SSL** | Let's Encrypt (auto) |
| **Force SSL** | ✔ |
| **HTTP/2** | ✔ |

### Deploy (po nastavení)

```bash
git tag v1.0.0
git push origin v1.0.0
# → GitHub Actions sa automaticky spustí
```

---

## Porty

| Prostredie | Port | Kontajner | URL |
|-----------|------|-----------|-----|
| VPS2 dev | 3020 | `aibuilding-top` | http://localhost:3020 |
| VPS1 prod | 3020 | `aibuilding-top` | https://aibuilding.top (cez NPM) |

## Image

| Údaj | Hodnota |
|------|---------|
| **Registry** | `ghcr.io` |
| **Image** | `ghcr.io/microitem/aibuilding-top:latest` |
| **Repo** | https://github.com/microitem/aibuilding-top |

## Rollback

```bash
# Na VPS1: zmeniť tag v docker-compose.production.yml
image: ghcr.io/microitem/aibuilding-top:v1.0.0
docker compose -f docker-compose.production.yml up -d --force-recreate
```
