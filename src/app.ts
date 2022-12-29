import express, {Application, Request, Response} from "express";
import { PrismaClient } from '@prisma/client';
import {} from 'dotenv/config';

const PORT = process.env.__YOUR_PRISMA_SERVER_PORT__ || 3000;

const app: Application = express();
const prisma = new PrismaClient()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//#######################
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/api/users', async (req: Request, res: Response) => {
  try {
    // const newUser = await prisma.user.create({
    //   data: {
    //     name: 'Alice',
    //     email: 'alice@prisma.io',
    //   },
    // })
    
    const users = await prisma.user.findMany()

      return res.json({
          success: true,
          data: users
      });
  } catch (error: any) {
      return res.json({
          success: false,
          error: error,
          message: error.message
      });
  }
});
//#######################

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});