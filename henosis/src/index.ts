import { defineComponent, h } from "@henosis/platform-mock";
import serviceA from "@henosis/service-a";

export default defineComponent({
  outputs: h.object({
    app: h.url(),
    upstream: h.url(),
  }),
  build: (_ctx, env) => ({
    app: `https://service-b-${env.id}.henosis.example`,
    upstream: serviceA.api,
  }),
});
