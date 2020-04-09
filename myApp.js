/** 1) Meet the node console. */
const express = require("express");
const bodyParser = require("body-parser");

/** 2) A first working Express Server */
const app = express();

/** 11) Get ready for POST Requests - the `body-parser` */
app.use(bodyParser.urlencoded({ extended: false }));

// --> 7)  Mount the Logger middleware here
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

/** 8) Chaining middleware. A Time server */
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

/** 3) Serve an HTML file */
app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

/** 4) Serve static assets  */
app.use(express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */
app.get("/json", (req, res) => {
  /** 6) Use the .env file to configure the app */
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else {
    res.json({ message: "Hello json" });
  }
});

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

/** 10) Get input from client - Query parameters */
app
  .route("/name")
  .get((req, res) => {
    res.json({ name: `${req.query.first} ${req.query.last}` });
  })
  /** 12) Get data form POST  */

  .post((req, res) => {
    res.json({ name: `${req.body.first} ${req.body.last}` });
  });

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
