import { defineComponent, envName, h } from "@henosis/platform-mock";
import serviceA from "@henosis/service-a";

export default defineComponent({
  outputs: h.object({
    app: h.url(),
    upstream: h.url(),
  }),
  build: (_ctx, env) => ({
    app: "not-a-url",
    upstream: serviceA.api,
  }),
});
