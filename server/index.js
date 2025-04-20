const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { chromium } = require("playwright");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let browser, context, page;
(async () => {
  browser = await chromium.launch({
    headless: false,
    args: ["--no-sandbox"],
  });
  context = await browser.newContext();
  page = await context.newPage();
})();

app.post("/command", async (req, res) => {
  const { command } = req.body;
  try {
    if (command.startsWith("open url")) {
      const url = command.split(" ")[2];
      await page.goto(url);
      return res.json({ status: "ok", url });
    } else if (command.startsWith("click button")) {
      const text = command.split("click button ")[1];
      await page.click(`text=${text}`);
      return res.json({ status: "clicked", text });
    } else if (command.startsWith("extract text")) {
      const content = await page.content();
      return res.json({ status: "extracted", content });
    } else {
      return res.json({ error: "Unknown command" });
    }
  } catch (e) {
    return res.json({ error: e.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
