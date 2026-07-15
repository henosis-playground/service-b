import { defineComponent, input, output, value } from "@henosis/core";
import { emitObject, emitServicePair } from "@henosis/platform-k8s";
import serviceA from "@henosis/service-a";

export default defineComponent({
  name: "service-b",
  inputs: {
    image: input.config(value.string(), {
      default: "ghcr.io/henosis-playground/service-b@sha256:d854fb4344684f8003e77e19461877df4d05976a04505f988098e2025753c04f",
    }),
    upstreamUrl: input.required(serviceA.outputs.api),
    upstreamPort: input.required(serviceA.outputs.port),
  },
  outputs: {
    app: output.static(value.url()),
    upstream: output.static(value.url()),
    upstreamPort: output.static(value.number()),
  },
  build(context, inputs) {
    emitObject(context, "service-b-namespace", {
      apiVersion: "v1",
      kind: "Namespace",
      metadata: { name: "service-b" },
    });
    const upstream = inputs.upstreamUrl.value;
    const upstreamPort = inputs.upstreamPort.value;
    const service = emitServicePair(context, "app", {
      namespace: "service-b",
      image: inputs.image.value,
      targetPort: 3000,
      replicas: 1,
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
