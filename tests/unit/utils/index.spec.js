import utils from "@/engine/utils/index.js";

describe("camelActual()", () => {
  it("must be correct transform CamelCase", () => {
    expect(utils.camelActual("hello-world")).toBe("helloWorld");
    expect(utils.camelActual("hello-world-world")).toBe("helloWorldWorld");
    expect(utils.camelActual("hello-wOrld")).toBe("helloWOrld");
    expect(utils.camelActual("hello world")).toBe("hello world");
  });
});
