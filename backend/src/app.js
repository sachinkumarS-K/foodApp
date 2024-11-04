
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import errorMiddleware from "./middleware/error.middleware.js";
import morgan from "morgan"
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
  Headers: true,
  exposedHeaders: 'Set-Cookie',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Content-Type',
    'Authorization'
  ]
};
app.use(cors(corsOptions));

app.use(morgan("combined"));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);

app.use(errorMiddleware);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "OOPS!! 404 page not found",
  });
});

app.get("/ping", (req, res) => {



  res.send("pong");
});
export { app };
