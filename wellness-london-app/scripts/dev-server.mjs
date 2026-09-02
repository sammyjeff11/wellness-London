import { spawn } from "node:child_process";

const incomingArgs = process.argv.slice(2);
const nextArgs = ["node_modules/next/dist/bin/next", "dev"];

for (let index = 0; index < incomingArgs.length; index += 1) {
  const arg = incomingArgs[index];

  if (arg === "--strictPort") continue;
  if (arg === "--host") {
    nextArgs.push("--hostname", incomingArgs[index + 1]);
    index += 1;
    continue;
  }

  nextArgs.push(arg);
}

const child = spawn(process.execPath, nextArgs, {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
