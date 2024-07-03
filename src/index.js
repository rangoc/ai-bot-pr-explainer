const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { Octokit } = require("@octokit/rest");
const diff = require("diff");
require("dotenv").config(); // Add this line to load environment variables

const app = express();
const port = 3000;

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN }); // Use the environment variable
const openaiApiKey = process.env.OPENAI_API_KEY; // Use the environment variable

app.use(bodyParser.json());

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

    const changes = diffData.data;
    const explanation = await getExplanationFromChatGPT(changes);

    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: prNumber,
      body: explanation,
    });

    res.status(200).send("Webhook received and processed");
  } else {
    res.status(400).send("Not a pull request event");
  }
});

async function getExplanationFromChatGPT(diff) {
  const changes = diff
    .split("\n")
    .filter((line) => line.startsWith("+") && !line.startsWith("+++"));
  const code = changes.join("\n");

  const response = await axios.post(
    "https://api.openai.com/v1/engines/davinci-codex/completions",
    {
      prompt: `Explain the following JavaScript code changes:\n\n${code}\n\nExplanation:`,
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
