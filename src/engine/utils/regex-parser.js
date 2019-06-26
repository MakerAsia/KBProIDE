export default {
  isValidGithubUrl: (url) => {
    return (/^http(s)?:\/\/(www\.)?github\.com\/[\.\_\-0-9A-Za-z]+\/[\.\_\-0-9A-Za-z]+\/$/g).test(
        url);
  },
};
