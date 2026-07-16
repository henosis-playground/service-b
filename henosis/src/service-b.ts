import a from "@henosis/service-a";
import { defineComponent, output, value } from "@henosis/core";
import { emitObject, emitServicePair } from "@henosis/platform-k8s";

export default defineComponent({
  name: "service-b",
  config: {
    image: value.string().default(
      "ghcr.io/henosis-playground/service-b@sha256:d854fb4344684f8003e77e19461877df4d05976a04505f988098e2025753c04f",
    ),
  },
  outputs: {
    app: output.static(value.url()),
    upstream: output.static(value.url()),
    upstreamPort: output.static(value.number()),
  },
  build(ctx) {
    emitObject(ctx, "service-b-namespace", {
      apiVersion: "v1",
      kind: "Namespace",
      metadata: { name: "service-b" },
    });
    const upstream = a.outputs.api.value;
    const upstreamPort = a.outputs.port.value;
    const service = emitServicePair(ctx, "app", {
      namespace: "service-b",
      image: ctx.config.image.value,
      targetPort: 3000,
      env: {
        UPSTREAM_PORT: upstreamPort,
        UPSTREAM_URL: upstream,
      },
      resources: {
        requests: { cpu: "50m", memory: "64Mi" },
        limits: { cpu: "250m", memory: "256Mi" },
      },
    });

    return {
      app: `${service.url}/app/metrics`,
      upstream,
      upstreamPort,
    };
  },
});
