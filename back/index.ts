import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3500;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (_, res) => {
  res.json({ text: 'Hello World' });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
