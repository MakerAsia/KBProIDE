//import _regex from "@/engine/utils/regex-parser.js";
//import compiler from "@/engine/utils/compiler.js";
import utils from "@/engine/utils";

let compiler = utils.compiler;

describe("@engine/utils/compiler.js", () => {
  it("must have parseError", () => {
    expect(compiler.parseError).not.toBeUndefined();
  });
});

describe("@engine/utils/regex-parser.js", () => {
  let url;

  url = "https://github.com/cmmakerclub/ttgo-t8-v1.3-board/";
  it(`parse ${url} `, () => {
    expect(utils.regex.isValidGithubUrl(`${url}`)).toBeTruthy();
  });

  url = "https://github.com/cmmakerclub/ttgo.t8.v1.3.board/";
  it(`parse all dot repo name ${url} to be true`, () => {
    expect(utils.regex.isValidGithubUrl(`${url}`)).toBeTruthy();
  });

  url = "https://github.com/cmmakerclub/ttgo_t8_v1_3_board/";
  it(`parse all underscore repo name ${url} to be true`, () => {
    expect(utils.regex.isValidGithubUrl(`${url}`)).toBeTruthy();
  });

});
