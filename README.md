# service-b

Tiny dependency-free Node 22 HTTP service for the Henosis PoC.

service-b is the user-facing surface and depends on service-a. The typed dependency arrives with the SDK workspace.

- `GET /healthz` returns `ok`
- `GET /` returns `{"service":"service-b"}`

Run locally:

```sh
node src/server.js
```
