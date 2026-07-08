# service-b

Tiny dependency-free Node 22 HTTP service for the Henosis PoC.

service-b depends on service-a through the Henosis v1 component workspace.

- `GET /healthz` returns `ok`
- `GET /` returns `{"service":"service-b"}`

Run locally:

```sh
node src/server.js
```
