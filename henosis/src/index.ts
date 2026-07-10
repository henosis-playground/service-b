import { defineComponent, h } from "@henosis/platform-k8s";
import serviceA from "@henosis/service-a";

export default defineComponent({
  outputs: h.object({
    app: h.url(),
    upstream: h.url(),
    upstreamPort: h.number(),
  }),
  params: {
    dev: { replicas: 1 },
    prod: { replicas: 2 },
    preview: { replicas: 1 },
  },
  build: (ctx, params) => {
    const service = ctx.namespace("service-b").service("app", {
      targetPort: 3000,
      replicas: params.replicas,
      resources: {
        requests: { cpu: "50m", memory: "64Mi" },
        limits: { cpu: "250m", memory: "256Mi" },
      },
      env: {
        UPSTREAM_PORT: serviceA.port,
        UPSTREAM_URL: serviceA.api,
      },
    });

    return {
      app: `${service.url}/app/metrics`,
      upstream: serviceA.api,
      upstreamPort: serviceA.port,
    };
  },
});
