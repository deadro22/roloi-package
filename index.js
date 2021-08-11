#!/usr/bin/env node

const fs = require("fs");
const cp = require("child_process");
const path = require("path");
const dir = process.cwd();

let server = null;
let command = process.argv[2];

if (!command) {
  const packageExists = fs.existsSync(path.join(dir, "/package.json"));
  const package = packageExists ? require(path.join(dir, "/package.json")) : null;
  if (!package || !package.main || package.main === "") {
    console.log("\x1b[31m%s\x1b[0m", "Roloi error: No entry or main file found");
  } else {
    command = package.main;
    server = cp.fork(command);
  }
} else {
  const fileExists = fs.existsSync(path.join(dir, "/" + command));
  if (!fileExists) {
    console.log("\x1b[31m%s\x1b[0m", "Roloi error: Specified file not found");
  } else {
    server = cp.fork(command);
  }
}

if (server) {
  console.log("\x1b[36m%s\x1b[0m", "Roloi: App started, Waiting for changes", dir);

  fs.watch(dir, { recursive: true }, (ev, filename) => {
    console.clear();
    server.kill();
    server = cp.fork(command);
    console.log("\x1b[32m%s\x1b[0m", "Roloi: Server Restarted " + command);
  });

  process.on("SIGINT", () => {
    server.kill();
    fs.unwatchFile(dir);
    process.exit();
  });
}
