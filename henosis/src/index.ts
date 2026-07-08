import { defineComponent, envName, h } from "@henosis/platform-mock";
import serviceA from "@henosis/service-a";

export default defineComponent({
  outputs: h.object({
    app: h.url(),
    upstream: h.url(),
    upstreamPort: h.number(),
  }),
  build: (_ctx, env) => ({
    app: `https://service-b-${envName(env)}.henosis.example/app/metrics`,
    upstream: serviceA.api,
    upstreamPort: serviceA.port,
  }),
});
