import express from "express";
import cors from "cors";
import { exec } from "child_process";

const app = express();
app.use(cors());
app.use(express.json());

function run(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd: "/app" }, (err, stdout, stderr) => {
      if (err) reject(stderr || stdout);
      else resolve(stdout);
    });
  });
}

app.post("/stop-read", async (req, res) => {
  try {
    await run("docker compose stop persons-read");
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

app.post("/start-read", async (req, res) => {
  try {
    await run("docker compose up -d persons-read");
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

app.get("/status", async (req, res) => {
  try {
    const output = await run("docker ps --format '{{.Names}}'");
    const running = output.includes("persons-read");
    res.json({ running });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

app.listen(5005, () => console.log("Control service running on 5005"));
