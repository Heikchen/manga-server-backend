const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

const port = 7020;

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev"));
app.use(express.json());

const HOST = "localhost";
let API_BASE_URL = "https://api.myanimelist.net/v2/";
app.use(
  "/:info",
  (request, response, next) => {
    API_BASE_URL += request.params.info;
    next();
  },
  createProxyMiddleware({
    target: API_BASE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/posts`]: "/",
    },
  })
);

app.listen(port, HOST, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Example app listening on port ${HOST}:${port}`);
  }
});
