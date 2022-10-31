import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRouters from './routers/products';
import orderRouters from './routers/orders';
import userRouters from './routers/users';

export const app: express.Application = express();
const port = 3000;

const corsOptions = {
  origin: '',
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

userRouters(app);
orderRouters(app);
productRouters(app);

app.listen(port, function () {
  console.info(`[server]: Server is running on port ${port}, current time: `, new Date());
});
