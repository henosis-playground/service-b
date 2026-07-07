import { defineComponent } from "@henosis/sdk";
import serviceA from "@henosis/service-a";

export default defineComponent("service-b", {
  binding: (b) => ({ app: b.publicUrl() }),
  build: (ctx) => {
    const a = ctx.use(serviceA);
    ctx.service({
      image: ctx.image,
      port: 3000,
      env: { SERVICE_A_URL: a.api },
    });
  },
});
