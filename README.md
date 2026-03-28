# MG Hub Intelligence Center — Worker

Cloudflare Worker para el dashboard de MG Motor Chile.

## Estructura

```
mg-hub-worker/
├── src/
│   ├── index.js        ← lógica del Worker (proxy API + routing)
│   └── dashboard.html  ← dashboard completo (editar acá)
├── wrangler.toml       ← config de Cloudflare
├── package.json
└── .gitignore
```

## Setup inicial (solo una vez)

### 1. Clonar y entrar al proyecto
```bash
git clone https://github.com/TU_ORG/mg-hub-worker.git
cd mg-hub-worker
npm install
```

### 2. Login en Cloudflare
```bash
npx wrangler login
```
Abre el browser y autoriza con tu cuenta de Cloudflare.

### 3. Deploy
```bash
npm run deploy
```

## Workflow diario

Editar el HTML del dashboard:
```bash
# editar src/dashboard.html con VS Code
code src/dashboard.html

# ver en local antes de subir
npm run dev

# deploy cuando esté listo
npm run deploy

# guardar el cambio en Git
git add .
git commit -m "fix: ajuste en gráfico de tipología"
git push
```

## Variables de entorno

El `wrangler.toml` tiene la URL de n8n en `[vars]`.
Si cambias el nombre del workflow en n8n, edita esa línea.

## Comandos útiles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor local en localhost:8787 |
| `npm run deploy` | Sube a producción en Cloudflare |
| `npm run tail` | Ver logs en tiempo real |
