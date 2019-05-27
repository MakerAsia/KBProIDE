export default {
  parseError: (err) => {
    return new Promise((resolve, reject) => {
      let errors = [];
      if (err.error) {
        errors = err.error.stderr.split("\n");
        errors = errors.filter(v => v.indexOf("user_app.cpp") > -1).
        map(v => v.split("user_app.cpp:")[1]);
        setTimeout(() => {
          resolve(errors);
        }, 500);
      } else {
        reject(`no err.error`, err);
      }
    });
  },
};
