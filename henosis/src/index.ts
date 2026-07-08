import { defineComponent, envName, h } from "@henosis/platform-mock";
import serviceA from "@henosis/service-a";

export default defineComponent({
  outputs: h.object({
    app: h.url(),
    upstream: h.url(),
  }),
  build: () => {
    throw new Error("fixed render failure first 2026-07-08");
  },
});
