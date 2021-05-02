#! /usr/bin/env node
/* eslint-disable node/shebang */

const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const WHITE = "\x1b[37m";

const getColoredText = (text, color) => {
  if (color == null) {
    color = WHITE;
  }

  return color + text + RESET;
};

const { mkdirSync, existsSync, writeFileSync } = require("fs");
const { spawnSync } = require("child_process");
const path = require("path");

console.log(
  getColoredText("Will be automatically creating a local pnpm package", GREEN)
);

const pluginPath = path.join(process.cwd(), "plugins");
const folderPath = path.join(pluginPath, "pnpm-preinstaller");
const tomlPath = path.join(process.cwd(), "netlify.toml");

if (!existsSync(pluginPath)) {
  mkdirSync(pluginPath);
}

if (existsSync(folderPath)) {
  console.log(
    getColoredText("You already have a package called pnpm-preinstaller"),
    RED
  );
  // eslint-disable-next-line no-process-exit
  process.exit();
}

mkdirSync(folderPath);

console.log("Installing netlify plugin files at", folderPath);

spawnSync("curl", [
  "-o",
  `${folderPath}/index.js`,
  "https://raw.githubusercontent.com/modfy/netlify-plugin-pnpm-preinstaller/master/src/index.js"
]);
spawnSync("curl", [
  "-o",
  `${folderPath}/manifest.yml`,
  "https://raw.githubusercontent.com/modfy/netlify-plugin-pnpm-preinstaller/master/manifest.yml"
]);

console.log(getColoredText("Your plugin has sucessfuly been installed"), GREEN);

const text = `
    [[plugins]]
     package = "./plugins/pnpm-preinstaller"
    `;

if (existsSync(tomlPath)) {
  console.log(
    getColoredText(
      "You already have a netlify.toml, please set this plugin as the first plugin as shown below"
    ),
    GREEN
  );
  console.log(getColoredText(text, YELLOW));
} else {
  const fileText = `
    [build.environment]
        NPM_FLAGS="--prefix=/dev/null"
    ${text}
    `;
  writeFileSync(tomlPath, fileText);
}
