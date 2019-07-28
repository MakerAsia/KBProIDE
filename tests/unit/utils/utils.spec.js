//import _regex from "@/engine/utils/regex-parser.js";
//import compiler from "@/engine/utils/compiler.js";
import utils from "@/engine/utils";

let compiler = utils.compiler;

describe("@engine/utils/compiler.js", () => {
  it("must have parseError", () => {
    expect(compiler.parseError).not.toBeUndefined();
  });
});

describe("@engine/utils/regex-parser.js with slash ending", () => {
  let url;

  it(`parse ${url} `, () => {
    url = "https://github.com/cmmakerclub/ttgo-t8-v1.3-board/";
    expect(utils.regex.isValidGithubUrl(url)).toBeTruthy();
  });

  it(`parse all dot repo name ${url} to be true`, () => {
    url = "https://github.com/cmmakerclub/ttgo.t8.v1.3.board/";
    expect(utils.regex.isValidGithubUrl(url)).toBeTruthy();
  });

  it(`parse all underscore repo name ${url} to be true`, () => {
    url = "https://github.com/cmmakerclub/ttgo_t8_v1_3_board/";
    expect(utils.regex.isValidGithubUrl(url)).toBeTruthy();
  });

  it(`must be failed if not started with https://`, () => {
    url = "github.com/cmmakerclub/ttgo_t8_v1_3_board/";
    expect(utils.regex.isValidGithubUrl(url)).toBeFalsy();
  });

  it(`parse all underscore repo name ${url} to be true`, () => {
    url = "https://github.com/cmmakerclub/ttgo_t8_v1_3_board/";
    expect(utils.regex.isValidGithubUrl(url)).toBeTruthy();
  });

  it(`must be true when using https://www.github....`, () => {
    url = "https://www.github.com/cmmakerclub/ttgo_t8_v1_3_board/";
    expect(utils.regex.isValidGithubUrl(url)).toBeTruthy();
  });

  it(`must be failed when using do not use http://www.github or http://github`,
      () => {
        url = "https://ww.github.com/cmmakerclub/ttgo_t8_v1_3_board/";
        expect(utils.regex.isValidGithubUrl(url)).toBeFalsy();
      });

});
