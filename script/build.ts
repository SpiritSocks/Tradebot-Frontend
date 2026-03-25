import { execSync } from "child_process";

execSync("npx vite build", { stdio: "inherit" });
