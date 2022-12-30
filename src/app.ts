import express, {Application, NextFunction, Request, Response} from "express";
import cors from "cors";
import HttpException from "./models/http-exception.model";
import routes from "./routes";
import {} from "dotenv/config";

//* EXPRESS AND PRISMA SET UP
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(express.static('public')); // Serves images

//* ERROR HANDLER
app.use((err: Error | HttpException, req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (err && err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 'error',
      message: 'missing authorization credentials',
    });
    // @ts-ignore
  } else if (err && err.errorCode) {
    // @ts-ignore
    res.status(err.errorCode).json(err.message);
  } else if (err) {
    res.status(500).json(err.message);
  }
});

//* SERVER SET UP
const PORT = process.env.__YOUR_PRISMA_SERVER_PORT__ || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});