const getJoke = require("./joke");
// `@actions/core` is shipped as an ES module and starting with Node 20+ the
// package.json only exposes an `import` entry under `exports`.  A plain
// `require("@actions/core")` therefore fails with
// `ERR_PACKAGE_PATH_NOT_EXPORTED` when running with a newer Node runtime
// (see the error message the user encountered).
//
// We can work around this without converting the whole repository to ESM by
// loading the module dynamically.  The `import()` expression returns a
// promise that resolves to the namespace object, so we lazily require the
// functions we need at runtime.  This keeps the surrounding code CommonJS
// compatible and allows developers to continue using `node src/main.js` in
// local development.

// Instead of calling `require` here, we'll load the module inside `run()`.
// The other modules in this repo remain CommonJS.

async function run() {
  const joke = await getJoke();
  console.log(joke);

  // load the actions/core module dynamically; we only need the one helper.
  const {setOutput} = await import("@actions/core");
  setOutput("joke", joke);
}

run();