import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const openaiApiKey = process.env.OPENAI_API_KEY;

app.use(bodyParser.json());

// Default GET endpoint
app.get("/", (req, res) => {
  res.send("You are running an AI Bot PR Code Explainer");
});

app.post("/webhook", async (req, res) => {
  const pr = req.body.pull_request;
  if (pr) {
    const owner = pr.base.repo.owner.login;
    const repo = pr.base.repo.name;
    const prNumber = pr.number;

    const diffData = await octokit.pulls.get({
      owner,
      repo,
      pull_number: prNumber,
      mediaType: {
        format: "diff",
      },
    });

    const changes = parseDiff(diffData.data);
    const reviewComments = await generateReviewComments(changes);

    await postReviewComments(owner, repo, prNumber, reviewComments);

    res.status(200).send("Webhook received and processed");
  } else {
    res.status(400).send("Not a pull request event");
  }
});

function parseDiff(diff) {
  const files = diff.split("diff --git ").slice(1);

  return files.map((fileDiff) => {
    const [fileHeader, ...diffLines] = fileDiff.split("\n");
    const fileName = fileHeader.split(" ")[1].slice(2); // Extract the file name
    const changes = diffLines
      .filter((line) => line.startsWith("+") && !line.startsWith("+++"))
      .map((line, index) => ({ line: line.slice(1), lineNumber: index + 1 }));
    return { fileName, changes };
  });
}

async function generateReviewComments(changes) {
  const comments = [];
  for (const { fileName, changes: fileChanges } of changes) {
    for (const { line, lineNumber } of fileChanges) {
      const explanation = await getExplanationFromChatGPT(line);
      comments.push({
        path: fileName,
        position: lineNumber,
        body: explanation,
      });
    }
  }
  return comments;
}

async function getExplanationFromChatGPT(code) {
  const response = await axios.post(
    "https://api.openai.com/v1/engines/davinci-codex/completions",
    {
      prompt: `Explain the following JavaScript code:\n\n${code}\n\nExplanation:`,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].text.trim();
}

async function postReviewComments(owner, repo, pullNumber, comments) {
  await octokit.pulls.createReview({
    owner,
    repo,
    pull_number: pullNumber,
    event: "COMMENT",
    comments,
  });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
