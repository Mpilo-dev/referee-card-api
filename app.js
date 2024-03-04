const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
// const xss = require("xss-clean");
const hpp = require("hpp");
const { whitelist } = require("validator");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const playerRouter = require("./routes/playerRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRouter");
const leagueRouter = require("./routes/leagueRouter");
const teamRouter = require("./routes/teamRouter");
const seasonRouter = require("./routes/seasonRouter");
const gameRouter = require("./routes/gameRouter");
const cautionRouter = require("./routes/cautionRouter");

const app = express();

// GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests
const limiter = rateLimit({
  // allow 100 attempts per hour(in milliseconds)
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour ",
});

app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against xss
// app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ["fouls, yellowCards, redCards"],
  })
);

// Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/players", playerRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/leagues", leagueRouter);
app.use("/api/v1/teams", teamRouter);
app.use("/api/v1/seasons", seasonRouter);
app.use("/api/v1/games", gameRouter);
app.use("/api/v1/cautions", cautionRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
