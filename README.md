# service-b

Live core-preview verification: 2026-07-12.

Lifecycle verification C.

Tiny dependency-free Node 22 HTTP service for the Henosis PoC.

service-b depends on service-a through the Henosis v1 component workspace.

- `GET /healthz` returns `ok`
- `GET /` returns `{"service":"service-b"}`
- Live verification exercises the gate-only queue.

Run locally:

```sh
node src/server.js
```

Live e2e marker: dev-only kill-switch verification (2026-07-10).
