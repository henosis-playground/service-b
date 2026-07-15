import { describe, expect, it } from "vitest";
import { FakeHost } from "@henosis/core/testing";
import serviceB from "../src/service-b.js";

describe("service-b component", () => {
  it("consumes service-a outputs and emits its k8s resources", () => {
    const result = new FakeHost(serviceB)
      .available("upstreamUrl", "https://api.service-a.svc.cluster.local/api/v3/healthz")
      .available("upstreamPort", 443)
      .run();

    expect(result).toMatchObject({
      status: "complete",
      outputs: {
        app: "http://app.service-b.svc.cluster.local/app/metrics",
        upstream: "https://api.service-a.svc.cluster.local/api/v3/healthz",
        upstreamPort: 443,
      },
      reads: ["upstreamPort", "upstreamUrl"],
    });
    expect(result.resources.map((resource) => resource.address)).toEqual([
      "k8s/object@1/service-b-namespace",
      "k8s/object@1/app-deployment",
      "k8s/object@1/app-service",
    ]);
  });
});
