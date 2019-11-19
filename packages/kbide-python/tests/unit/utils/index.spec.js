//import {shallowMount} from "@vue/test-utils";

let {shallowMount} = require("@vue/test-utils");
let App = require("@/App");

describe("test case", () => {
  it("have a test case", () => {
    console.log(App, shallowMount);
    expect(("hello-world")).toBe("hello-world");
  });
});
