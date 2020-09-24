import express from "express";
import config from "./config";
import serverRender from "renderers/server";

import { data } from "./testData";

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

// since we have EJS templates we can pass variables directly. This is useful for server-side rendering

app.get("/", async (req, res) => {
  const initialContent = await serverRender(); // The reason for being a function is because
  // sometimes we'll need to pass parameters, like the end points where's loading.
  res.render("index", { ...initialContent });
});

// explanation await: because we now are using server-rendering with asyncronous data.

app.get("/data", (req, res) => {
  res.send(data);
});
app.listen(config.port, function listenHandler() {
  console.info(`Running on ${config.port}`);
});
