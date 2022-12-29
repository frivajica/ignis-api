import express, {Application, Request, Response} from "express";
import { PrismaClient } from '@prisma/client';

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
    const newUser = await prisma.user.create({
      data: {
        name: 'Alice',
        email: 'alice@prisma.io',
      },
    })
    
    const users = await prisma.user.findMany()

      return res.json({
          success: true,
          data: users
      });
  } catch (error) {
      return res.json({
          success: false,
          message: error
      });
  }
});
//#######################

const port: number = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});