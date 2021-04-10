const core = require("@actions/core");

async function run() {
  const filename = core.getInput("filename");
  const isCorrect = core.getInput("isCorrect");
  const level = core.getInput("level");
  const display_type = core.getInput("display_type");
  const msg = core.getInput("msg");
  const error_expected = core.getInput("error_expected");
  const error_got = core.getInput("error_got");

  const output = {
    reports: [
      {
        filename,
        isCorrect,
        level,
        display_type,
        msg,
        error: { expected: error_expected, got: error_got },
      },
    ],
  };

  core.setOutput("reports", output);
}

run();
