const express = require("express");
const routes = require("./routes/index");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongosanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const xss = require("xss-clean");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

const app = express();
// used middlewarses here

app.use(express.urlencoded({ extended: true }));
app.use(mongosanitize());
app.use(cookieParser());
// app.use(xss());

app.use(express.json({ limit: "15kb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  session({
    secret: "keyboard cat",
    proxy: true,
    resave: true,
    saveUnintialized: true,
    cookie: {
      secure: false,
    },
  })
);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}
const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000,
  message: "Too many request. Please try again in an hour",
});

app.use(
  express.urlencoded({
    extended: true,
  })
); // Returns middleware that only parses urlencoded bodies

app.use(mongosanitize());

app.use(xss());

app.use(routes);

module.exports = app;
